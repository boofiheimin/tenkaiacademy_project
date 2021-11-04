import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsModule } from 'src/clips/clips.module';
import { VideosModule } from 'src/videos/videos.module';
import { Tag, TagSchema } from './schemas/tag.schema';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
        forwardRef(() => VideosModule),
        forwardRef(() => ClipsModule),
    ],
    controllers: [TagsController],
    providers: [TagsService, TagsRepository],
    exports: [TagsService],
})
export class TagsModule {}
