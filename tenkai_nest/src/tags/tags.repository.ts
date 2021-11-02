import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsRepository extends BaseRepository<TagDocument> {
    constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {
        super(tagModel, TagsRepository.name, {
            tagId: 1,
            catId: 1,
            tagNameEN: 1,
            tagNameJP: 1,
            isClip: 1,
        });
    }

    async findLatestTag(): Promise<Tag> {
        const [latestTag] = await this.tagModel.find().sort({ tagId: -1 }).limit(1);
        return latestTag;
    }
}
