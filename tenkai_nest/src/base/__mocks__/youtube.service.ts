import { videoIdsStub, youtubeClipStub, youtubeStub } from '../test/stub/youtube.stub';

export const YoutubeService = jest.fn().mockReturnValue({
    fetchVideo: jest.fn().mockImplementation((videoId: string) => {
        if (videoId === youtubeStub().videoId) {
            return youtubeStub();
        } else if (videoId === youtubeClipStub().videoId) {
            return youtubeClipStub();
        }
        return null;
    }),
    fetchAllVideoIds: jest.fn().mockReturnValue(videoIdsStub()),
});
