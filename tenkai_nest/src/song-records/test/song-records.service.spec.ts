import { Test, TestingModule } from '@nestjs/testing';
import { SongRecordsService } from '../song-records.service';

describe('SongRecordsService', () => {
    let service: SongRecordsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SongRecordsService],
        }).compile();

        service = module.get<SongRecordsService>(SongRecordsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
