import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { videoIdsStub, youtubeStub } from 'src/base/test/stub/youtube.stub';
import { YoutubeService } from 'src/base/youtube.service';
import { EmbedTags } from 'src/tags/schemas/tag.schema';
import { TagsService } from 'src/tags/tags.service';
import { tagStub } from 'src/tags/test/stubs/tag.stub';
import { FindVideosInputDto } from '../dto/find-videos.input.dto';
import { RelatedVideo, VideoSource } from '../schemas/video.schema';
import { VideosRepository } from '../videos.repository';
import { VideosService } from '../videos.service';
import { videoStub } from './stub/video.stub';

jest.mock('../videos.repository');
jest.mock('src/base/youtube.service');
jest.mock('src/tags/tags.service');

const omitStubFn = (video) => omit(video, ['id', 'save']);

describe('VideosService', () => {
    let videosService: VideosService;
    let videosRepository: VideosRepository;
    let youtubeService: YoutubeService;
    let tagsService: TagsService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VideosService, VideosRepository, YoutubeService, TagsService],
        }).compile();

        videosService = module.get<VideosService>(VideosService);
        videosRepository = module.get<VideosRepository>(VideosRepository);
        youtubeService = module.get<YoutubeService>(YoutubeService);
        tagsService = module.get<TagsService>(TagsService);
        jest.clearAllMocks();
    });

    describe('createVideo', () => {
        describe('youtube video exist', () => {
            let video;
            beforeEach(async () => {
                video = await videosService.createVideo(videoStub().videoId);
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.create).toBeCalledWith({
                    ...youtubeStub(),
                    source: VideoSource.YOUTUBE_MANUAL,
                });
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });

        describe('youtube video does not exist', () => {
            let video;
            const randomVId = 'random';
            beforeEach(async () => {
                video = await videosService.createVideo(randomVId);
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(randomVId);
            });
            it('should call TagService', () => {
                expect(tagsService.findPrivateTag).toBeCalled();
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.create).toBeCalledWith({
                    videoId: randomVId,
                    title: 'NEW VIDEO',
                    source: VideoSource.MANUAL,
                    tags: [new EmbedTags(tagStub())],
                });
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
    });

    describe('findVideos', () => {
        describe('empty filter', () => {
            let videos;
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
            let videos;
            const filter: FindVideosInputDto = {
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
            let video;
            const id = 'id';
            beforeEach(async () => {
                video = await videosService.findVideoById(id);
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.findByIdWithClip).toBeCalledWith(id);
            });
            it('should return with the video with clips field', () => {
                expect(omitStubFn(video)).toEqual({ ...omitStubFn(videoStub()), clips: [] });
            });
        });
    });

    describe('updateVideo', () => {
        describe('no relatedVideosId', () => {
            let video;
            const id = 'id';
            beforeEach(async () => {
                video = await videosService.updateVideo(id, {});
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.update).toBeCalledWith(id, {});
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
        describe('with existing relatedVideosId', () => {
            let video;
            const id = 'id';
            beforeEach(async () => {
                video = await videosService.updateVideo(id, { relatedVideosId: [videoStub().videoId] });
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.update).toBeCalledWith(id, { relatedVideos: [new RelatedVideo(videoStub())] });
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
        describe('with not existing relatedVideosId', () => {
            let video;
            const id = 'id';
            beforeEach(async () => {
                jest.spyOn(videosRepository, 'findOne').mockReturnValueOnce(null);
                video = await videosService.updateVideo(id, { relatedVideosId: [videoStub().videoId] });
            });
            it('should call VideosRepository', () => {
                expect(videosRepository.update).toBeCalledWith(id, {
                    relatedVideos: [new RelatedVideo(youtubeStub())],
                });
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });
    });

    describe('deleteVideo', () => {
        let video;
        const id = 'id';
        beforeEach(async () => {
            video = await videosService.deleteVideo(id);
        });

        it('should call VideoRepository', () => {
            expect(videosRepository.delete).toBeCalledWith(id);
        });

        it('should return with the video', () => {
            expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
        });
    });

    describe('refetchVideo', () => {
        describe('with valid Video', () => {
            let video;
            beforeEach(async () => {
                video = await videosService.refetchVideo(videoStub().id.toString());
            });
            it('shoud call VideosRepository', () => {
                expect(videosRepository.findById).toBeCalledWith(videoStub().id.toString());
                expect(videosRepository.update).toBeCalledWith(videoStub().id.toString(), youtubeStub());
            });
            it('should call YoutubeService', () => {
                expect(youtubeService.fetchVideo).toBeCalledWith(videoStub().videoId);
            });
            it('should return with the video', () => {
                expect(omitStubFn(video)).toEqual(omitStubFn(videoStub()));
            });
        });

        describe('with not valid Video', () => {
            let error;
            beforeEach(async () => {
                jest.spyOn(youtubeService, 'fetchVideo').mockReturnValueOnce(null);
                try {
                    await videosService.refetchVideo(videoStub().id.toString());
                } catch (e) {
                    error = e;
                }
            });
            it('shoud call VideosRepository', () => {
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
});
