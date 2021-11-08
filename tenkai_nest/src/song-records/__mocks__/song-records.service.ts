import { songRecordStub } from '../test/stubs/song-record.stub';

export const SongRecordsService = jest.fn().mockReturnValue({
    createSongRecord: jest.fn().mockReturnValue(songRecordStub()),
    findSongRecords: jest.fn().mockReturnValue({ docs: [songRecordStub()], totalCount: 1 }),
    updateSongRecord: jest.fn().mockReturnValue(songRecordStub()),
    deleteSongRecord: jest.fn().mockReturnValue(songRecordStub()),
    artistCascadeUpdate: jest.fn(),
    artistCascadeDelete: jest.fn(),
    songCascadeUpdate: jest.fn(),
    songCascadeDelete: jest.fn(),
});
