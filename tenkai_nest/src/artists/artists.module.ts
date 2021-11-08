import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongRecordsModule } from 'src/song-records/song-records.module';
import { SongsModule } from 'src/songs/songs.module';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
        forwardRef(() => SongsModule),
        SongRecordsModule,
    ],
    controllers: [ArtistsController],
    providers: [ArtistsService, ArtistsRepository],
    exports: [ArtistsService],
})
export class ArtistsModule {}
