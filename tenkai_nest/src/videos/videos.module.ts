import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeService } from 'src/base/youtube.service';
import { TagsModule } from 'src/tags/tags.module';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosController } from './videos.controller';
import { VideosRepository } from './videos.repository';
import { VideosService } from './videos.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        ConfigModule,
        forwardRef(() => TagsModule),
    ],
    controllers: [VideosController],
    providers: [VideosService, YoutubeService, VideosRepository],
    exports: [VideosService],
})
export class VideosModule {}
