import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class UpdateArtistInputDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    artistNameEN?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    artistNameJP?: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['artistNameEN', 'artistNameJP']);
    }
}
