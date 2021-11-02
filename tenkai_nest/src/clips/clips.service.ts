import { BadRequestException, Injectable } from '@nestjs/common';
import { omit, uniq } from 'lodash';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedTag } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { uniqByKey } from 'src/utils/utilities';
import { EmbedVideo } from 'src/videos/schemas/video.schema';
import { VideosService } from 'src/videos/videos.service';
import { ClipsRepository } from './clips.repository';
import { CreateClipInputDto } from './dto/create-clip.input.dto';
import { FindClipsInputDto } from './dto/find-clips.input.dto';
import { FindClipsResponseDto } from './dto/find-clips.response.dto';
import { UpdateClipInputDto } from './dto/update-clip.input.dto';
import { Clip } from './schemas/clip.schema';

interface TagIdFilter {
    'tags.tagId': number;
}

interface ProcessedSrcVideo {
    srcTags: EmbedTag[];
    srcVideosParam: EmbedVideo[];
}

@Injectable()
export class ClipsService {
    constructor(
        private readonly clipsRepository: ClipsRepository,
        private readonly videosService: VideosService,
        private readonly youtubeService: YoutubeService,
        private readonly tagsService: TagsService,
    ) {}

    private async processSrcVideoIds(srcVideoIds: string[]): Promise<ProcessedSrcVideo> {
        const srcVideosParam = [];
        let srcTags = [];
        for (const srcVideoId of srcVideoIds) {
            const srcVideo = await this.videosService.findVideoByVideoId(srcVideoId);
            if (srcVideo) {
                srcVideosParam.push(new EmbedVideo(srcVideo));
                srcTags = srcTags.concat(srcVideo.tags);
            } else {
                const srcYoutubeVideo = await this.youtubeService.fetchVideo(srcVideoId);
                if (srcYoutubeVideo) {
                    srcVideosParam.push(new EmbedVideo(srcYoutubeVideo));
                } else {
                    throw new BadRequestException(
                        `Source video's id ${srcVideoId} :: If the source is private please add it in video first`,
                    );
                }
            }
        }
        const uniqSrcTags = uniqByKey(srcTags, 'tagId');
        return {
            srcTags: uniqSrcTags,
            srcVideosParam,
        };
    }

    async createClip(createClipInputDto: CreateClipInputDto): Promise<Clip> {
        const { videoId, srcVideoIds, langs } = createClipInputDto;

        const { srcTags, srcVideosParam } = await this.processSrcVideoIds(srcVideoIds);

        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);

        if (youtubeVideo) {
            return this.clipsRepository.create({
                ...youtubeVideo,
                srcVideos: srcVideosParam,
                tags: srcTags,
                langs,
            });
        }
        throw new BadRequestException(`Youtube video ${videoId} Not Found`);
    }

    async findClips(filter: FindClipsInputDto): Promise<FindClipsResponseDto> {
        const { title, from, to, uploader, tags, langs, limit, skip, sortOrder } = filter;

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
            langs,
        };

        return this.clipsRepository.find({
            ...searchQuery,
            limit,
            skip,
            sort: { publishedAt: sortOrder ? 1 : -1 },
        });
    }

    async findClipById(id: string): Promise<Clip> {
        return this.clipsRepository.findById(id);
    }

    async updateClip(id: string, updateClipInputDto: UpdateClipInputDto): Promise<Clip> {
        const { srcVideoIds = [], relatedVideoIds = [], tagIds = [] } = updateClipInputDto;

        //* Process srcVideoIds
        const { srcTags, srcVideosParam } = await this.processSrcVideoIds(srcVideoIds);

        const relatedVideos: EmbedVideo[] = [];
        const toBeUpdated: Clip[] = [];

        //* Remove dupe relatedVideoIds and process
        for (const relatedVideoId of uniq(relatedVideoIds)) {
            const existingClip = await this.clipsRepository.findByVideoId(relatedVideoId);
            if (existingClip) {
                //* embed existing clip
                relatedVideos.push(new EmbedVideo(existingClip));
                //* push existing clip to update stack
                toBeUpdated.push(existingClip);
            } else {
                //* if clip didn't exist search from youtube
                const youtubeVideo = await this.youtubeService.fetchVideo(relatedVideoId);
                if (youtubeVideo) {
                    relatedVideos.push(new EmbedVideo(youtubeVideo));
                } else {
                    throw new BadRequestException(`Related Video :: ${relatedVideoId} does not exist`);
                }
            }
        }

        const tags: EmbedTag[] = [];

        //* Process tagIds
        for (const tagId of uniq(tagIds)) {
            const tag = await this.tagsService.findTagByTagId(tagId);
            tags.push(new EmbedTag(tag));
        }

        const clip = await this.clipsRepository.update(id, {
            ...omit(updateClipInputDto, ['srcVideoIds', 'tagIds']),
            tags: uniqByKey(tags.concat(srcTags), 'tagId'), // combine tags and srcTags then remove dupe
            srcVideos: srcVideosParam,
            relatedVideos,
        });

        //* Update clips with related clip

        await Promise.all(
            toBeUpdated.map(async (existingClip) => {
                existingClip.relatedVideos = uniqByKey(
                    existingClip.relatedVideos
                        .concat(new EmbedVideo(clip))
                        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()),
                    'videoId',
                );
            }),
        );

        return clip;
    }

    async deleteClip(id: string): Promise<Clip> {
        const { docs: relatedVideos } = await this.clipsRepository.find({ 'relatedVideos.id': id });

        //* Remove video with videoId from all relatedVideos field
        await Promise.all(
            relatedVideos.map(async (relatedVideo) => {
                relatedVideo.relatedVideos = relatedVideo.relatedVideos.filter(({ id: rvId }) => rvId !== id);
                await relatedVideo.save();
            }),
        );

        return this.clipsRepository.delete(id);
    }
}
