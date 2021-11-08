import { BadRequestException, Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { YoutubeService, YoutubeVideo } from 'src/base/youtube.service';
import { EmbedSong, Song } from 'src/songs/schemas/song.schema';
import { SongsService } from 'src/songs/songs.service';
import { VideosService } from 'src/videos/videos.service';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
import { FindSongRecordsInputDto } from './dto/find-song-records.input.dto';
import { FindSongRecordsResponseDto } from './dto/find-song-records.response.dto';
import { UpdateSongRecordInputDto } from './dto/update-song-record.input.dto';
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

    private async inputFieldValidation(inputFields: CreateSongRecordInputDto | UpdateSongRecordInputDto): Promise<{
        video: YoutubeVideo;
        song: Song;
    }> {
        const { videoId, proxyVideoId, songId, songStart, songEnd } = inputFields;
        if (!isUndefined(songStart) && !isUndefined(songEnd) && songStart >= songEnd) {
            throw new BadRequestException('Invalid song range');
        }
        let video = null;
        let song = null;

        if (videoId) {
            //* Validate videoId and proxyVideoId
            video = await this.videosService.findVideoByVideoId(videoId);
            if (video) {
                if (video.isPrivate) {
                    if (proxyVideoId) {
                        const proxyVideo = await this.youtubeService.fetchVideo(proxyVideoId);
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
        }

        if (songId) {
            //* Validate Song
            song = await this.songsService.findSongBySongId(songId);
            if (!song) {
                throw new BadRequestException(`Song: ${songId} does not exist`);
            }
        }

        return { video, song };
    }

    async createSongRecords(createSongRecordInputDto: CreateSongRecordInputDto): Promise<SongRecord> {
        const { videoId, proxyVideoId, songStart, songEnd, songIndex, featuring, identifier, isScuffed } =
            createSongRecordInputDto;

        const { video, song } = await this.inputFieldValidation(createSongRecordInputDto);

        const videoParams: Partial<SongRecord> = {
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
                $or: [
                    {
                        'song.songNameEN': textRegExp,
                    },
                    {
                        'song.songNameJP': textRegExp,
                    },
                    {
                        'song.artists.artistNameEN': textRegExp,
                    },
                    {
                        'song.artists.artistNameJP': textRegExp,
                    },
                    {
                        identifier: textRegExp,
                    },
                    {
                        featuring: textRegExp,
                    },
                ],
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

    async updateSongRecord(id: string, updateSongRecordInputDto: UpdateSongRecordInputDto): Promise<SongRecord> {
        const { videoId, proxyVideoId, songStart, songEnd, songIndex, featuring, identifier, isScuffed } =
            updateSongRecordInputDto;

        if ((!isUndefined(songStart) && isUndefined(songEnd)) || (!isUndefined(songEnd) && isUndefined(songStart))) {
            const currentSongRecord = await this.songRecordsRepository.findById(id);
            if (
                (!isUndefined(songStart) && isUndefined(songEnd) && songStart >= currentSongRecord.songEnd) ||
                (!isUndefined(songEnd) && isUndefined(songStart) && songEnd <= currentSongRecord.songStart)
            ) {
                throw new BadRequestException('Invalid song range');
            }
        }

        const { video, song } = await this.inputFieldValidation(updateSongRecordInputDto);

        const videoParams: Partial<SongRecord> = {
            ...(video && {
                videoId,
                publishedAt: video.publishedAt,
            }),
            ...(!isUndefined(proxyVideoId) && { proxyVideoId }),
            ...(song && { song: new EmbedSong(song) }),
            ...(!isUndefined(songStart) && { songStart }),
            ...(!isUndefined(songEnd) && { songEnd }),
            ...(!isUndefined(songIndex) && { songIndex }),
            ...(!isUndefined(featuring) && { featuring }),
            ...(!isUndefined(identifier) && { identifier }),
            ...(!isUndefined(isScuffed) && { isScuffed }),
        };

        return this.songRecordsRepository.update(id, videoParams);
    }

    async deleteSongRecord(id: string): Promise<SongRecord> {
        return this.songRecordsRepository.delete(id);
    }
}
