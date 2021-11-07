import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { objectClassConstructor } from 'src/utils/utilities';
import { SongRecordType } from '../schemas/song-record.schema';

export class CreateSongRecordInputDto {
    @ApiProperty()
    videoId: string;

    @ApiPropertyOptional()
    proxyVideoId?: string;

    @ApiProperty()
    songId: number;

    @ApiProperty()
    songStart: number;

    @ApiProperty()
    songEnd: number;

    @ApiProperty()
    songIndex: number;

    @ApiProperty()
    featuring?: string;

    @ApiProperty({ enum: SongRecordType, description: 'For special song type' })
    identifier?: SongRecordType;

    constructor(data: object) {
        objectClassConstructor(this, data, [
            'videoId',
            'proxyVideoId',
            'songId',
            'songStart',
            'songEnd',
            'songIndex',
            'featuring',
            'identifier',
        ]);
    }
}
