import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
    controllers: [TagsController],
    providers: [TagsService, TagsRepository],
    exports: [TagsService],
})
export class TagsModule {}
