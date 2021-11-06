import { Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artists.module';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
    imports: [ArtistsModule],
    controllers: [SongsController],
    providers: [SongsService],
    exports: [SongsService],
})
export class SongsModule {}
