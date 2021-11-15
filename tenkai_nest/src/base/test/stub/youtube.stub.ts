import { YoutubeVideo } from 'src/base/youtube.service';

export const youtubeStub = (): YoutubeVideo => ({
    videoId: 'test-video-id',
    title: 'test-title',
    thumbnail: 'test-thumbnail',
    uploader: 'test-uploader',
    duration: 1000,
    publishedAt: new Date(0),
    channelId: 'test-channel-id',
});

export const youtubeClipStub = (): YoutubeVideo => ({
    videoId: 'test-video-clip-id',
    title: 'test-title-clip',
    thumbnail: 'test-thumbnail-clip',
    uploader: 'test-uploader-clip',
    duration: 2000,
    publishedAt: new Date(1),
    channelId: 'test-clip-channel-id',
});

export const videoIdsStub = (): string[] => [youtubeStub().videoId, youtubeStub().videoId, youtubeStub().videoId];
