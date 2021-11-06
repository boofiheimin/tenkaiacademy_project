import { BadRequestException, Injectable } from '@nestjs/common';
import { SongsRepository } from './songs.repository';
import { CreateSongInputDto } from './dto/create-song.input.dto';
import { FindSongsInputDto } from './dto/find-songs.input.dto';
import { FindSongsResponseDto } from './dto/find-songs.response.dto';
import { UpdateSongInputDto } from './dto/update-song.input.dto';
import { Song } from './schemas/song.schema';
import { ArtistsService } from 'src/artists/artists.service';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { isUndefined } from 'lodash';

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
        const { songId, songNameEN, songNameJP, artistId, artistNameEN, artistNameJP, limit, sort, skip } =
            findSongsInputDto;

        const searchParams = {
            ...(!isUndefined(songId) && { songId }),
            ...(!isUndefined(songNameEN) && { songNameEN: new RegExp(songNameEN, 'i') }),
            ...(!isUndefined(songNameJP) && { songNameJP: new RegExp(songNameJP, 'i') }),
            ...(!isUndefined(artistId) && { 'artists.artistId': artistId }),
            ...(!isUndefined(artistNameEN) && { 'artists.artistNameEN': new RegExp(artistNameEN, 'i') }),
            ...(!isUndefined(artistNameJP) && { 'artists.artistNameJP': new RegExp(artistNameJP, 'i') }),
            ...(!isUndefined(limit) && { limit }),
            ...(!isUndefined(skip) && { skip }),
            ...(!isUndefined(sort) ? { sort } : { sort: { songId: 1 } }),
        };

        return this.songsRepository.find(searchParams);
    }

    async updateSong(id: string, updateSongInputDto: UpdateSongInputDto): Promise<Song> {
        const { songNameEN, songNameJP, artistIds } = updateSongInputDto;

        let artists: EmbedArtist[] | undefined;
        if (artistIds) {
            artists = [];
            for (const artistId of artistIds) {
                const artist = await this.artistsService.findArtistByArtistId(artistId);
                if (artist) {
                    artists.push(new EmbedArtist(artist));
                } else {
                    throw new BadRequestException(`Artist id ${artistId} didn't exist`);
                }
            }
        }

        const song = this.songsRepository.update(id, {
            ...(!isUndefined(songNameEN) && { songNameEN }),
            ...(!isUndefined(songNameJP) && { songNameJP }),
            ...(!isUndefined(artists) && { artists }),
        });

        //TODO Cascade update all songs/songRecords.

        return song;
    }

    async deleteSong(id: string): Promise<Song> {
        //TODO Cascade update all songs/songRecords
        return this.songsRepository.delete(id);
    }
}
