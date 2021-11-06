import { songStub } from '../test/stubs/song.stub';

export const SongsService = jest.fn().mockReturnValue({
    createSong: jest.fn().mockReturnValue(songStub()),
    findSongs: jest.fn().mockReturnValue({ docs: [songStub()], totalCount: 1 }),
    updateSong: jest.fn().mockReturnValue(songStub()),
    deleteSong: jest.fn().mockReturnValue(songStub()),
    findSongBySongId: jest.fn().mockImplementation((songId: number) => {
        if (songId === songStub().songId) {
            return songStub();
        }
        return null;
    }),
    artistCascadeUpdate: jest.fn(),
    artistCascadeDelete: jest.fn(),
});
