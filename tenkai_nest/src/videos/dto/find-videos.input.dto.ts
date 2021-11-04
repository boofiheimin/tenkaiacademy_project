import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';

export class FindVideosInputDto extends BaseFindInputDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    title?: string;

    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    @ApiPropertyOptional({ type: String, description: 'Array of tagIds' })
    tags?: number[];

    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @ApiPropertyOptional()
    from?: Date;

    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @ApiPropertyOptional()
    to?: Date;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    uploader?: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    sortOrder?: boolean;
}