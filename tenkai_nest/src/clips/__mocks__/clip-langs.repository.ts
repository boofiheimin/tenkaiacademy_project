import { clipLangStub } from '../test/stub/clip-lang.stub';

export const ClipLangsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(clipLangStub()),
    find: jest.fn().mockReturnValue({ docs: [clipLangStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(clipLangStub()),
    findOne: jest.fn().mockReturnValue(clipLangStub()),
    update: jest.fn().mockReturnValue(clipLangStub()),
    delete: jest.fn().mockReturnValue(clipLangStub()),
    findClipLangByCode: jest.fn().mockImplementation((code: string) => {
        if (code === clipLangStub().code) {
            return clipLangStub();
        }
        return null;
    }),
});
