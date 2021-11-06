import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateSongInputDto {
    @ApiProperty()
    @IsString()
    songNameEN: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    songNameJP?: string;

    @ApiProperty()
    @IsString({ each: true })
    artistIds: number[];

    constructor(data: object) {
        objectClassConstructor(this, data, ['songNameEN', 'songNameJP', 'artistIds']);
    }
}
