import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsRepository } from '../artists.repository';
import { ArtistsService } from '../artists.service';
import { artistStub } from './stub/artist.stub';

jest.mock('../artists.repository');

describe('ArtistsService', () => {
    let artistsService: ArtistsService;
    let artistsRepository: ArtistsRepository;

    const testId = 'testId';

    let artist;
    let artists;
    let spy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtistsService, ArtistsRepository],
        }).compile();

        artistsService = module.get<ArtistsService>(ArtistsService);
        artistsRepository = module.get<ArtistsRepository>(ArtistsRepository);
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
                expect(artistsRepository.create).toBeCalledWith({ ...artistStub(), artistId: 1 });
            });
            it('should return with a user', async () => {
                expect(artist).toEqual(artistStub());
            });
        });
        describe('artist in db', () => {
            beforeEach(async () => {
                artist = await artistsService.createArtist(artistStub());
            });
            it('should call ArtistsRepository', async () => {
                expect(artistsRepository.create).toBeCalledWith({ ...artistStub(), artistId: 2 });
            });
            it('should return with a user', async () => {
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
            it('should call ArtistsRepository', () => {
                expect(artistsRepository.delete).toBeCalledWith(testId);
            });
            it('should return with an artist', () => {
                expect(artist).toEqual(artistStub());
            });
        });
    });
});
