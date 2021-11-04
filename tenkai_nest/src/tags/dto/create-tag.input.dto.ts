import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    catId?: number;
}
