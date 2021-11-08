import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateSongInputDto {
    @ApiPropertyOptional({
        description: 'Song name in English',
    })
    @IsString()
    @IsOptional()
    songNameEN?: string;

    @ApiPropertyOptional({
        description: 'Song name in Romanji',
    })
    @IsString()
    @IsOptional()
    songNameRM?: string;

    @ApiPropertyOptional({
        description: 'Song name in Japanese',
    })
    @IsString()
    @IsOptional()
    songNameJP?: string;

    @ApiProperty()
    @IsNumber({}, { each: true })
    artistIds: number[];

    @ApiProperty()
    @IsNumber()
    duration: number;

    constructor(data: object) {
        objectClassConstructor(this, data, ['songNameEN', 'songNameJP', 'songNameRM', 'artistIds', 'duration']);
    }
}
