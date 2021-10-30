import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeService } from 'src/base/youtube.service';
import { TagsModule } from 'src/tags/tags.module';
import { Video, VideoSchema } from './video.schema';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]), ConfigModule, TagsModule],
    controllers: [VideosController],
    providers: [VideosService, YoutubeService],
})
export class VideosModule {}
