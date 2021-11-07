import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';
import { SongRecordType } from '../schemas/song-record.schema';

export class CreateSongRecordInputDto {
    @ApiProperty()
    @IsString()
    videoId: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    proxyVideoId?: string;

    @ApiProperty()
    @IsNumber()
    songId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    songStart?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    songEnd?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    songIndex?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    featuring?: string;

    @ApiProperty({ enum: SongRecordType, description: 'For special song type' })
    @IsString()
    @IsOptional()
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
