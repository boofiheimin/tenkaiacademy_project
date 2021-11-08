import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { artistStub } from 'src/artists/test/stubs/artist.stub';
import { Song } from 'src/songs/schemas/song.schema';

export const songStub = (): Song => ({
    songId: 1,
    songNameEN: 'test-song-name-en',
    songNameRM: 'test-song-name-rm',
    songNameJP: 'test-song-name-jp',
    artists: [new EmbedArtist(artistStub())],
    duration: 200,
});
