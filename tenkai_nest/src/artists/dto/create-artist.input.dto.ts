import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateArtistInputDto {
    @ApiProperty()
    @IsString()
    artistNameEN: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    artistNameJP?: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['artistNameEN', 'artistNameJP']);
    }
}
