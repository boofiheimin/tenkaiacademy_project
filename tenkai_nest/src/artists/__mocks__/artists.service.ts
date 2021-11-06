import { artistStub } from '../test/stubs/artist.stub';

export const ArtistsService = jest.fn().mockReturnValue({
    createArtist: jest.fn().mockReturnValue(artistStub()),
    findArtists: jest.fn().mockReturnValue({ docs: [artistStub()], totalCount: 1 }),
    updateArtist: jest.fn().mockReturnValue(artistStub()),
    deleteArtist: jest.fn().mockReturnValue(artistStub()),
    findArtistByArtistId: jest.fn().mockReturnValue(artistStub()),
});
