import { Injectable } from '@nestjs/common';

import { YoutubeService } from 'src/base/youtube.service';
import { TagsService } from 'src/tags/tags.service';
import { uniqByKey } from 'src/utils/utilities';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { UpdateVideoParamsDto } from './dto/update-video.params.dto';
import { IRelatedVideo, Video, VideoSource } from './schemas/video.schema';
import { VideosRepository } from './videos.repository';
interface TagIdFilter {
    'tags.tagId': number;
}
@Injectable()
export class VideosService {
    constructor(
        private videosRepository: VideosRepository,
        private youtubeService: YoutubeService,
        private tagService: TagsService,
    ) {}
    async createVideo(videoId: string) {
        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);

        let videoParams: Partial<Video>;
        if (youtubeVideo) {
            videoParams = { ...youtubeVideo, source: VideoSource.YOUTUBE_MANUAL };
        } else {
            const privateTag = await this.tagService.findPrivateTag();
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

        const video = await this.videosRepository.create(videoParams);

        // * If there were any previous instance of this videoId in other videos that got marked as existing = false
        // * It will update all instance of relatedVideo with videoId with complete value
        const { docs: relatedVideos } = await this.videosRepository.find({ 'relatedVideos.videoId': videoId });
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

    async findVideos(filter: FindVideosParamsDto): Promise<FindVideosResponseDto> {
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

        return this.videosRepository.find({
            ...searchQuery,
            limit,
            skip,
            sort: { publishedAt: sortOrder ? 1 : -1 },
        });
    }

    async findVideoById(id: string): Promise<Video> {
        return this.videosRepository.findByIdWithClip(id);
    }

    async updateVideo(id: string, data: UpdateVideoParamsDto): Promise<Video> {
        const { relatedVideos = [] } = data;

        const video = await this.videosRepository.findById(id);

        const { videoId } = video;

        //* Process input relatedVideo
        //* remove duplicate videoId
        const uniqRelatedVideos: IRelatedVideo[] = uniqByKey(relatedVideos, 'videoId');

        for (const relatedVideo of uniqRelatedVideos) {
            const existingVideo = await this.videosRepository.findOne({ videoId });
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

        return this.videosRepository.update(id, { ...data, relatedVideos: uniqRelatedVideos });
    }

    async deleteVideo(id: string): Promise<Video> {
        const { docs: relatedVideos } = await this.videosRepository.find({ 'relatedVideos.id': id });
        //* Remove video with videoId from all relatedVideos field
        for (const relatedVideo of relatedVideos) {
            relatedVideo.relatedVideos = relatedVideo.relatedVideos.filter(({ id: rvId }) => rvId !== id);
            await relatedVideo.save();
        }

        //TODO:: Remove srcVideo with videoId from all clips

        return this.videosRepository.delete(id);
    }
}
