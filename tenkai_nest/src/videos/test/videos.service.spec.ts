import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { videoIdsStub, youtubeStub } from 'src/base/test/stub/youtube.stub';
import { YoutubeService } from 'src/base/youtube.service';
import { ClipsService } from 'src/clips/clips.service';
import { EmbedTag } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { tagStub } from 'src/tags/test/stubs/tag.stub';
import { FindVideosInputDto } from '../dto/find-videos.input.dto';
import { EmbedVideo, VideoSource } from '../schemas/video.schema';
import { VideosRepository } from '../videos.repository';
import { VideosService } from '../videos.service';
import { videoStub } from './stub/video.stub';

jest.mock('../videos.repository');
jest.mock('src/base/youtube.service');
jest.mock('src/tags/tags.service');
jest.mock('src/clips/clips.service');

const omitStubFn = (video) => omit(video, ['id', 'save']);

describe('VideosService', () => {
    let videosService: VideosService;
    let videosRepository: VideosRepository;
    let youtubeService: YoutubeService;
    let tagsService: TagsService;
    let clipsService: ClipsService;

    let video;
    const randomVId = 'random';
    let error;
    let videos;
    let spy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VideosService, VideosRepository, YoutubeService, TagsService, ClipsService],
        }).compile();

        videosService = module.get<VideosService>(VideosService);
        videosRepository = module.get<VideosRepository>(VideosRepository);
        youtubeService = module.get<YoutubeService>(YoutubeService);
        tagsService = module.get<TagsService>(TagsService);
        clipsService = module.get<ClipsService>(ClipsService);
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (spy) {
            spy.mockClear();
        }
    });

    describe('createVideo', () => {
        describe('youtube video exist', () => {
            beforeEach(async () => {
                video = await videosService.createVideo({ videoId: videoStub().videoId });
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.find).toBeCalledWith({ 'relatedVideos.videoId': videoStub().videoId });
                expect(videosRepository.create).toBeCalledWith({
                    ...youtubeStub(),
                    source: VideoSource.YOUTUBE_MANUAL,
                    isPrivate: false,
                });
            });
            it('should call ClipsRepository', () => {
                expect(clipsService.findClips).toBeCalledWith({ 'srcVideos.videoId': videoStub().videoId });
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });

        describe('youtube video does not exist', () => {
            beforeEach(async () => {
                video = await videosService.createVideo({ videoId: randomVId });
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(randomVId);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.create).toBeCalledWith({
                    videoId: randomVId,
                    title: '',
                    source: VideoSource.MANUAL,
                    isPrivate: true,
                });
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
    });

    describe('findVideos', () => {
        describe('empty filter', () => {
            beforeEach(async () => {
                videos = await videosService.findVideos({});
            });
            it('should call VideoRepository', () => {
                expect(videosRepository.find).toBeCalledWith({
                    sort: {
                        publishedAt: -1,
                    },
                });
            });
            it('should return with videos', () => {
                expect({
                    docs: videos.docs.map((video) => omitStubFn(video)),
                    totalCount: videos.totalCount,
                }).toEqual({
                    docs: [omitStubFn(videoStub())],
                    totalCount: 1,
                });
            });
        });
        describe('with filter', () => {
            const filter: FindVideosInputDto = {
                title: 'test',
                from: new Date(0),
                to: new Date(1),
                uploader: 'test-u',
                tagIds: [1, 2],
                limit: 10,
                skip: 1,
                sortOrder: true,
            };
            beforeEach(async () => {
                videos = await videosService.findVideos(filter);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.find).toBeCalledWith({
                    title: new RegExp(filter.title, 'i'),
                    uploader: new RegExp(filter.uploader, 'i'),
                    publishedAt: {
                        $gte: filter.from,
                        $lte: filter.to,
                    },
                    $and: filter.tagIds.map((tagId) => ({ 'tags.tagId': tagId })),
                    limit: filter.limit,
                    skip: filter.skip,
                    sort: {
                        publishedAt: 1,
                    },
                });
            });
            it('should return with videos', () => {
                expect({
                    docs: videos.docs.map((video) => omitStubFn(video)),
                    totalCount: videos.totalCount,
                }).toEqual({
                    docs: [omitStubFn(videoStub())],
                    totalCount: 1,
                });
            });
        });
    });

    describe('findVideoById', () => {
        describe('when call', () => {
            const id = 'id';
            beforeEach(async () => {
                video = await videosService.findVideoById(id);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.findByIdWithClip).toBeCalledWith(id);
            });
            it('should return with a video with clips field', () => {
                expect(omitStubFn(video)).toEqual({ ...omitStubFn(videoStub()), clips: [] });
            });
        });
    });

    describe('updateVideo', () => {
        const id = 'id';
        describe('no relatedVideoIds', () => {
            beforeEach(async () => {
                video = await videosService.updateVideo(id, {});
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.update).toBeCalledWith(id, {});
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
        describe('with existing relatedVideoIds', () => {
            beforeEach(async () => {
                video = await videosService.updateVideo(id, { relatedVideoIds: [videoStub().videoId] });
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.findByVideoId).toBeCalledWith(videoStub().videoId);
                expect(videosRepository.update).toBeCalledWith(id, { relatedVideos: [new EmbedVideo(videoStub())] });
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
        describe('with not existing relatedVideoIds', () => {
            describe('existing youtube video', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosRepository, 'findByVideoId').mockReturnValueOnce(null);
                    video = await videosService.updateVideo(id, { relatedVideoIds: [videoStub().videoId] });
                });
                it('should call VideosRepository', () => {
                    expect(videosRepository.findByVideoId).toBeCalledWith(videoStub().videoId);
                    expect(videosRepository.update).toBeCalledWith(id, {
                        relatedVideos: [new EmbedVideo(youtubeStub())],
                    });
                });
                it('should call YoutubeService', () => {
                    expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
                });
                it('should return with a video', () => {
                    expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
                });
            });
            describe('with non-existing youtube video', () => {
                beforeEach(async () => {
                    spy = jest.spyOn(videosRepository, 'findByVideoId').mockReturnValueOnce(null);
                    try {
                        await videosService.updateVideo(id, { relatedVideoIds: [randomVId] });
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call VideosRepository', () => {
                    expect(videosRepository.findByVideoId).toBeCalledWith(randomVId);
                });
                it('should throw BadRequestError', () => {
                    expect(error).toBeInstanceOf(BadRequestException);
                });
            });
        });
        describe('with tags', () => {
            beforeEach(async () => {
                video = await videosService.updateVideo(id, { tagIds: [tagStub().tagId] });
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.update).toBeCalledWith(id, { tags: [new EmbedTag(tagStub())] });
            });
            it('should call TagsService', () => {
                expect(tagsService.findTagByTagId).toBeCalledWith(tagStub().tagId);
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
    });

    describe('deleteVideo', () => {
        const id = 'id';
        beforeEach(async () => {
            video = await videosService.deleteVideo(id);
        });

        it('should call VideoRepository', () => {
            expect(videosRepository.delete).toBeCalledWith(id);
        });

        it('should call ClipsService', () => {
            expect(clipsService.findClips).toBeCalledWith({ 'srcVideos.videoId': videoStub().videoId });
        });

        it('should return with a video', () => {
            expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
        });
    });

    describe('refetchVideo', () => {
        describe('with valid Video', () => {
            beforeEach(async () => {
                video = await videosService.refetchVideo(videoStub().id.toString());
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.findById).toBeCalledWith(videoStub().id.toString());
                expect(videosRepository.update).toBeCalledWith(videoStub().id.toString(), youtubeStub());
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
            });
            it('should return with a video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });

        describe('with not valid Video', () => {
            beforeEach(async () => {
                spy = jest.spyOn(youtubeService, 'fetchVideo').mockReturnValueOnce(null);
                try {
                    await videosService.refetchVideo(videoStub().id.toString());
                } catch (e) {
                    error = e;
                }
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.findById).toBeCalledWith(videoStub().id.toString());
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
            });
            it('should throw NotFoundException', () => {
                expect(error).toBeInstanceOf(NotFoundException);
            });
        });
    });

    describe('refetchAll', () => {
        describe('when call', () => {
            let message;
            beforeEach(async () => {
                message = await videosService.refetchAll();
            });
            it('should call YoutubeService', async () => {
                expect(youtubeService.fetchAllVideoIds).toBeCalledTimes(1);
                videoIdsStub().forEach((videoId, index) => {
                    expect(youtubeService.fetchVideo).toHaveBeenNthCalledWith(index + 1, videoId);
                });
            });
            it('should call VideoRepository', async () => {
                videoIdsStub().forEach((videoId, index) => {
                    expect(videosRepository.findOneAndUpsert).toHaveBeenNthCalledWith(
                        index + 1,
                        {
                            videoId: videoIdsStub()[index],
                        },
                        { ...youtubeStub(), source: VideoSource.YOUTUBE },
                    );
                });
            });
            it('should return videoIds', async () => {
                expect(message).toEqual(`Successfully Add/Update: ${videoIdsStub().length} videos`);
            });
        });
    });

    describe('tagCascadeUpdate', () => {
        describe('when call', () => {
            beforeEach(async () => {
                await videosService.tagCascadeUpdate(tagStub());
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.tagCascadeUpdate).toBeCalledWith(tagStub());
            });
        });
    });

    describe('tagCascadeDelete', () => {
        describe('when call', () => {
            beforeEach(async () => {
                await videosService.tagCascadeDelete(tagStub());
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.tagCascadeDelete).toBeCalledWith(tagStub());
            });
        });
    });
});
