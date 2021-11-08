import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { youtubeStub } from 'src/base/test/stub/youtube.stub';
import { YoutubeService } from 'src/base/youtube.service';
import { SongsService } from 'src/songs/songs.service';
import { songStub } from 'src/songs/test/stubs/song.stub';
import { videoStub } from 'src/videos/test/stub/video.stub';
import { VideosService } from 'src/videos/videos.service';
import { FindSongRecordsResponseDto } from '../dto/find-song-records.response.dto';
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
    const id = 'test-id';

    let songRecord: SongRecord;
    let songRecords: FindSongRecordsResponseDto;
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
        songRecords = undefined;
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
    describe('findSongRecords', () => {
        describe('empty filter', () => {
            beforeEach(async () => {
                songRecords = await songRecordsService.findSongRecords({});
            });
            it('should call SongRecordsRepository', () => {
                expect(songRecordsRepository.find).toBeCalledWith({
                    sort: { publishedAt: -1, songIndex: 1 },
                });
            });
            it('should return with songRecords', () => {
                expect(songRecords).toEqual({
                    docs: [songRecordStub()],
                    totalCount: 1,
                });
            });
        });
        describe('with filter', () => {
            beforeEach(async () => {
                songRecords = await songRecordsService.findSongRecords({
                    textSearch: 'text',
                    isScuffed: false,
                    limit: 10,
                    skip: 0,
                    dateSort: 1,
                });
            });
            it('should call SongRecordsRepository', () => {
                const testRegExp = new RegExp('text', 'i');
                expect(songRecordsRepository.find).toBeCalledWith({
                    $or: [
                        {
                            'song.songNameEN': testRegExp,
                        },
                        {
                            'song.songNameJP': testRegExp,
                        },
                        {
                            'song.artists.artistNameEN': testRegExp,
                        },
                        {
                            'song.artists.artistNameJP': testRegExp,
                        },
                        {
                            identifier: testRegExp,
                        },
                        {
                            featuring: testRegExp,
                        },
                    ],
                    isScuffed: false,
                    limit: 10,
                    skip: 0,
                    sort: { publishedAt: 1, songIndex: 1 },
                });
            });
            it('should return with songRecords', () => {
                expect(songRecords).toEqual({
                    docs: [songRecordStub()],
                    totalCount: 1,
                });
            });
        });
    });
    describe('updateSongRecord', () => {
        describe('blank update field', () => {
            beforeEach(async () => {
                songRecord = await songRecordsService.updateSongRecord(id, {});
            });
            it('should call SongsRepository', () => {
                expect(songRecordsRepository.update).toBeCalledWith(id, {});
            });
            it('should return with a song record', () => {
                expect(songRecord).toEqual(songRecordStub());
            });
        });
        describe('correct update field', () => {
            beforeEach(async () => {
                songRecord = await songRecordsService.updateSongRecord(id, {
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
            it('should call SongsRepository', () => {
                expect(songRecordsRepository.update).toBeCalledWith(id, songRecordStub());
            });
            it('should return with a song record', () => {
                expect(songRecord).toEqual(songRecordStub());
            });
        });
        describe('invalid song range', () => {
            describe('both start-end are provided', () => {
                beforeEach(async () => {
                    try {
                        await songRecordsService.updateSongRecord(id, {
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
            describe('only start are provided', () => {
                beforeEach(async () => {
                    try {
                        await songRecordsService.updateSongRecord(id, {
                            songId: songStub().songId,
                            songStart: 999999,
                            ...pick(songRecordStub(), ['videoId', 'songIndex', 'isScuffed', 'featuring', 'identifier']),
                        });
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call SongRecordsRepository', () => {
                    expect(songRecordsRepository.findById).toBeCalledWith(id);
                });
                it('should throw BadRequestException', () => {
                    expect(error).toBeInstanceOf(BadRequestException);
                });
            });
            describe('only end are provided', () => {
                beforeEach(async () => {
                    try {
                        await songRecordsService.updateSongRecord(id, {
                            songId: songStub().songId,
                            songEnd: -1,
                            ...pick(songRecordStub(), ['videoId', 'songIndex', 'isScuffed', 'featuring', 'identifier']),
                        });
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call SongRecordsRepository', () => {
                    expect(songRecordsRepository.findById).toBeCalledWith(id);
                });
                it('should throw BadRequestException', () => {
                    expect(error).toBeInstanceOf(BadRequestException);
                });
            });
        });
        describe('invalid video', () => {
            beforeEach(async () => {
                try {
                    await songRecordsService.updateSongRecord(id, {
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
                    songRecord = await songRecordsService.updateSongRecord(id, {
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
                    songRecord = await songRecordsService.updateSongRecord(id, {
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
                    await songRecordsService.updateSongRecord(id, {
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

    describe('deleteSongRecord', () => {
        describe('when call', () => {
            beforeEach(async () => {
                songRecord = await songRecordsService.deleteSongRecord(id);
            });
            it('should call SongsRecordRepository', () => {
                expect(songRecordsRepository.delete).toBeCalledWith(id);
            });
            it('should return a song record', () => {
                expect(songRecord).toEqual(songRecordStub());
            });
        });
    });
});
