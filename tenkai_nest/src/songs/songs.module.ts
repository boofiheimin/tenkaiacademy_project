import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsModule } from 'src/artists/artists.module';
import { Song, SongSchema } from './schemas/song.schema';
import { SongsController } from './songs.controller';
import { SongsRepository } from './songs.repository';
import { SongsService } from './songs.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]), forwardRef(() => ArtistsModule)],
    controllers: [SongsController],
    providers: [SongsService, SongsRepository],
    exports: [SongsService],
})
export class SongsModule {}
