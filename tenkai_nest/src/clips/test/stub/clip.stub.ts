import { youtubeClipStub } from 'src/base/test/stub/youtube.stub';
import { Clip } from 'src/clips/schemas/clip.schema';
import { EmbedVideo } from 'src/videos/schemas/video.schema';
import { videoStub } from 'src/videos/test/stub/video.stub';
import { clipLangStub } from './clip-lang.stub';

class ClipStub extends Clip {
    save: () => void;
}

export const clipStub = (): ClipStub => ({
    videoId: youtubeClipStub().videoId,
    srcVideos: [new EmbedVideo(videoStub())],
    title: 'test-clip-title',
    description: 'test-clip-desc',
    thumbnail: 'test-thumbnail',
    duration: 1000,
    publishedAt: new Date(0),
    tags: [],
    uploader: 'test-uploader',
    relatedClips: [],
    langs: [clipLangStub().code],
    save: () => {},
});
