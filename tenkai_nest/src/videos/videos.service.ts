import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import BaseService from 'src/base/base.service';
import { YoutubeService } from 'src/base/youtube.service';
import { TagsService } from 'src/tags/tags.service';
import { uniqByKey } from 'src/utils/utilities';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { UpdateVideoParamsDto } from './dto/update-video.params.dto';
import { IRelatedVideo, Video, VideoSource } from './video.schema';
interface TagIdFilter {
    'tags.tagId': number;
}
@Injectable()
export class VideosService extends BaseService<Video> {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<Video>,
        private youtubeService: YoutubeService,
        private tagService: TagsService,
    ) {
        super(videoModel, new Logger(VideosService.name), {
            _id: 1,
            videoId: 1,
            duration: 1,
            publishedAt: 1,
            relatedTweets: 1,
            relatedVideos: 1,
            source: 1,
            tags: 1,
            thumbnail: 1,
            timestamps: 1,
            title: 1,
            uploader: 1,
        });
    }
    public async createVideo(videoId: string) {
        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);

        let videoParams: Partial<Video>;
        if (youtubeVideo) {
            videoParams = { ...youtubeVideo, source: VideoSource.YOUTUBE_MANUAL };
        } else {
            const privateTag = await this.tagService.findOne({ tagNameEN: 'Private' });
            videoParams = {
                videoId,
                title: 'NEW VIDEO',
                source: VideoSource.MANUAL,
                tags: [
                    {
                        tagId: privateTag.tagId,
                        tagNameEN: privateTag.tagNameEN,
                        tagNameJP: privateTag.tagNameJP,
                    },
                ],
            };
        }

        const video = await this.create(videoParams);

        // * If there were any previous instance of this videoId in other videos that got marked as existing = false
        // * It will update all instance of relatedVideo with videoId with complete value
        const relatedVideos = await this.videoModel.find({ 'relatedVideos.videoId': videoId });
        for (const relatedVideo of relatedVideos) {
            relatedVideo.relatedVideos = relatedVideo.relatedVideos.map((rVid) => {
                if (rVid.videoId === videoId) {
                    return {
                        existing: true,
                        id: video.id.toString(),
                        title: video.title,
                        uploader: video.uploader,
                        publishedAt: video.publishedAt,
                        thumbnail: video.thumbnail,
                        videoId,
                    };
                }
                return rVid;
            });
            await relatedVideo.save();
        }

        //* Same thing but with Clips

        //TODO: Cascade Clip here

        return video;
    }

    public async findVideos(filter: FindVideosParamsDto): Promise<FindVideosResponseDto> {
        const { title, from, to, uploader, tags, limit, skip, sortOrder } = filter;

        const tagsFilter: TagIdFilter[] = [];

        (tags || []).forEach((tag: number) => {
            tagsFilter.push({ 'tags.tagId': tag });
        });

        const searchQuery = {
            ...(title && { title: new RegExp(title, 'i') }),
            ...(uploader && { uploader: new RegExp(uploader, 'i') }),
            ...((from || to) && {
                publishedAt: { ...(from && { $gte: from }), ...(to && { $lte: to }) },
            }),
            ...(tagsFilter.length > 0 && { $and: tagsFilter }),
        };

        return this.find({
            ...searchQuery,
            limit,
            skip,
            sort: { publishedAt: sortOrder ? 1 : -1 },
        });
    }

    public async findVideoById(id: string): Promise<Video> {
        const [video] = await this.videoModel
            .aggregate()
            .match({
                _id: new Types.ObjectId(id),
            })
            .lookup({
                from: 'clips',
                let: { videoId: '$videoId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$$videoId', '$srcVideos.videoId'],
                            },
                        },
                    },
                    { $sort: { publishedAt: -1 } },
                ],
                as: 'clips',
            })
            .project(this.projection);

        if (!video) {
            throw new NotFoundException(`Video<id:${id}> not found`);
        }
        return video;
    }

    public async updateVideo(id: string, data: UpdateVideoParamsDto): Promise<Video> {
        const { relatedVideos = [] } = data;

        const video = await this.findById(id);

        const { videoId } = video;

        //* Process input relatedVideo
        //* remove duplicate videoId
        const uniqRelatedVideos: IRelatedVideo[] = uniqByKey(relatedVideos, 'videoId');

        for (const relatedVideo of uniqRelatedVideos) {
            const existingVideo = await this.videoModel.findOne({ videoId });
            if (existingVideo) {
                //* replace input relatedVideo with current existing video from our record.
                Object.assign(relatedVideo, {
                    existing: true,
                    id: existingVideo.id.toString(),
                    title: existingVideo.title,
                    uploader: existingVideo.uploader,
                    publishedAt: existingVideo.publishedAt,
                    thumbnail: existingVideo.thumbnail,
                });
                //* update that existing video's relatedVideos embed sorted and remove duplicate
                existingVideo.relatedVideos = uniqByKey(
                    existingVideo.relatedVideos
                        .concat({
                            id: video.id.toString(),
                            existing: true,
                            videoId: data.videoId || video.videoId,
                            title: data.title || video.title,
                            uploader: data.uploader || video.uploader,
                            publishedAt: data.publishedAt || video.publishedAt,
                            thumbnail: data.thumbnail || video.thumbnail,
                        })
                        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()),
                    'videoId',
                );

                await existingVideo.save();
            } else {
                //* if relatedVideo doesn't exist in our record. fetch info from youtube instead
                const { uploader, title } = await this.youtubeService.fetchVideo(videoId);
                Object.assign(relatedVideo, {
                    existing: false,
                    uploader,
                    title,
                });
            }
        }

        return this.update(id, { ...data, relatedVideos: uniqRelatedVideos });
    }

    public async deleteVideo(id: string): Promise<Video> {
        const relatedVideos = await this.videoModel.find({ 'relatedVideos.id': id });
        //* Remove video with videoId from all relatedVideos field
        for (const relatedVideo of relatedVideos) {
            relatedVideo.relatedVideos = relatedVideo.relatedVideos.filter(({ id: rvId }) => rvId !== id);
            await relatedVideo.save();
        }

        //TODO:: Remove srcVideo with videoId from all clips

        return this.delete(id);
    }
}
