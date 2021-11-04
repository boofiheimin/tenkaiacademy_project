import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagInputDto {
    @IsString()
    @ApiPropertyOptional()
    tagNameEN?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    tagNameJP?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    catId?: number;
}
