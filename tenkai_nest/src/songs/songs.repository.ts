import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artists/schemas/artist.schema';
import { BaseRepository } from 'src/base/base.repository';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongsRepository extends BaseRepository<SongDocument> {
    constructor(@InjectModel(Song.name) private readonly songModel: Model<SongDocument>) {
        super(songModel, SongsRepository.name, {
            songId: 1,
            songNameEN: 1,
            songNameJP: 1,
            songNameRM: 1,
            artists: 1,
            duration: 1,
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

    async artistCascadeUpdate(artist: Artist): Promise<void> {
        const { artistId, artistNameEN, artistNameJP } = artist;
        this.logger.log(
            `Updating artists for ${this.collectionName}<artistId:${artistId}> with ${JSON.stringify({
                artistNameEN,
                artistNameJP,
            })}`,
        );
        await this.songModel.updateMany(
            { 'artists.artistId': artistId },
            {
                $set: {
                    'artists.$.artistNameEN': artistNameEN,
                    'artists.$.artistNameJP': artistNameJP,
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
        await this.songModel.updateMany(
            { 'artists.artistId': artistId },
            {
                $pull: {
                    artists: { artistId },
                },
            },
            {
                new: true,
            },
        );
    }
}
