import { videoIdsStub, youtubeStub } from '../test/stub/youtube.stub';

export const YoutubeService = jest.fn().mockReturnValue({
    fetchVideo: jest.fn().mockImplementation((videoId: string) => {
        if (videoId === youtubeStub().videoId) {
            return youtubeStub();
        }
        return null;
    }),
    fetchAllVideoIds: jest.fn().mockReturnValue(videoIdsStub()),
});
