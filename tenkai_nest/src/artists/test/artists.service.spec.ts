import { Test, TestingModule } from '@nestjs/testing';
import { SongRecordsService } from 'src/song-records/song-records.service';
import { SongsService } from 'src/songs/songs.service';
import { ArtistsRepository } from '../artists.repository';
import { ArtistsService } from '../artists.service';
import { FindArtistsResponseDto } from '../dto/find-artists.response.dto';
import { Artist } from '../schemas/artist.schema';
import { artistStub } from './stubs/artist.stub';

jest.mock('../artists.repository');
jest.mock('src/songs/songs.service');
jest.mock('src/song-records/song-records.service');

describe('ArtistsService', () => {
    let artistsService: ArtistsService;
    let artistsRepository: ArtistsRepository;
    let songsService: SongsService;
    let songRecordsService: SongRecordsService;

    const testId = 'testId';

    let artist: Artist;
    let artists: FindArtistsResponseDto;
    let spy: jest.SpyInstance;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtistsService, ArtistsRepository, SongsService, SongRecordsService],
        }).compile();

        artistsService = module.get<ArtistsService>(ArtistsService);
        artistsRepository = module.get<ArtistsRepository>(ArtistsRepository);
        songsService = module.get<SongsService>(SongsService);
        songRecordsService = module.get<SongRecordsService>(SongRecordsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (spy) {
            spy.mockClear();
        }
    });

    describe('createArtists', () => {
        describe('no artist in db', () => {
            beforeEach(async () => {
                spy = jest.spyOn(artistsRepository, 'findLatestArtist').mockReturnValueOnce(null);
                artist = await artistsService.createArtist(artistStub());
            });
            it('should call ArtistsRepository', async () => {
                expect(artistsRepository.findLatestArtist).toBeCalled();
                expect(artistsRepository.create).toBeCalledWith({ ...artistStub(), artistId: 1 });
            });
            it('should return with a artist', async () => {
                expect(artist).toEqual(artistStub());
            });
        });
        describe('artist in db', () => {
            beforeEach(async () => {
                artist = await artistsService.createArtist(artistStub());
            });
            it('should call ArtistsRepository', async () => {
                expect(artistsRepository.findLatestArtist).toBeCalled();
                expect(artistsRepository.create).toBeCalledWith({ ...artistStub(), artistId: 2 });
            });
            it('should return with a artist', async () => {
                expect(artist).toEqual({ ...artistStub(), artistId: 2 });
            });
        });
    });

    describe('findArtists', () => {
        describe('when call', () => {
            beforeEach(async () => {
                artists = await artistsService.findArtists({});
            });
            it('should call ArtistsRepository', () => {
                expect(artistsRepository.find).toBeCalledWith({});
            });
            it('should return with artists', () => {
                expect(artists).toEqual({
                    docs: [artistStub()],
                    totalCount: 1,
                });
            });
        });
    });

    describe('updateArtist', () => {
        describe('when call', () => {
            beforeEach(async () => {
                artist = await artistsService.updateArtist(testId, {
                    artistNameEN: 'test',
                });
            });
            it('should call SongsService', () => {
                expect(songsService.artistCascadeUpdate).toBeCalledWith(artistStub());
            });
            it('should call SongRecordsService', () => {
                expect(songRecordsService.artistCascadeUpdate).toBeCalledWith(artistStub());
            });
            it('should call ArtistsRepository', () => {
                expect(artistsRepository.update).toBeCalledWith(testId, { artistNameEN: 'test' });
            });
            it('should return with an artist', () => {
                expect(artist).toEqual(artistStub());
            });
        });
    });
    describe('deleteArtist', () => {
        describe('when call', () => {
            beforeEach(async () => {
                artist = await artistsService.deleteArtist(testId);
            });
            it('should call SongsService', () => {
                expect(songsService.artistCascadeDelete).toBeCalledWith(artistStub());
            });
            it('should call SongRecordsService', () => {
                expect(songRecordsService.artistCascadeDelete).toBeCalledWith(artistStub());
            });
            it('should call ArtistsRepository', () => {
                expect(artistsRepository.delete).toBeCalledWith(testId);
            });
            it('should return with an artist', () => {
                expect(artist).toEqual(artistStub());
            });
        });
    });
});
