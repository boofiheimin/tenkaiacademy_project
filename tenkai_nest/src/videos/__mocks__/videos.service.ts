import { videoStub } from '../test/stub/video.stub';

export const VideosService = jest.fn().mockReturnValue({
    createVideo: jest.fn().mockReturnValue(videoStub()),
    findVideoById: jest.fn().mockReturnValue(videoStub()),
    findVideos: jest.fn().mockReturnValue({ docs: [videoStub()], totalCount: 1 }),
    updateVideo: jest.fn().mockReturnValue(videoStub()),
    deleteVideo: jest.fn().mockReturnValue(videoStub()),
});
