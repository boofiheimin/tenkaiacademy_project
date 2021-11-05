import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
    controllers: [ArtistsController],
    providers: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}