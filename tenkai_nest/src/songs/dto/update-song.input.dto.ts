import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class UpdateSongInputDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    songNameEN?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    songNameJP?: string;

    @IsNumber({}, { each: true })
    @IsOptional()
    @ApiPropertyOptional()
    artistIds?: number[];

    @ApiPropertyOptional()
    @IsNumber()
    duration?: number;

    constructor(data: object) {
        objectClassConstructor(this, data, ['songNameEN', 'songNameJP', 'artistIds', 'duration']);
    }
}
