import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsService } from 'src/artists/artists.service';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { artistStub } from 'src/artists/test/stubs/artist.stub';
import { FindSongsResponseDto } from '../dto/find-songs.response.dto';
import { Song } from '../schemas/song.schema';
import { SongsRepository } from '../songs.repository';
import { SongsService } from '../songs.service';
import { songStub } from './stubs/song.stub';

jest.mock('src/artists/artists.service');
jest.mock('../songs.repository');

describe('SongsService', () => {
    let songsService: SongsService;
    let songsRepository: SongsRepository;
    let artistsService: ArtistsService;

    const id = 'test-id';
    const randomId = 777;

    let song: Song;
    let songs: FindSongsResponseDto;
    let spy: jest.SpyInstance;
    let error: Error;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SongsService, SongsRepository, ArtistsService],
        }).compile();

        songsService = module.get<SongsService>(SongsService);
        songsRepository = module.get<SongsRepository>(SongsRepository);
        artistsService = module.get<ArtistsService>(ArtistsService);

        jest.clearAllMocks();
    });

    afterEach(() => {
        if (spy) {
            spy.mockClear();
        }
    });

    describe('createSong', () => {
        describe('no song in db', () => {
            beforeEach(async () => {
                spy = jest.spyOn(songsRepository, 'findLatestSong').mockReturnValueOnce(null);
                song = await songsService.createSong({
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artistIds: [artistStub().artistId],
                });
            });
            it('should call ArtistsService', () => {
                expect(artistsService.findArtistByArtistId).toBeCalledWith(artistStub().artistId);
            });
            it('should call SongsRepository', () => {
                expect(songsRepository.findLatestSong).toBeCalled();
                expect(songsRepository.create).toBeCalledWith({
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artists: [new EmbedArtist(artistStub())],
                    songId: 1,
                });
            });
            it('should return with a song', () => {
                expect(song).toEqual(songStub());
            });
        });
        describe('song in db', () => {
            beforeEach(async () => {
                song = await songsService.createSong({
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artistIds: [artistStub().artistId],
                });
            });
            it('should call ArtistsService', () => {
                expect(artistsService.findArtistByArtistId).toBeCalledWith(artistStub().artistId);
            });
            it('should call SongsRepository', () => {
                expect(songsRepository.findLatestSong).toBeCalled();
                expect(songsRepository.create).toBeCalledWith({
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artists: [new EmbedArtist(artistStub())],
                    songId: songStub().songId + 1,
                });
            });
            it('should return with a song', () => {
                expect(song).toEqual({ ...songStub(), songId: songStub().songId + 1 });
            });
        });
        describe('invalid-artist id', () => {
            beforeEach(async () => {
                try {
                    song = await songsService.createSong({
                        songNameEN: songStub().songNameEN,
                        songNameJP: songStub().songNameJP,
                        artistIds: [randomId],
                    });
                } catch (e) {
                    error = e;
                }
            });
            it('should call ArtistsService', () => {
                expect(artistsService.findArtistByArtistId).toBeCalledWith(randomId);
            });
            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
    });
    describe('findSongs', () => {
        describe('wo/ filter', () => {
            beforeEach(async () => {
                songs = await songsService.findSongs({});
            });
            it('should call SongsRepository', () => {
                expect(songsRepository.find).toBeCalledWith({
                    sort: { songId: 1 },
                });
            });
            it('should return with a song', () => {
                expect(songs).toEqual({
                    docs: [songStub()],
                    totalCount: 1,
                });
            });
        });
        describe('w/ filter', () => {
            beforeEach(async () => {
                songs = await songsService.findSongs({
                    songId: 1,
                    songNameEN: 'search-this',
                    songNameJP: 'search-that',
                    artistId: 1,
                    artistNameEN: 'search-those',
                    artistNameJP: 'search-these',
                    limit: 1,
                    skip: 0,
                    sort: { songNameEN: 1 },
                });
            });
            it('should call SongsRepository', () => {
                expect(songsRepository.find).toBeCalledWith({
                    songId: 1,
                    songNameEN: new RegExp('search-this', 'i'),
                    songNameJP: new RegExp('search-that', 'i'),
                    'artists.artistId': 1,
                    'artists.artistNameEN': new RegExp('search-those', 'i'),
                    'artists.artistNameJP': new RegExp('search-these', 'i'),
                    limit: 1,
                    skip: 0,
                    sort: { songNameEN: 1 },
                });
            });
            it('should return with a song', () => {
                expect(songs).toEqual({
                    docs: [songStub()],
                    totalCount: 1,
                });
            });
        });
    });
    describe('updateSong', () => {
        describe('valid artistId', () => {
            beforeEach(async () => {
                song = await songsService.updateSong(id, {
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artistIds: [artistStub().artistId],
                });
            });
            it('should call ArtistsService', () => {
                expect(artistsService.findArtistByArtistId).toBeCalledWith(artistStub().artistId);
            });
            it('should call SongsRepository', () => {
                expect(songsRepository.update).toBeCalledWith(id, {
                    songNameEN: songStub().songNameEN,
                    songNameJP: songStub().songNameJP,
                    artists: [new EmbedArtist(artistStub())],
                });
            });
            it('should return with a song', () => {
                expect(song).toEqual(songStub());
            });
        });
        describe('invalid artistId', () => {
            beforeEach(async () => {
                try {
                    await songsService.updateSong(id, {
                        songNameEN: songStub().songNameEN,
                        songNameJP: songStub().songNameJP,
                        artistIds: [randomId],
                    });
                } catch (e) {
                    error = e;
                }
            });
            it('should call ArtistsService', () => {
                expect(artistsService.findArtistByArtistId).toBeCalledWith(randomId);
            });

            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
    });
});
