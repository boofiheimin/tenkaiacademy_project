import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { youtubeClipStub, youtubeStub } from 'src/base/test/stub/youtube.stub';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedTag } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { tagStub } from 'src/tags/test/stubs/tag.stub';
import { EmbedVideo } from 'src/videos/schemas/video.schema';
import { videoStub } from 'src/videos/test/stub/video.stub';
import { VideosService } from 'src/videos/videos.service';
import { ClipsRepository } from '../clips.repository';
import { ClipsService } from '../clips.service';
import { FindClipsInputDto } from '../dto/find-clips.input.dto';
import { ClipLang, EmbedClip } from '../schemas/clip.schema';
import { clipStub } from './stub/clip.stub';

jest.mock('../clips.repository');
jest.mock('src/videos/videos.service');
jest.mock('src/base/youtube.service');
jest.mock('src/tags/tags.service');

const omitStubFn = (clip) => omit(clip, ['save']);

describe('ClipsService', () => {
    let clipsService: ClipsService;
    let youtubeService: YoutubeService;
    let videosService: VideosService;
    let clipsRepository: ClipsRepository;

    const testId = 'test-id';
    const randomVId = 'randomVId';

    let clip;
    let clips;
    let spy;
    let error;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClipsService, ClipsRepository, VideosService, YoutubeService, TagsService],
        }).compile();

        clipsService = module.get<ClipsService>(ClipsService);
        youtubeService = module.get<YoutubeService>(YoutubeService);
        videosService = module.get<VideosService>(VideosService);
        clipsRepository = module.get<ClipsRepository>(ClipsRepository);
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (spy) {
            spy.mockClear();
        }
    });

    describe('createClip', () => {
        describe('existing srcVideos', () => {
            beforeEach(async () => {
                spy = jest.spyOn(videosService, 'findVideoByVideoId').mockReturnValueOnce({
                    ...videoStub(),
                    tags: [new EmbedTag(tagStub())],
                } as any);
                clip = await clipsService.createClip({
                    videoId: clipStub().videoId,
                    srcVideoIds: [videoStub().videoId],
                    langs: [ClipLang.EN],
                });
            });

            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(clipStub().videoId);
            });
            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.find).toBeCalledWith({ 'relatedClips.videoId': clipStub().videoId });
                expect(clipsRepository.create).toBeCalledWith({
                    ...youtubeClipStub(),
                    srcVideos: [new EmbedVideo(videoStub())],
                    langs: [ClipLang.EN],
                    tags: [new EmbedTag(tagStub())],
                });
            });
            it('should return with a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
        describe('non-existing srcVideos', () => {
            describe('srcVideo exist in youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosService, 'findVideoByVideoId').mockReturnValueOnce(null);
                    clip = await clipsService.createClip({
                        videoId: clipStub().videoId,
                        srcVideoIds: [videoStub().videoId],
                        langs: [ClipLang.EN],
                    });
                });

                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toHaveBeenNthCalledWith(1, videoStub().videoId);
                    expect(youtubeService.fetchVideo).toHaveBeenNthCalledWith(2, clipStub().videoId);
                });
                it('should call VideosService', () => {
                    expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
                });
                it('should call ClipsRepository', () => {
                    expect(clipsRepository.create).toBeCalledWith({
                        ...youtubeClipStub(),
                        srcVideos: [new EmbedVideo(youtubeStub())],
                        langs: [ClipLang.EN],
                        tags: [],
                    });
                });
                it('should return with a clip', () => {
                    expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
                });
            });
            describe('srcVideo does not exist in youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosService, 'findVideoByVideoId').mockReturnValueOnce(null);
                    try {
                        clip = await clipsService.createClip({
                            videoId: clipStub().videoId,
                            srcVideoIds: ['fake'],
                            langs: [ClipLang.EN],
                        });
                    } catch (e) {
                        error = e;
                    }
                });

                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith('fake');
                });
                it('should throw BadRequestException', () => {
                    expect(error).toBeInstanceOf(BadRequestException);
                });
            });
        });
        describe('non-existing videoId', () => {
            beforeEach(async () => {
                try {
                    clip = await clipsService.createClip({
                        videoId: randomVId,
                        srcVideoIds: [videoStub().videoId],
                        langs: [ClipLang.EN],
                    });
                } catch (e) {
                    error = e;
                }
            });

            it('should call ClipsService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(randomVId);
            });

            it('should throw BadRequestException', () => {
                expect(error).toBeInstanceOf(BadRequestException);
            });
        });
    });

    describe('findClips', () => {
        describe('empty filter', () => {
            beforeEach(async () => {
                clips = await clipsService.findClips({});
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.find).toBeCalledWith({
                    sort: {
                        publishedAt: -1,
                    },
                });
            });
            it('should return with clips', () => {
                expect({
                    docs: clips.docs.map((clip) => omitStubFn(clip)),
                    totalCount: clips.totalCount,
                }).toEqual({
                    docs: [omitStubFn(clipStub())],
                    totalCount: 1,
                });
            });
        });
        describe('with filter', () => {
            const filter: FindClipsInputDto = {
                title: 'test',
                from: new Date(0),
                to: new Date(1),
                uploader: 'test-u',
                tags: [1, 2],
                limit: 10,
                skip: 1,
                sortOrder: true,
            };
            beforeEach(async () => {
                clips = await clipsService.findClips(filter);
            });
            it('should call VideosRepository', () => {
                expect(clipsRepository.find).toBeCalledWith({
                    title: new RegExp(filter.title, 'i'),
                    uploader: new RegExp(filter.uploader, 'i'),
                    publishedAt: {
                        $gte: filter.from,
                        $lte: filter.to,
                    },
                    $and: filter.tags.map((tag) => ({ 'tags.tagId': tag })),
                    limit: filter.limit,
                    skip: filter.skip,
                    sort: {
                        publishedAt: 1,
                    },
                });
            });
            it('should return with videos', () => {
                expect({
                    docs: clips.docs.map((clip) => omitStubFn(clip)),
                    totalCount: clips.totalCount,
                }).toEqual({
                    docs: [omitStubFn(clipStub())],
                    totalCount: 1,
                });
            });
        });
    });

    describe('findClipById', () => {
        describe('when call', () => {
            beforeEach(async () => {
                clip = await clipsService.findClipById(testId);
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.findById).toBeCalledWith(testId);
            });
            it('should return a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
    });

    describe('updateClip', () => {
        describe('no srcVideoIds, no relatedClipIds, no tagIds', () => {
            beforeEach(async () => {
                clip = await clipsService.updateClip(testId, {});
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.update).toBeCalledWith(testId, {});
            });
            it('should return a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
        describe('w/ existing - srcVideoIds', () => {
            beforeEach(async () => {
                clip = await clipsService.updateClip(testId, { srcVideoIds: [videoStub().videoId] });
            });
            it('should call VideosService', () => {
                expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.update).toBeCalledWith(testId, {
                    srcVideos: [new EmbedVideo(videoStub())],
                    tags: [],
                });
            });
            it('should return a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
        describe('w/ non-existing-srcVideoIds', () => {
            describe('srcVideo exist on youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosService, 'findVideoByVideoId').mockReturnValueOnce(null);
                    clip = await clipsService.updateClip(testId, { srcVideoIds: [videoStub().videoId] });
                });

                it('should call VideosService', () => {
                    expect(videosService.findVideoByVideoId).toBeCalledWith(videoStub().videoId);
                });
                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
                });
                it('should call ClipsRepository', () => {
                    expect(clipsRepository.update).toBeCalledWith(testId, {
                        srcVideos: [new EmbedVideo(youtubeStub())],
                        tags: [],
                    });
                });
                it('should return a clip', () => {
                    expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
                });
            });
            describe('source video does not exist on youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosService, 'findVideoByVideoId').mockReturnValueOnce(null);
                    try {
                        clip = await clipsService.updateClip(testId, { srcVideoIds: [randomVId] });
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call VideoService', () => {
                    expect(videosService.findVideoByVideoId).toBeCalledWith(randomVId);
                });
                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith(randomVId);
                });
                it('should throw BadRequestError', () => {
                    expect(error).toBeInstanceOf(BadRequestException);
                });
            });
        });

        describe('w/ existing-relatedClipIds', () => {
            beforeEach(async () => {
                clip = await clipsService.updateClip(testId, { relatedClipIds: [clipStub().videoId] });
            });

            it('should call ClipsRepository', () => {
                expect(clipsRepository.findByVideoId).toBeCalledWith(clipStub().videoId);
                expect(clipsRepository.update).toBeCalledWith(testId, {
                    relatedClips: [new EmbedClip(clipStub())],
                });
            });
            it('should return a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
        describe('w/ non-existing-relatedClipIds', () => {
            describe('relatedClip exist on youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(clipsRepository, 'findByVideoId').mockReturnValueOnce(null);
                    clip = await clipsService.updateClip(testId, { relatedClipIds: [clipStub().videoId] });
                });
                it('should call ClipRepository', () => {
                    expect(clipsRepository.findByVideoId).toBeCalledWith(clipStub().videoId);
                    expect(clipsRepository.update).toBeCalledWith(testId, {
                        relatedClips: [new EmbedClip(youtubeClipStub())],
                    });
                });
                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith(clipStub().videoId);
                });
                it('should return a clip', () => {
                    expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
                });
            });
            describe('relatedClip does not exist on youtube', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(clipsRepository, 'findByVideoId').mockReturnValueOnce(null);
                    try {
                        await clipsService.updateClip(testId, { relatedClipIds: [randomVId] });
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call ClipRepository', () => {
                    expect(clipsRepository.findByVideoId).toBeCalledWith(randomVId);
                });
                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith(randomVId);
                });
                it('should return a clip', () => {
                    expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
                });
            });
        });
        describe('w/ tagIds', () => {
            beforeEach(async () => {
                clip = await clipsService.updateClip(testId, { tagIds: [tagStub().tagId] });
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.update).toBeCalledWith(testId, {
                    tags: [new EmbedTag(tagStub())],
                });
            });
            it('should return a clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
    });

    describe('deleteClip', () => {
        describe('when call', () => {
            beforeEach(async () => {
                clip = await clipsService.deleteClip(testId);
            });

            it('should call ClipsRepository', () => {
                expect(clipsRepository.delete).toBeCalledWith(testId);
            });
            it('should return clip', () => {
                expect(omitStubFn(clip)).toEqual(omitStubFn(clipStub()));
            });
        });
    });

    describe('tagCascadeUpdate', () => {
        describe('when call', () => {
            beforeEach(async () => {
                await clipsService.tagCascadeUpdate(tagStub());
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.tagCascadeUpdate).toBeCalledWith(tagStub());
            });
        });
    });

    describe('tagCascadeDelete', () => {
        describe('when call', () => {
            beforeEach(async () => {
                await clipsService.tagCascadeDelete(tagStub());
            });
            it('should call ClipsRepository', () => {
                expect(clipsRepository.tagCascadeDelete).toBeCalledWith(tagStub());
            });
        });
    });
});
