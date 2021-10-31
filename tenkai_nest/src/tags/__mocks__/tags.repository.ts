import { tagStub } from '../test/stubs/tag.stub';

export const TagsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [tagStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(tagStub()),
    findOne: jest.fn().mockReturnValue(tagStub()),
    update: jest.fn().mockReturnValue(tagStub()),
    delete: jest.fn().mockReturnValue(tagStub()),
    findLatestTag: jest.fn().mockReturnValue(tagStub()),
});
