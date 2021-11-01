import { Video, VideoSource } from 'src/videos/schemas/video.schema';

export interface StubVideo extends Video {
    id: { toString: () => string };
    save: () => void;
}

export const videoStub = (): StubVideo => ({
    id: { toString: () => 'test-id' },
    videoId: 'test-video-id',
    title: 'test-title',
    description: 'test-desc',
    thumbnail: 'test thumbnail',
    duration: 1000,
    publishedAt: new Date(0),
    tags: [],
    uploader: 'buffy',
    timestamps: [],
    relatedTweets: [],
    relatedVideos: [],
    source: VideoSource.YOUTUBE_MANUAL,
    mirror: '',
    save: () => {},
});