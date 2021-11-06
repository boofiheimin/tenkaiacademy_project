import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindSongsInputDto extends BaseFindInputDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    songId?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    songNameEN?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    songNameJP?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    artistId?: number;

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
        objectClassConstructor(this, filter, [
            'songId',
            'songNameEN',
            'songNameJP',
            'artistId',
            'artistNameEN',
            'artistNameJP',
            'limit',
            'skip',
            'sort',
        ]);
    }
}
