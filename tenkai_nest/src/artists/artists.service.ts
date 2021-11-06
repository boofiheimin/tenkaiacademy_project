import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistInputDto } from './dto/create-artist.input.dto';
import { FindArtistsInputDto } from './dto/find-artists.input.dto';
import { FindArtistsResponseDto } from './dto/find-artists.response.dto';
import { UpdateArtistInputDto } from './dto/update-artist.input.dto';
import { Artist } from './schemas/artist.schema';

@Injectable()
export class ArtistsService {
    constructor(private readonly artistsRepository: ArtistsRepository) {}

    async createArtist(createArtistInputDto: CreateArtistInputDto): Promise<Artist> {
        const latestArtist = await this.artistsRepository.findLatestArtist();
        return this.artistsRepository.create({
            ...createArtistInputDto,
            artistId: latestArtist ? latestArtist.artistId + 1 : 1,
        });
    }

    async findArtists(findArtistsInputDto: FindArtistsInputDto): Promise<FindArtistsResponseDto> {
        return this.artistsRepository.find(findArtistsInputDto);
    }

    async updateArtist(id: string, updateArtistInputDto: UpdateArtistInputDto): Promise<Artist> {
        //TODO Cascade update all songs/songRecords
        return this.artistsRepository.update(id, updateArtistInputDto);
    }

    async deleteArtist(id: string): Promise<Artist> {
        //TODO Cascade update all songs/songRecords
        return this.artistsRepository.delete(id);
    }
}
