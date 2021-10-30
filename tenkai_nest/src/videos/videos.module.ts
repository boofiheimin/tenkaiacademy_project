import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
    controllers: [VideosController],
    providers: [VideosService],
})
export class VideosModule {}
