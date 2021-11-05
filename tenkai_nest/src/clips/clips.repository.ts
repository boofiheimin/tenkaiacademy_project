import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Tag } from 'src/tags/schemas/tag.schema';
import { ClipLang } from './schemas/clip-lang.schema';
import { Clip, ClipDocument } from './schemas/clip.schema';

@Injectable()
export class ClipsRepository extends BaseRepository<ClipDocument> {
    constructor(@InjectModel(Clip.name) private readonly clipModel: Model<ClipDocument>) {
        super(clipModel, ClipsRepository.name, {
            _id: 1,
            videoId: 1,
            srcVideos: 1,
            title: 1,
            description: 1,
            thumbnail: 1,
            duration: 1,
            publishedAt: 1,
            tags: 1,
            uploader: 1,
            relatedClips: 1,
            langs: 1,
        });
    }

    async findByVideoId(videoId: string) {
        return this.clipModel.findOne({ videoId });
    }

    async tagCascadeUpdate(tag: Tag): Promise<void> {
        const { tagId, tagNameEN, tagNameJP } = tag;
        await this.clipModel.updateMany(
            { 'tags.tagId': tagId },
            {
                $set: {
                    'tags.$.tagNameEN': tagNameEN,
                    'tags.$.tagNameJP': tagNameJP,
                },
            },
            {
                new: true,
            },
        );
    }

    async tagCascadeDelete(tag: Tag): Promise<void> {
        const { tagId } = tag;
        await this.clipModel.updateMany(
            { 'tags.tagId': tagId },
            {
                $pull: {
                    tags: { tagId },
                },
            },
            {
                new: true,
            },
        );
    }

    async langCascadeDelete(clipLang: ClipLang): Promise<void> {
        const { code } = clipLang;
        await this.clipModel.updateMany(
            { langs: code },
            {
                $pull: {
                    langs: code,
                },
            },
            {
                new: true,
            },
        );
    }
}
