import { songRecordStub } from '../test/stubs/song-record.stub';

export const SongRecordsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [songRecordStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(songRecordStub()),
    findOne: jest.fn().mockReturnValue(songRecordStub()),
    update: jest.fn().mockReturnValue(songRecordStub()),
    delete: jest.fn().mockReturnValue(songRecordStub()),
});
