import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { SongRecord, SongRecordDocument } from './schemas/song-record.schema';

@Injectable()
export class SongRecordsRepository extends BaseRepository<SongRecordDocument> {
    constructor(@InjectModel(SongRecord.name) private readonly songRecordModel: Model<SongRecordDocument>) {
        super(songRecordModel, SongRecordsRepository.name);
    }
}
