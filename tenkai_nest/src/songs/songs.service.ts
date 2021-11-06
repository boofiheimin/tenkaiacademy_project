import { BadRequestException, Injectable } from '@nestjs/common';
import { SongsRepository } from './songs.repository';
import { CreateSongInputDto } from './dto/create-song.input.dto';
import { FindSongsInputDto } from './dto/find-songs.input.dto';
import { FindSongsResponseDto } from './dto/find-songs.response.dto';
import { UpdateSongInputDto } from './dto/update-song.input.dto';
import { Song } from './schemas/song.schema';
import { ArtistsService } from 'src/artists/artists.service';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';

@Injectable()
export class SongsService {
    constructor(private readonly songsRepository: SongsRepository, private readonly artistsService: ArtistsService) {}

    async createSong(createSongInputDto: CreateSongInputDto): Promise<Song> {
        const { songNameEN, songNameJP, artistIds } = createSongInputDto;

        //* Validate / process artistIds
        const artists = [];
        for (const artistId of artistIds) {
            const artist = await this.artistsService.findArtistByArtistId(artistId);
            if (artist) {
                artists.push(new EmbedArtist(artist));
            } else {
                throw new BadRequestException(`Artist id ${artistId} didn't exist`);
            }
        }

        //* Get latest index
        const latestSong = await this.songsRepository.findLatestSong();
        return this.songsRepository.create({
            songNameEN,
            artists,
            ...(songNameJP && { songNameJP }),
            songId: latestSong ? latestSong.songId + 1 : 1,
        });
    }

    async findSongs(findSongsInputDto: FindSongsInputDto): Promise<FindSongsResponseDto> {
        return this.songsRepository.find(findSongsInputDto);
    }

    async updateSong(id: string, updateSongInputDto: UpdateSongInputDto): Promise<Song> {
        //TODO Cascade update all songs/songRecords
        return this.songsRepository.update(id, updateSongInputDto);
    }

    async deleteSong(id: string): Promise<Song> {
        //TODO Cascade update all songs/songRecords
        return this.songsRepository.delete(id);
    }
}
