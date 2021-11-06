import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateTagInputDto {
    @IsString()
    @ApiProperty()
    tagNameEN: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    tagNameJP?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    categoryId?: number;
    constructor(data: object) {
        objectClassConstructor(this, data, ['tagNameEN', 'tagNameJP', 'categoryId']);
    }
}
