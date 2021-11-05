import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateClipLangInputDto {
    @MaxLength(2)
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    code?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    fullName?: string;
}
