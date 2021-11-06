import { songStub } from '../test/stubs/song.stub';

export const SongsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [songStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(songStub()),
    findOne: jest.fn().mockReturnValue(songStub()),
    update: jest.fn().mockReturnValue(songStub()),
    delete: jest.fn().mockReturnValue(songStub()),
    findLatestSong: jest.fn().mockReturnValue(songStub()),
    findBySongId: jest.fn().mockReturnValue(songStub()),
});
