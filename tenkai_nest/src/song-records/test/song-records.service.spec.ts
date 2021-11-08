import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { youtubeStub } from 'src/base/test/stub/youtube.stub';
import { YoutubeService } from 'src/base/youtube.service';
import { SongsService } from 'src/songs/songs.service';
import { songStub } from 'src/songs/test/stubs/song.stub';
import { videoStub } from 'src/videos/test/stub/video.stub';
import { VideosService } from 'src/videos/videos.service';
import { SongRecord } from '../schemas/song-record.schema';
import { SongRecordsRepository } from '../song-records.repository';
import { SongRecordsService } from '../song-records.service';
import { songRecordStub } from './stubs/song-record.stub';

jest.mock('../song-records.repository');
jest.mock('src/songs/songs.service');
jest.mock('src/videos/videos.service');
jest.mock('src/base/youtube.service');

describe('SongRecordsService', () => {
    let songRecordsService: SongRecordsService;
    let songRecordsRepository: SongRecordsRepository;
    let songsService: SongsService;
    let videosService: VideosService;
    let youtubeService: YoutubeService;

    const randomId = 'random-id';
    const randomNumberId = 777;

    let songRecord: SongRecord;
    let spy: jest.SpyInstance;
    let error: Error;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SongRecordsService, SongRecordsRepository, SongsService, VideosService, YoutubeService],
        }).compile();

        songRecordsService = module.get<SongRecordsService>(SongRecordsService);
        songRecordsRepository = module.get<SongRecordsRepository>(SongRecordsRepository);
        songsService = module.get<SongsService>(SongsService);
        videosService = module.get<VideosService>(VideosService);
        youtubeService = module.get<YoutubeService>(YoutubeService);
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (spy) {
            spy.mockClear();
        }
        songRecord = undefined;
        error = undefined;
    });

    describe('createSongRecords', () => {
        describe('correct parameters wo/ proxy', () => {
            beforeEach(async () => {
                songRecord = await songRecordsService.createSongRecords({
                    songId: songStub().songId,
                    ...pick(songRecordStub(), [
                        'videoId',
                        'songStart',
                        'songEnd',
                        'songIndex',
                        'isScuffed',
                        'featuring',
                        'identifier',
                    ]),
                });
            });

            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(songRecordStub().videoId);
            });

            it('should call SongsService', () => {
                expect(songsService.findSongBySongId).toBeCalledWith(songStub().songId);
            });

            it('should call SongRecordsRepository', () => {
                expect(songRecordsRepository.create).toBeCalledWith(songRecordStub());
            });

            it('should return with a song record', () => {
                expect(songRecord).toEqual(songRecordStub());
            });
        });
        describe('correct parameters w/ proxy', () => {
            beforeEach(async () => {
                spy = jest
                    .spyOn(videosService, 'findVideoByVideoId')
                    .mockReturnValueOnce({ ...videoStub(), isPrivate: true } as any);
                songRecord = await songRecordsService.createSongRecords({
                    songId: songStub().songId,
                    proxyVideoId: youtubeStub().videoId,
                    ...pick(songRecordStub(), [
                        'videoId',
                        'songStart',
                        'songEnd',
                        'songIndex',
                        'isScuffed',
                        'featuring',
                        'identifier',
                    ]),
                });
            });

            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(songRecordStub().videoId);
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(youtubeStub().videoId);
            });

            it('should call SongsService', () => {
                expect(songsService.findSongBySongId).toBeCalledWith(songStub().songId);
            });

            it('should call SongRecordsRepository', () => {
                expect(songRecordsRepository.create).toBeCalledWith(songRecordStub());
            });

            it('should return with a song record', () => {
                expect(songRecord).toEqual(songRecordStub());
            });
        });
        describe('invalid song range', () => {
            beforeEach(async () => {
                try {
                    await songRecordsService.createSongRecords({
                        songId: songStub().songId,
                        songStart: 2,
                        songEnd: 1,
                        ...pick(songRecordStub(), ['videoId', 'songIndex', 'isScuffed', 'featuring', 'identifier']),
                    });
                } catch (e) {
                    error = e;
                }
            });
            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
        describe('invalid video', () => {
            beforeEach(async () => {
                try {
                    await songRecordsService.createSongRecords({
                        songId: songStub().songId,
                        videoId: randomId,
                        ...pick(songRecordStub(), [
                            'songStart',
                            'songEnd',
                            'songIndex',
                            'isScuffed',
                            'featuring',
                            'identifier',
                        ]),
                    });
                } catch (e) {
                    error = e;
                }
            });

            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(randomId);
            });

            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
        describe('private video but proxyVideoId is not provide', () => {
            beforeEach(async () => {
                try {
                    spy = jest
                        .spyOn(videosService, 'findVideoByVideoId')
                        .mockReturnValueOnce({ ...videoStub(), isPrivate: true } as any);
                    songRecord = await songRecordsService.createSongRecords({
                        songId: songStub().songId,
                        ...pick(songRecordStub(), [
                            'videoId',
                            'songStart',
                            'songEnd',
                            'songIndex',
                            'isScuffed',
                            'featuring',
                            'identifier',
                        ]),
                    });
                } catch (e) {
                    error = e;
                }
            });

            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
            });

            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
        describe('private video but non-existing proxyVideoId is provide', () => {
            beforeEach(async () => {
                try {
                    spy = jest
                        .spyOn(videosService, 'findVideoByVideoId')
                        .mockReturnValueOnce({ ...videoStub(), isPrivate: true } as any);
                    songRecord = await songRecordsService.createSongRecords({
                        songId: songStub().songId,
                        proxyVideoId: randomId,
                        ...pick(songRecordStub(), [
                            'videoId',
                            'songStart',
                            'songEnd',
                            'songIndex',
                            'isScuffed',
                            'featuring',
                            'identifier',
                        ]),
                    });
                } catch (e) {
                    error = e;
                }
            });

            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
            });

            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(randomId);
            });

            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
        describe('invalid song', () => {
            beforeEach(async () => {
                try {
                    await songRecordsService.createSongRecords({
                        songId: randomNumberId,
                        ...pick(songRecordStub(), [
                            'videoId',
                            'songStart',
                            'songEnd',
                            'songIndex',
                            'isScuffed',
                            'featuring',
                            'identifier',
                        ]),
                    });
                } catch (e) {
                    error = e;
                }
            });
            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(songRecordStub().videoId);
            });
            it('should call SongsService', () => {
                expect(songsService.findSongBySongId).toBeCalledWith(randomNumberId);
            });
            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
    });
});
