import { Artist } from 'src/artists/schemas/artist.schema';

export const artistStub = (): Artist => ({
    artistId: 1,
    artistNameEN: 'test-artist-en',
    artistNameJP: 'test-artist-jp',
});
