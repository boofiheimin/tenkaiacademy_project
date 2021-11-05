import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { Artist } from './schemas/artist.schema';

@Injectable()
export class ArtistsService {
    constructor(private readonly artistsRepository: ArtistsRepository) {}

    async createArtist(data: any): Promise<Artist> {
        return this.artistsRepository.create(data);
    }

    async findArtists(filter: any): Promise<any> {
        return this.artistsRepository.find(filter);
    }

    async updateArtist(id: string, data: any): Promise<Artist> {
        return this.artistsRepository.update(id, data);
    }

    async deleteArtist(id: string) {
        return this.artistsRepository.delete(id);
    }
}
