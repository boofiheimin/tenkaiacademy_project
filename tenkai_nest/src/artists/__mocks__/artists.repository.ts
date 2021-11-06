import { artistStub } from '../test/stub/artist.stub';

export const ArtistsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [artistStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(artistStub()),
    findOne: jest.fn().mockReturnValue(artistStub()),
    update: jest.fn().mockReturnValue(artistStub()),
    delete: jest.fn().mockReturnValue(artistStub()),
    findLatestArtist: jest.fn().mockReturnValue(artistStub()),
    findByArtistId: jest.fn().mockReturnValue(artistStub()),
});
