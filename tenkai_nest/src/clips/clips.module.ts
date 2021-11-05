import { forwardRef, Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { ClipsRepository } from './clips.repository';
import { YoutubeService } from 'src/base/youtube.service';
import { VideosModule } from 'src/videos/videos.module';
import { TagsModule } from 'src/tags/tags.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Clip, ClipSchema } from './schemas/clip.schema';
import { ConfigModule } from '@nestjs/config';
import { ClipLang, ClipLangSchema } from './schemas/clip-lang.schema';
import { ClipLangsRepository } from './clip-langs.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }]),
        MongooseModule.forFeature([{ name: ClipLang.name, schema: ClipLangSchema }]),
        forwardRef(() => VideosModule),
        forwardRef(() => TagsModule),
        ConfigModule,
    ],
    controllers: [ClipsController],
    providers: [ClipsService, ClipsRepository, ClipLangsRepository, YoutubeService],
    exports: [ClipsService],
})
export class ClipsModule {}
