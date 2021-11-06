import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsService } from 'src/artists/artists.service';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { artistStub } from 'src/artists/test/stubs/artist.stub';
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

    let song: Song;
    let spy: jest.SpyInstance;

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
    });
});
