import { BadRequestException, Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedSong } from 'src/songs/schemas/song.schema';
import { SongsService } from 'src/songs/songs.service';
import { VideosService } from 'src/videos/videos.service';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
import { FindSongRecordsInputDto } from './dto/find-song-records.input.dto';
import { FindSongRecordsResponseDto } from './dto/find-song-records.response.dto';
import { SongRecord } from './schemas/song-record.schema';
import { SongRecordsRepository } from './song-records.repository';

@Injectable()
export class SongRecordsService {
    constructor(
        private readonly songRecordsRepository: SongRecordsRepository,
        private readonly songsService: SongsService,
        private readonly videosService: VideosService,
        private readonly youtubeService: YoutubeService,
    ) {}

    async createSongRecords(createSongRecordInputDto: CreateSongRecordInputDto): Promise<SongRecord> {
        const { videoId, proxyVideoId, songId, songStart, songEnd, songIndex, featuring, identifier, isScuffed } =
            createSongRecordInputDto;

        if (songStart > songEnd) {
            throw new BadRequestException('Invalid song range');
        }

        let videoParams: Partial<SongRecord> = {};

        let proxyVideo;

        //* Validate videoId and proxyVideoId
        const video = await this.videosService.findVideoByVideoId(videoId);
        if (video) {
            if (video.isPrivate) {
                if (proxyVideoId) {
                    proxyVideo = await this.youtubeService.fetchVideo(proxyVideoId);
                    if (!proxyVideo) {
                        throw new BadRequestException(`Proxy Youtube Video: ${proxyVideo} not found`);
                    }
                } else {
                    throw new BadRequestException(`Video: ${videoId} is private, please provide proxyVideoId `);
                }
            }
        } else {
            throw new BadRequestException(`Video: ${videoId} not found in our system.`);
        }

        //* Validate Song
        const song = await this.songsService.findSongBySongId(songId);
        if (!song) {
            throw new BadRequestException(`Song: ${songId} does not exist`);
        } else {
            videoParams.song = new EmbedSong(song);
        }

        videoParams = {
            videoId,
            ...(isUndefined(proxyVideoId) && { proxyVideoId }),
            publishedAt: video.publishedAt,
            song: new EmbedSong(song),
            songStart: isUndefined(songStart) ? 0 : songStart,
            songEnd: isUndefined(songEnd) ? songStart + song.duration : songEnd,
            songIndex: isUndefined(songIndex) ? 0 : songIndex,
            ...(featuring && { featuring }),
            ...(identifier && { identifier }),
            isScuffed: isUndefined(isScuffed) ? false : isScuffed,
        };

        const songRecord = await this.songRecordsRepository.create(videoParams);
        return songRecord;
    }

    async findSongRecords(findSongRecordsInputDto: FindSongRecordsInputDto): Promise<FindSongRecordsResponseDto> {
        const { isScuffed, textSearch, dateSort, limit, skip } = findSongRecordsInputDto;

        let textSearchParams;
        if (!isUndefined(textSearch)) {
            const textRegExp = new RegExp(textSearch, 'i');
            textSearchParams = {
                'song.songNameEN': textRegExp,
                'song.songNameJP': textRegExp,
                'song.artists.artistNameEN': textRegExp,
                'song.artists.artistNameJP': textRegExp,
                identifier: textRegExp,
                featuring: textRegExp,
            };
        }

        return this.songRecordsRepository.find({
            ...(!isUndefined(textSearchParams) && textSearchParams),
            ...(!isUndefined(isScuffed) && { isScuffed }),
            limit,
            skip,
            sort: { publishedAt: !isUndefined(dateSort) ? dateSort : -1, songIndex: 1 },
        });
    }
}
