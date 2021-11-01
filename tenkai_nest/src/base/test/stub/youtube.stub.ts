import { YoutubeVideo } from 'src/base/youtube.service';

export const youtubeStub = (): YoutubeVideo => ({
    videoId: 'test-video-id',
    title: 'test-title',
    thumbnail: 'test-thumbnail',
    uploader: 'test-uploader',
    duration: 1000,
    publishedAt: new Date(0),
});

export const videoIdsStub = (): string[] => [youtubeStub().videoId, youtubeStub().videoId, youtubeStub().videoId];
