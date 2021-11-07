import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeService } from 'src/base/youtube.service';
import { SongsModule } from 'src/songs/songs.module';
import { VideosModule } from 'src/videos/videos.module';
import { SongRecord, SongRecordSchema } from './schemas/song-record.schema';
import { SongRecordsController } from './song-records.controller';
import { SongRecordsRepository } from './song-records.repository';
import { SongRecordsService } from './song-records.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SongRecord.name, schema: SongRecordSchema }]),
        SongsModule,
        ConfigModule,
        VideosModule,
    ],
    controllers: [SongRecordsController],
    providers: [SongRecordsService, SongRecordsRepository, YoutubeService],
})
export class SongRecordsModule {}
