import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({ default: false })
    isClip?: boolean;
}
