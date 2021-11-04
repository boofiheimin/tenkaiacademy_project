import { tagStub } from '../test/stubs/tag.stub';

export const TagsService = jest.fn().mockReturnValue({
    createTag: jest.fn().mockReturnValue(tagStub()),
    findPrivateTag: jest.fn().mockReturnValue(tagStub()),
    findTags: jest.fn().mockReturnValue({ docs: [tagStub()], totalCount: 1 }),
    updateTag: jest.fn().mockReturnValue(tagStub()),
    deleteTag: jest.fn().mockReturnValue(tagStub()),
    findTagByTagId: jest.fn().mockReturnValue(tagStub()),
});
