import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import BaseService from 'src/base/base.service';
import { YoutubeService } from 'src/base/youtube.service';
import { TagsService } from 'src/tags/tags.service';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { Video, VideoSource } from './video.schema';
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

        // If there were any previous instance of this videoId in other videos that got marked as existing = false
        // It will update all instance of relatedVideo with videoId with complete value
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

        // Same thing but with Clips

        // Cascade Clip here

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
}
