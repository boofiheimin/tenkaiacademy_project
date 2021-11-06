import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongsRepository extends BaseRepository<SongDocument> {
    constructor(@InjectModel(Song.name) private readonly songModel: Model<SongDocument>) {
        super(songModel, SongsRepository.name, {
            songId: 1,
            songNameEN: 1,
            songNameJP: 1,
            songs: 1,
        });
    }

    async findBySongId(songId: number): Promise<Song> {
        this.logger.log(`Finding ${this.collectionName}<songId:${songId}>`);
        return this.songModel.findOne({ songId });
    }

    async findLatestSong(): Promise<Song> {
        this.logger.log(`Finding latest ${this.collectionName}`);
        const [latestTag] = await this.songModel.find().sort({ songId: -1 }).limit(1);
        return latestTag;
    }
}
