import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from '../tags.service';
import { TagsRepository } from '../tags.repository';
import { tagStub } from './stubs/tag.stub';
import { VideosService } from 'src/videos/videos.service';
import { ClipsService } from 'src/clips/clips.service';

jest.mock('../tags.repository');
jest.mock('src/videos/videos.service');
jest.mock('src/clips/clips.service');

describe('TagsService', () => {
    let tagsService: TagsService;
    let tagsRepository: TagsRepository;
    let videosService: VideosService;
    let clipsService: ClipsService;

    let tag;
    let tags;
    let spy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TagsService, TagsRepository, VideosService, ClipsService],
        }).compile();

        tagsService = module.get<TagsService>(TagsService);
        tagsRepository = module.get<TagsRepository>(TagsRepository);
        videosService = module.get<VideosService>(VideosService);
        clipsService = module.get<ClipsService>(ClipsService);
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (spy) {
            spy.mockClear();
        }
    });

    describe('createTag', () => {
        describe('with no tags in db', () => {
            beforeEach(async () => {
                jest.spyOn(tagsRepository, 'findLatestTag').mockReturnValueOnce(null);
                tag = await tagsService.createTag(tagStub());
            });
            it('should call UserRepository', () => {
                expect(tagsRepository.findLatestTag).toBeCalled();
                expect(tagsRepository.create).toBeCalledWith({
                    ...tagStub(),
                    tagId: 1,
                });
            });
            it('should return with the tag', () => {
                expect(tag).toEqual({
                    ...tagStub(),
                    tagId: 1,
                });
            });
        });
        describe('with tag in db', () => {
            beforeEach(async () => {
                tag = await tagsService.createTag(tagStub());
            });
            it('should call UserRepository', () => {
                expect(tagsRepository.findLatestTag).toBeCalled();
                expect(tagsRepository.create).toBeCalledWith({
                    ...tagStub(),
                    tagId: 2,
                });
            });
            it('should return with the tag', () => {
                expect(tag).toEqual({
                    ...tagStub(),
                    tagId: 2,
                });
            });
        });
    });

    describe('findTags', () => {
        describe('when call', () => {
            beforeEach(async () => {
                tags = await tagsService.findTags({});
            });
            it('should call TagsRepository', () => {
                expect(tagsRepository.find).toBeCalledWith({});
            });
            it('should return with tags', () => {
                expect(tags).toEqual({
                    docs: [tagStub()],
                    totalCount: 1,
                });
            });
        });
    });

    describe('updateTag', () => {
        describe('when call', () => {
            beforeEach(async () => {
                tag = await tagsService.updateTag('id', { tagNameEN: 'hey' });
            });
            it('should call TagsRepository', () => {
                expect(tagsRepository.update).toBeCalledWith('id', { tagNameEN: 'hey' });
            });
            it('should return with the tag', () => {
                expect(tag).toEqual(tagStub());
            });
            it('should call VideosService', () => {
                expect(videosService.tagCascadeUpdate).toBeCalledWith(tagStub());
            });
            it('should call ClipsService', () => {
                expect(clipsService.tagCascadeUpdate).toBeCalledWith(tagStub());
            });
        });
    });

    describe('deleteTag', () => {
        describe('when call', () => {
            beforeEach(async () => {
                tag = await tagsService.deleteTag('id');
            });
            it('should call TagsRepository', () => {
                expect(tagsRepository.delete).toHaveBeenCalledWith('id');
            });
            it('should return with the tag', () => {
                expect(tag).toEqual(tagStub());
            });
            it('should call VideosService', () => {
                expect(videosService.tagCascadeDelete).toBeCalledWith(tagStub());
            });
            it('should call ClipsService', () => {
                expect(clipsService.tagCascadeDelete).toBeCalledWith(tagStub());
            });
        });
    });
});
