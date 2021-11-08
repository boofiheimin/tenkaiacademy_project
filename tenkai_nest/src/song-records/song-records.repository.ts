import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artists/schemas/artist.schema';
import { BaseRepository } from 'src/base/base.repository';
import { Song } from 'src/songs/schemas/song.schema';
import { SongRecord, SongRecordDocument } from './schemas/song-record.schema';

@Injectable()
export class SongRecordsRepository extends BaseRepository<SongRecordDocument> {
    constructor(@InjectModel(SongRecord.name) private readonly songRecordModel: Model<SongRecordDocument>) {
        super(songRecordModel, SongRecordsRepository.name);
    }

    async artistCascadeUpdate(artist: Artist): Promise<void> {
        const { artistId, artistNameEN, artistNameJP } = artist;
        this.logger.log(
            `Updating artists for ${this.collectionName}<artistId:${artistId}> with ${JSON.stringify({
                artistNameEN,
                artistNameJP,
            })}`,
        );
        await this.songRecordModel.updateMany(
            { 'song.artists.artistId': artistId },
            {
                $set: {
                    'song.artists.$.artistNameEN': artistNameEN,
                    'song.artists.$.artistNameJP': artistNameJP,
                },
            },
            {
                new: true,
            },
        );
    }

    async artistCascadeDelete(artist: Artist): Promise<void> {
        const { artistId } = artist;
        this.logger.log(`Removing artists for ${this.collectionName}<artistId:${artistId}>`);
        await this.songRecordModel.updateMany(
            { 'song.artists.artistId': artistId },
            {
                $pull: {
                    'song.artists': { artistId },
                },
            },
            {
                new: true,
            },
        );
    }

    async songCascadeUpdate(song: Song): Promise<void> {
        const { artists, songNameEN, songNameJP, songNameRM, songId } = song;
        this.logger.log(
            `Updating songs for ${this.collectionName}<songId:${songId}> with ${JSON.stringify({
                songNameEN,
                songNameRM,
                songNameJP,
                artists,
            })}`,
        );
        await this.songRecordModel.updateMany(
            { 'song.songId': songId },
            {
                $set: {
                    'song.artists': artists,
                    'song.songNameEN': songNameEN,
                    'song.songNameRM': songNameRM,
                    'song.songNameJP': songNameJP,
                },
            },
            {
                new: true,
            },
        );
    }

    async songCascadeDelete(song: Song): Promise<void> {
        const { songId } = song;
        this.logger.log(`Removing ${this.collectionName}<songId:${songId}>`);
        await this.songRecordModel.deleteMany({ 'song.songId': songId });
    }
}
