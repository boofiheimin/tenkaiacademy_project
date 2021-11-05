import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { omit, uniq } from 'lodash';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedTag, Tag } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { uniqByKey } from 'src/utils/utilities';
import { EmbedVideo } from 'src/videos/schemas/video.schema';
import { VideosService } from 'src/videos/videos.service';
import { ClipLangsRepository } from './clip-langs.repository';
import { ClipsRepository } from './clips.repository';
import { CreateClipLangInputDto } from './dto/create-clip-lang.input.dto';
import { CreateClipInputDto } from './dto/create-clip.input.dto';
import { FindClipLangsInputDto } from './dto/find-clip-langs.input.dto';
import { FindClipLangsResponseDto } from './dto/find-clip-langs.response';
import { FindClipsInputDto } from './dto/find-clips.input.dto';
import { FindClipsResponseDto } from './dto/find-clips.response.dto';
import { UpdateClipLangInputDto } from './dto/update-clip-lang.input.dto';
import { UpdateClipInputDto } from './dto/update-clip.input.dto';
import { ClipLang } from './schemas/clip-lang.schema';
import { Clip, EmbedClip } from './schemas/clip.schema';

interface TagIdFilter {
    'tags.tagId': number;
}

interface ProcessedSrcVideo {
    srcTagsParam: EmbedTag[];
    srcVideosParam: EmbedVideo[];
}

@Injectable()
export class ClipsService {
    constructor(
        private readonly clipsRepository: ClipsRepository,
        private readonly clipLangsRepository: ClipLangsRepository,
        private readonly youtubeService: YoutubeService,
        @Inject(forwardRef(() => VideosService)) private readonly videosService: VideosService,
        @Inject(forwardRef(() => TagsService)) private readonly tagsService: TagsService,
    ) {}

