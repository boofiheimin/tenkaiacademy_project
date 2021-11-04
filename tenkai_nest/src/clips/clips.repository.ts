import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
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
}
