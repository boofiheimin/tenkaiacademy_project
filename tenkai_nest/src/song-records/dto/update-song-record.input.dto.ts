import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';
import { SongRecordType } from '../schemas/song-record.schema';

export class UpdateSongRecordInputDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    videoId?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    proxyVideoId?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    songId?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    songStart?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    songEnd?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    songIndex?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    featuring?: string;

    @ApiPropertyOptional({ enum: SongRecordType, description: 'For special song type' })
    @IsString()
    @IsOptional()
    identifier?: SongRecordType;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isScuffed?: boolean;

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
