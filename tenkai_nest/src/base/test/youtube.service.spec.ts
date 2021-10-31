import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import dotenv from 'dotenv';
import path from 'path';
import Youtube from 'youtube-api';
import { YoutubeService, YoutubeVideo } from '../youtube.service';

describe('YoutubeService', () => {
    let service: YoutubeService;

    const mockGet = jest.fn();

    const mockConfigService = {
        get: mockGet,
    };

    beforeAll(async () => {
        dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });
        Youtube.authenticate({
            type: 'key',
            key: process.env.YOUTUBE_API_KEY,
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                YoutubeService,
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
            ],
        }).compile();

        service = module.get<YoutubeService>(YoutubeService);
    });

    describe('fetchVideo', () => {
        it('should return with correct value', async () => {
            const video = await service.fetchVideo('dQw4w9WgXcQ');
            const expectedValue: YoutubeVideo = {
                videoId: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
                thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
                uploader: 'Rick Astley',
                duration: 213,
                publishedAt: new Date('2009-10-25T06:57:33.000Z'),
            };

            expect(video).toEqual(expectedValue);
        });
    });

    describe('fetchAllVideoIds', () => {
        it('should return with correct value', async () => {
            mockGet.mockReturnValueOnce('UCS9uQI-jC3DE0L4IpXyvr6w');
            const videoIds = await service.fetchAllVideoIds();
            expect(videoIds.length).toEqual(788);
        });
    });
});
