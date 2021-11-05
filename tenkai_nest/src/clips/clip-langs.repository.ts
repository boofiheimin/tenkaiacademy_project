import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { ClipLang, ClipLangDocument } from './schemas/clip-lang.schema';

@Injectable()
export class ClipLangsRepository extends BaseRepository<ClipLangDocument> {
    constructor(@InjectModel(ClipLang.name) private readonly clipLangModel: Model<ClipLangDocument>) {
        super(clipLangModel, ClipLangsRepository.name, {
            code: 1,
            fullName: 1,
        });
    }
}
