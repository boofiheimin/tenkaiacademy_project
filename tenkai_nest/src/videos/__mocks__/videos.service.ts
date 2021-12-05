import { videoStub } from '../test/stub/video.stub';

export const VideosService = jest.fn().mockReturnValue({
    createVideo: jest.fn().mockReturnValue(videoStub()),
    findVideoByVideoIdWithClip: jest.fn().mockReturnValue(videoStub()),
    findVideos: jest.fn().mockReturnValue({ docs: [videoStub()], totalCount: 1 }),
    updateVideo: jest.fn().mockReturnValue(videoStub()),
    deleteVideo: jest.fn().mockReturnValue(videoStub()),
    tagCascadeUpdate: jest.fn(),
    tagCascadeDelete: jest.fn(),
    findVideoByVideoId: jest.fn().mockImplementation((videoId: string) => {
        if (videoId === videoStub().videoId) {
            return videoStub();
        }
        return null;
    }),
});
