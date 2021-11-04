import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from 'src/base/youtube.service';
import { TagsService } from 'src/tags/tags.service';
import { VideosService } from 'src/videos/videos.service';
import { ClipsRepository } from '../clips.repository';
import { ClipsService } from '../clips.service';

jest.mock('../clips.repository');
jest.mock('src/videos/videos.service');
jest.mock('src/base/youtube.service');
jest.mock('src/tags/tags.service');

describe('ClipsService', () => {
    let service: ClipsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClipsService, ClipsRepository, VideosService, YoutubeService, TagsService],
        }).compile();

        service = module.get<ClipsService>(ClipsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
