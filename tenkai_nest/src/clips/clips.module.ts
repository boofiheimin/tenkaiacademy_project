import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { ClipsRepository } from './clips.repository';
import { YoutubeService } from 'src/base/youtube.service';
import { VideosModule } from 'src/videos/videos.module';
import { TagsModule } from 'src/tags/tags.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Clip, ClipSchema } from './schemas/clip.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }]),
        VideosModule,
        TagsModule,
        ConfigModule,
    ],
    controllers: [ClipsController],
    providers: [ClipsService, ClipsRepository, YoutubeService],
})
export class ClipsModule {}
