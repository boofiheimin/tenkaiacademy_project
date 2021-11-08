import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { SongsRepository } from './songs.repository';
import { CreateSongInputDto } from './dto/create-song.input.dto';
import { FindSongsInputDto } from './dto/find-songs.input.dto';
import { FindSongsResponseDto } from './dto/find-songs.response.dto';
import { UpdateSongInputDto } from './dto/update-song.input.dto';
import { Song } from './schemas/song.schema';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist, EmbedArtist } from 'src/artists/schemas/artist.schema';
import { isUndefined } from 'lodash';

@Injectable()
export class SongsService {
    constructor(
        private readonly songsRepository: SongsRepository,
        @Inject(forwardRef(() => ArtistsService)) private readonly artistsService: ArtistsService,
    ) {}

    async createSong(createSongInputDto: CreateSongInputDto): Promise<Song> {
        const { songNameEN, songNameJP, songNameRM, artistIds, duration } = createSongInputDto;

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
            songNameRM,
            artists,
            ...(songNameJP && { songNameJP }),
            songId: latestSong ? latestSong.songId + 1 : 1,
            duration,
        });
    }

    async findSongs(findSongsInputDto: FindSongsInputDto): Promise<FindSongsResponseDto> {
        const { songId, songNameEN, songNameJP, songNameRM, artistId, artistNameEN, artistNameJP, limit, sort, skip } =
            findSongsInputDto;

        const searchParams = {
            ...(!isUndefined(songId) && { songId }),
            ...(!isUndefined(songNameEN) && { songNameEN: new RegExp(songNameEN, 'i') }),
            ...(!isUndefined(songNameJP) && { songNameJP: new RegExp(songNameJP, 'i') }),
            ...(!isUndefined(songNameRM) && { songNameRM: new RegExp(songNameRM, 'i') }),
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
        const { songNameEN, songNameJP, songNameRM, artistIds, duration } = updateSongInputDto;

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
            ...(!isUndefined(songNameRM) && { songNameRM }),
            ...(!isUndefined(artists) && { artists }),
            ...(!isUndefined(duration) && { duration }),
        });

        //TODO Cascade update all songRecords.

        return song;
    }

    async deleteSong(id: string): Promise<Song> {
        const song = this.songsRepository.delete(id);
        //TODO Cascade update all songRecords
        return song;
    }

    async artistCascadeUpdate(artist: Artist): Promise<void> {
        return this.songsRepository.artistCascadeUpdate(artist);
    }

    async artistCascadeDelete(artist: Artist): Promise<void> {
        return this.songsRepository.artistCascadeDelete(artist);
    }

    async findSongBySongId(songId: number): Promise<Song> {
        return this.songsRepository.findBySongId(songId);
    }
}
