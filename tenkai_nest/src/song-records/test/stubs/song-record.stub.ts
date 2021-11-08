import { SongRecord, SongRecordType } from 'src/song-records/schemas/song-record.schema';
import { EmbedSong } from 'src/songs/schemas/song.schema';
import { songStub } from 'src/songs/test/stubs/song.stub';
import { videoStub } from 'src/videos/test/stub/video.stub';

export const songRecordStub = (): SongRecord => ({
    song: new EmbedSong(songStub()),
    songStart: 0,
    songEnd: 1,
    songIndex: 0,
    videoId: videoStub().videoId,
    publishedAt: videoStub().publishedAt,
    isScuffed: false,
    featuring: 'rick ashley',
    identifier: SongRecordType.COVER,
});
