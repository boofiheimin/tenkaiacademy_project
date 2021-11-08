import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';
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
    @Min(0)
    songStart?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Min(0)
    songEnd?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Min(0)
    songIndex?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    featuring?: string;

    @ApiPropertyOptional({ enum: SongRecordType, description: 'For special song type' })
    @IsString()
    @IsOptional()
    identifier?: SongRecordType;

    @ApiProperty()
    @IsBoolean()
    isScuffed: boolean;

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
            'isScuffed',
        ]);
    }
}
