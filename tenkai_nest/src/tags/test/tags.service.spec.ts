import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from '../tags.service';
import { TagsRepository } from '../tags.repository';
import { tagStub } from './stubs/tag.stub';
import { VideosService } from 'src/videos/videos.service';

jest.mock('../tags.repository');
jest.mock('src/videos/videos.service');

describe('TagsService', () => {
    let tagsService: TagsService;
    let tagsRepository: TagsRepository;
    let videosService: VideosService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TagsService, TagsRepository, VideosService],
        }).compile();

        tagsService = module.get<TagsService>(TagsService);
        tagsRepository = module.get<TagsRepository>(TagsRepository);
        videosService = module.get<VideosService>(VideosService);
        jest.clearAllMocks();
    });

    describe('createTag', () => {
        describe('with no tags in db', () => {
            let tag;
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
            let tag;
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

    describe('findPrivateTag', () => {
        describe('when call', () => {
            let tag;
            beforeEach(async () => {
                tag = await tagsService.findPrivateTag();
            });
            it('should call TagRepository', () => {
                expect(tagsRepository.findOne).toBeCalledWith({
                    tagNameEN: 'Private',
                });
            });
            it('should return with the tag', () => {
                expect(tag).toEqual(tagStub());
            });
        });
    });

    describe('findTags', () => {
        describe('when call', () => {
            let tags;
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
            let tag;
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
        });
    });

    describe('deleteTag', () => {
        describe('when call', () => {
            let tag;
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
        });
    });
});
