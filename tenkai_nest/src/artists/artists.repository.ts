import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Artist, ArtistDocument } from './schemas/artist.schema';

@Injectable()
export class ArtistsRepository extends BaseRepository<ArtistDocument> {
    constructor(@InjectModel(Artist.name) private readonly artistModel: Model<ArtistDocument>) {
        super(artistModel, ArtistsRepository.name, {
            artistId: 1,
            artistNameEN: 1,
            artistNameJP: 1,
        });
    }

    async findByArtistId(artistId: number): Promise<Artist> {
        this.logger.log(`Finding ${this.collectionName}<artistId:${artistId}>`);
        return this.artistModel.findOne({ artistId });
    }

    async findLatestArtist(): Promise<Artist> {
        this.logger.log(`Finding latest ${this.collectionName}`);
        const [latestTag] = await this.artistModel.find().sort({ artistId: -1 }).limit(1);
        return latestTag;
    }
}
