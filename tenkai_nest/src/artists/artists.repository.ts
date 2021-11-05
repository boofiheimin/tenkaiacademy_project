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
}
