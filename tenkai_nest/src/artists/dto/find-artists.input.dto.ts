import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindArtistsInputDto extends BaseFindInputDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    artistId?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    artistNameEN?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    artistNameJP?: string;
    constructor(filter: object) {
        super();
        objectClassConstructor(this, filter, ['artistId', 'artistNameEN', 'artistNameJP', 'limit', 'skip', 'sort']);
    }
}
