import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Song } from '../schemas/song.schema';

export class FindSongsResponseDto extends BaseFindResponseDto<Song> {
    @ApiProperty({ type: [Song] })
    docs: Song[];
}
