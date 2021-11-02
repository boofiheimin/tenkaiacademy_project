import { videoStub } from '../test/stub/video.stub';

export const VideosRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(videoStub()),
    find: jest.fn().mockReturnValue({ docs: [videoStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(videoStub()),
    findOne: jest.fn().mockReturnValue(videoStub()),
    update: jest.fn().mockReturnValue(videoStub()),
    delete: jest.fn().mockReturnValue(videoStub()),
    findByIdWithClip: jest.fn().mockReturnValue({ ...videoStub(), clips: [] }),
    findOneAndUpsert: jest.fn().mockReturnValue(videoStub()),
    tagCascadeUpdate: jest.fn(),
    tagCascadeDelete: jest.fn(),
});
