import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SongsService } from 'src/songs/songs.service';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistInputDto } from './dto/create-artist.input.dto';
import { FindArtistsInputDto } from './dto/find-artists.input.dto';
import { FindArtistsResponseDto } from './dto/find-artists.response.dto';
import { UpdateArtistInputDto } from './dto/update-artist.input.dto';
import { Artist } from './schemas/artist.schema';

@Injectable()
export class ArtistsService {
    constructor(
        private readonly artistsRepository: ArtistsRepository,
        @Inject(forwardRef(() => SongsService)) private readonly songsService: SongsService,
    ) {}

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
        const artist = await this.artistsRepository.update(id, updateArtistInputDto);
        //TODO Cascade update all songRecords
        await this.songsService.artistCascadeUpdate(artist);
        return artist;
    }

    async deleteArtist(id: string): Promise<Artist> {
        const artist = await this.artistsRepository.delete(id);
        //TODO Cascade update all songRecords
        await this.songsService.artistCascadeDelete(artist);
        return artist;
    }

    async findArtistByArtistId(artistId: number): Promise<Artist> {
        return this.artistsRepository.findByArtistId(artistId);
    }
}