    private async processSrcVideoIds(srcVideoIds: string[]): Promise<ProcessedSrcVideo> {
        const srcVideosParam: EmbedVideo[] = [];
        let srcTags: EmbedTag[] = [];
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
                        `Source video's id ${srcVideoId} does not exist :: If the source is private please add it in video first`,
                    );
                }
            }
        }
        const uniqSrcTags = uniqByKey(srcTags, 'tagId');
        return {
            srcTagsParam: uniqSrcTags,
            srcVideosParam,
        };
    }

    async createClip(createClipInputDto: CreateClipInputDto): Promise<Clip> {
        const { videoId, srcVideoIds, langs } = createClipInputDto;

        const { srcTagsParam, srcVideosParam } = await this.processSrcVideoIds(srcVideoIds);
        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);

        if (!youtubeVideo) {
            throw new BadRequestException(`Youtube video ${videoId} Not Found`);
        }

        const { docs: relatedClips } = await this.clipsRepository.find({ 'relatedClips.videoId': videoId });

        //* Update all previous instance of clips that contain this clip as relatedClip
        const clip = await this.clipsRepository.create({
            ...youtubeVideo,
            srcVideos: srcVideosParam,
            tags: srcTagsParam,
            langs,
        });

        for (const relatedClip of relatedClips) {
            relatedClip.relatedClips = relatedClip.relatedClips.map((rClip) => {
                if (rClip.videoId === videoId) {
                    return new EmbedClip(clip);
                }
                return rClip;
            });
            await relatedClip.save();
        }

        return clip;
    }

    async findClips(filter: FindClipsInputDto): Promise<FindClipsResponseDto> {
        const { title, from, to, uploader, tagIds, langs, limit, skip, sortOrder } = filter;

        const tagsFilter: TagIdFilter[] = [];

        (tagIds || []).forEach((tagId: number) => {
            tagsFilter.push({ 'tags.tagId': tagId });
        });

        const searchQuery = {
            ...(title && { title: new RegExp(title, 'i') }),
            ...(uploader && { uploader: new RegExp(uploader, 'i') }),
            ...((from || to) && {
                publishedAt: { ...(from && { $gte: from }), ...(to && { $lte: to }) },
            }),
            ...(tagsFilter.length > 0 && { $and: tagsFilter }),
            ...(langs && { langs }),
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
        const { srcVideoIds, relatedClipIds, tagIds } = updateClipInputDto;
        let srcVideos: EmbedVideo[];
        let srcTags: EmbedTag[];
        //* Process srcVideoIds
        if (srcVideoIds) {
            const { srcTagsParam, srcVideosParam } = await this.processSrcVideoIds(srcVideoIds);
            srcVideos = srcVideosParam;
            srcTags = srcTagsParam;
        }

        let relatedClips: EmbedClip[] | undefined;
        const toBeUpdated: Clip[] = [];

        if (relatedClipIds) {
            relatedClips = [];
            //* Remove dupe relatedClipIds and process
            for (const relatedClipId of uniq(relatedClipIds)) {
                const existingClip = await this.clipsRepository.findByVideoId(relatedClipId);
                if (existingClip) {
                    //* embed existing clip
                    relatedClips.push(new EmbedClip(existingClip));
                    //* push existing clip to update stack
                    toBeUpdated.push(existingClip);
                } else {
                    //* if clip didn't exist search from youtube
                    const youtubeVideo = await this.youtubeService.fetchVideo(relatedClipId);
                    if (youtubeVideo) {
                        relatedClips.push(new EmbedClip(youtubeVideo));
                    } else {
                        throw new BadRequestException(`Related Video :: ${relatedClipId} does not exist`);
                    }
                }
            }
        }

        let tags: EmbedTag[] | undefined;

        if (tagIds) {
            //* Process tagIds
            tags = [];
            for (const tagId of uniq(tagIds)) {
                const tag = await this.tagsService.findTagByTagId(tagId);
                tags.push(new EmbedTag(tag));
            }
            if (srcTags) {
                tags = uniqByKey(tags.concat(srcTags), 'tagId');
            }
        } else if (!tagIds && srcTags) {
            const currentClip = await this.clipsRepository.findById(id);
            tags = uniqByKey(currentClip.tags.concat(srcTags), 'tagId'); // combine tags and srcTags then remove dupe
        }

        const clip = await this.clipsRepository.update(id, {
            ...omit(updateClipInputDto, ['srcVideoIds', 'tagIds', 'relatedClipIds']),
            tags,
            srcVideos,
            relatedClips,
        });

        //* Update clips with related clip

        await Promise.all(
            toBeUpdated.map(async (existingClip) => {
                existingClip.relatedClips = uniqByKey(
                    existingClip.relatedClips
                        .concat(new EmbedClip(clip))
                        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()),
                    'videoId',
                );
            }),
        );

        return clip;
    }

    async deleteClip(id: string): Promise<Clip> {
        const { docs: relatedClips } = await this.clipsRepository.find({ 'relatedClips.id': id });

        //* Remove video with videoId from all relatedClips field
        await Promise.all(
            relatedClips.map(async (relatedClip) => {
                relatedClip.relatedClips = relatedClip.relatedClips.filter(({ id: rvId }) => rvId !== id);
                await relatedClip.save();
            }),
        );

        return this.clipsRepository.delete(id);
    }

    async tagCascadeUpdate(tag: Tag): Promise<void> {
        return this.clipsRepository.tagCascadeUpdate(tag);
    }

    async tagCascadeDelete(tag: Tag): Promise<void> {
        return this.clipsRepository.tagCascadeDelete(tag);
    }

    async createClipLang(createClipLangInputDto: CreateClipLangInputDto): Promise<ClipLang> {
        return this.clipLangsRepository.create(createClipLangInputDto);
    }
    async updateClipLang(id: string, updateClipLangInputDto: UpdateClipLangInputDto): Promise<ClipLang> {
        return this.clipLangsRepository.update(id, updateClipLangInputDto);
    }
    async findClipLangs(findClipLangsInputDto: FindClipLangsInputDto): Promise<FindClipLangsResponseDto> {
        return this.clipLangsRepository.find(findClipLangsInputDto);
    }
    async deleteClipLang(id: string): Promise<ClipLang> {
        return this.clipLangsRepository.delete(id);
    }
}
