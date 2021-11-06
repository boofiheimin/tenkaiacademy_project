import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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

    @ApiPropertyOptional()
    @IsString({ each: true })
    artistIds?: number[];

    constructor(data: object) {
        objectClassConstructor(this, data, ['songNameEN', 'songNameJP', 'artistIds']);
    }
}
