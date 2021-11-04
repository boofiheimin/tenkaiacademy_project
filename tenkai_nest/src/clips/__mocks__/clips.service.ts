import { clipStub } from '../test/stub/clip.stub';

export const ClipsService = jest.fn().mockReturnValue({
    createClip: jest.fn().mockReturnValue(clipStub()),
    findClips: jest.fn().mockReturnValue({ docs: [clipStub()], totalCount: 1 }),
    findClipById: jest.fn().mockReturnValue(clipStub()),
    updateClip: jest.fn().mockReturnValue(clipStub()),
    deleteClip: jest.fn().mockReturnValue(clipStub()),
});
