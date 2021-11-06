import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClipsService } from 'src/clips/clips.service';
import { VideosService } from 'src/videos/videos.service';
import { CreateTagInputDto } from './dto/create-tag.input.dto';
import { FindTagsInputDto } from './dto/find-tags.input.dto';
import { FindTagsResponseDto } from './dto/find-tags.response.dto';
import { UpdateTagInputDto } from './dto/update-tag.input.dto';
import { Tag } from './schemas/tag.schema';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
    constructor(
        private readonly tagsRepository: TagsRepository,
        @Inject(forwardRef(() => VideosService)) private readonly videosService: VideosService,
        @Inject(forwardRef(() => ClipsService)) private readonly clipsService: ClipsService,
    ) {}

    async createTag(data: CreateTagInputDto): Promise<Tag> {
        const latestTag = await this.tagsRepository.findLatestTag();
        return this.tagsRepository.create({ ...data, tagId: latestTag ? latestTag.tagId + 1 : 1 });
    }

    async findTags(filter: FindTagsInputDto): Promise<FindTagsResponseDto> {
        return this.tagsRepository.find(filter);
    }

    async updateTag(id: string, data: UpdateTagInputDto): Promise<Tag> {
        const tag = await this.tagsRepository.update(id, data);

        await this.videosService.tagCascadeUpdate(tag);
        await this.clipsService.tagCascadeUpdate(tag);

        return tag;
    }

    async deleteTag(id: string): Promise<Tag> {
        const tag = await this.tagsRepository.delete(id);

        await this.videosService.tagCascadeDelete(tag);
        await this.clipsService.tagCascadeDelete(tag);

        return tag;
    }

    async findTagByTagId(tagId: number): Promise<Tag> {
        return this.tagsRepository.findOne({ tagId });
    }
}
