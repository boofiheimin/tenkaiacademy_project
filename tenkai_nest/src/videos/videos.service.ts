import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { isArray, omit } from 'lodash';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedTag, Tag } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { uniqByKey } from 'src/utils/utilities';
import { FindVideosInputDto } from './dto/find-videos.input.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { UpdateVideoInputDto } from './dto/update-video.input.dto';
import { EmbedVideo, Video, VideoSource } from './schemas/video.schema';
import { VideosRepository } from './videos.repository';
interface TagIdFilter {
    'tags.tagId': number;
}
@Injectable()
export class VideosService {
    constructor(
        private readonly videosRepository: VideosRepository,
        private readonly youtubeService: YoutubeService,
        private readonly tagService: TagsService,
    ) {}

    private logger = new Logger(VideosService.name);

    async createVideo(videoId: string) {
        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);

        let videoInput: Partial<Video>;
        if (youtubeVideo) {
            videoInput = { ...youtubeVideo, source: VideoSource.YOUTUBE_MANUAL };
        } else {
            const privateTag = await this.tagService.findPrivateTag();
            videoInput = {
                videoId,
                title: 'NEW VIDEO',
                source: VideoSource.MANUAL,
                tags: [new EmbedTag(privateTag)],
            };
        }

        const video = await this.videosRepository.create(videoInput);

        // * If there were any previous instance of this videoId in other videos that got marked as existing = false
        // * It will update all instance of relatedVideo with videoId with complete value
        const { docs: relatedVideos } = await this.videosRepository.find({ 'relatedVideos.videoId': videoId });
        for (const relatedVideo of relatedVideos) {
            relatedVideo.relatedVideos = relatedVideo.relatedVideos.map((rVid) => {
                if (rVid.videoId === videoId) {
                    return new EmbedVideo(video);
                }
                return rVid;
            });
            await relatedVideo.save();
        }

        //* Same thing but with Clips

        //TODO: Cascade Clip here

        return video;
    }

    async findVideos(filter: FindVideosInputDto): Promise<FindVideosResponseDto> {
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

    async findVideoByVideoId(videoId: string): Promise<Video> {
        return this.videosRepository.findByVideoId(videoId);
    }

    async updateVideo(id: string, data: UpdateVideoInputDto): Promise<Video> {
        const { relatedVideosId } = data;

        let updateParameter: Partial<Video> = omit(data, 'relatedVideosId');
        const toBeUpdated = [];

        if (relatedVideosId && isArray(relatedVideosId)) {
            //* Process input relatedVideo
            //* remove duplicate videoId
            const uniqEmbedVideosId: string[] = [...new Set(relatedVideosId)];
            const newEmbedVideos = [];
            //* We need to use for loop here to preserved sequence
            for (const videoId of uniqEmbedVideosId) {
                const existingVideo = await this.videosRepository.findOne({ videoId });
                if (existingVideo) {
                    //* replace input relatedVideo with current existing video from our record.
                    newEmbedVideos.push(new EmbedVideo(existingVideo));
                    //* queue up existing video to be updated
                    toBeUpdated.push(existingVideo);
                } else {
                    //* if relatedVideo doesn't exist in our record. fetch info from youtube instead
                    const youtubeVideo = await this.youtubeService.fetchVideo(videoId);
                    newEmbedVideos.push(new EmbedVideo(youtubeVideo));
                }
            }

            updateParameter = { ...updateParameter, relatedVideos: newEmbedVideos };
        }

        const video = await this.videosRepository.update(id, updateParameter);

        //* update that existing video's relatedVideos embed sorted and remove duplicate
        await Promise.all(
            toBeUpdated.map(async (existingVideo) => {
                existingVideo.relatedVideos = uniqByKey(
                    existingVideo.relatedVideos
                        .concat(new EmbedVideo(video))
                        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()),
                    'videoId',
                );
                await existingVideo.save();
            }),
        );

        return video;
    }

    async deleteVideo(id: string): Promise<Video> {
        const { docs: relatedVideos } = await this.videosRepository.find({ 'relatedVideos.id': id });
        //* Remove video with videoId from all relatedVideos field

        await Promise.all(
            relatedVideos.map(async (relatedVideo) => {
                relatedVideo.relatedVideos = relatedVideo.relatedVideos.filter(({ id: rvId }) => rvId !== id);
                await relatedVideo.save();
            }),
        );

        //TODO:: Remove srcVideo with videoId from all clips

        return this.videosRepository.delete(id);
    }

    async refetchVideo(id: string): Promise<Video> {
        const video = await this.videosRepository.findById(id);

        const youtubeVideo = await this.youtubeService.fetchVideo(video.videoId);
        if (!youtubeVideo) {
            throw new NotFoundException(`Video:${video.videoId} not found`);
        }

        return this.videosRepository.update(id, youtubeVideo);
    }

    async refetchAll(): Promise<string> {
        this.logger.log("Start fetching all videos' id...");
        const videoIds = await this.youtubeService.fetchAllVideoIds();
        this.logger.log(`Total videos :: ${videoIds.length}`);

        this.logger.log('Video insertion process...');

        await Promise.all(
            videoIds.map(async (videoId) => {
                const video = await this.youtubeService.fetchVideo(videoId);
                if (video) {
                    await this.videosRepository.findOneAndUpsert(
                        { videoId },
                        { ...video, source: VideoSource.YOUTUBE },
                    );
                }
            }),
        );

        const message = `Successfully Add/Update: ${videoIds.length} videos`;
        this.logger.log(message);
        return message;
    }

    async tagCascadeUpdate(tag: Tag): Promise<void> {
        return this.videosRepository.tagCascadeUpdate(tag);
    }

    async tagCascadeDelete(tag: Tag): Promise<void> {
        return this.videosRepository.tagCascadeDelete(tag);
    }
}
