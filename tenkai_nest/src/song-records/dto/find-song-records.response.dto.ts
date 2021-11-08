import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { SongRecord } from '../schemas/song-record.schema';

export class FindSongRecordsResponseDto extends BaseFindResponseDto<SongRecord> {
    @ApiProperty({ type: [SongRecord] })
    docs: SongRecord[];
}
