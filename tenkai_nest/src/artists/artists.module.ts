import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from 'src/songs/songs.module';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]), forwardRef(() => SongsModule)],
    controllers: [ArtistsController],
    providers: [ArtistsService, ArtistsRepository],
    exports: [ArtistsService],
})
export class ArtistsModule {}
