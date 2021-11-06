import { Injectable } from '@nestjs/common';
import { SongsRepository } from './songs.repository';
import { CreateSongInputDto } from './dto/create-song.input.dto';
import { FindSongsInputDto } from './dto/find-songs.input.dto';
import { FindSongsResponseDto } from './dto/find-songs.response.dto';
import { UpdateSongInputDto } from './dto/update-song.input.dto';
import { Song } from './schemas/song.schema';

@Injectable()
export class SongsService {
    constructor(private readonly songsRepository: SongsRepository) {}

    async createSong(createSongInputDto: CreateSongInputDto): Promise<Song> {
        return this.songsRepository.create(createSongInputDto);
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
