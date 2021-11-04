import { clipStub } from '../test/stub/clip.stub';

export const ClipsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(clipStub()),
    find: jest.fn().mockReturnValue({ docs: [clipStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(clipStub()),
    findOne: jest.fn().mockReturnValue(clipStub()),
    update: jest.fn().mockReturnValue(clipStub()),
    delete: jest.fn().mockReturnValue(clipStub()),
    findByVideoId: jest.fn().mockReturnValue(clipStub()),
    tagCascadeUpdate: jest.fn(),
    tagCascadeDelete: jest.fn(),
});
