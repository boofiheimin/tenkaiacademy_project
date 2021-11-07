import { BadRequestException, Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedSong } from 'src/songs/schemas/song.schema';
import { SongsService } from 'src/songs/songs.service';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
import { SongRecord } from './schemas/song-record.schema';
import { SongRecordsRepository } from './song-records.repository';

@Injectable()
export class SongRecordsService {
    constructor(
        private readonly songRecordsRepository: SongRecordsRepository,
        private readonly songsService: SongsService,
        private readonly youtubeService: YoutubeService,
    ) {}

    async createSongRecords(createSongRecordInputDto: CreateSongRecordInputDto): Promise<SongRecord> {
        const { videoId, proxyVideoId, songId, songStart, songEnd, songIndex, featuring, identifier } =
            createSongRecordInputDto;

        if (songStart > songEnd) {
            throw new BadRequestException('Invalid song range');
        }

        const videoParams: Partial<SongRecord> = {
            songStart,
            songEnd,
            songIndex,
            ...(featuring && { featuring }),
            ...(identifier && { identifier }),
        };

        //* Validate videoId and proxyVideoId
        const youtubeVideo = await this.youtubeService.fetchVideo(videoId);
        if (!youtubeVideo) {
            if (proxyVideoId) {
                const proxyVideo = await this.youtubeService.fetchVideo(proxyVideoId);
                if (!proxyVideo) {
                    throw new BadRequestException(`Proxy Youtube Video: ${proxyVideo} not found`);
                } else {
                    videoParams.proxyVideoId = proxyVideoId;
                }
            } else {
                throw new BadRequestException(`Youtube Video: ${videoId} not found please provide proxy video id`);
            }
        }

        videoParams.videoId = videoId;

        const song = await this.songsService.findSongBySongId(songId);
        if (!song) {
            throw new BadRequestException(`Song: ${songId} does not exist`);
        } else {
            videoParams.song = new EmbedSong(song);
        }

        const songRecord = await this.songRecordsRepository.create(videoParams);
        return songRecord;
    }
}
