import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseFindParamsDto } from 'src/base/dto/base-find.params.dto';

export class FindVideosParamsDto extends BaseFindParamsDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    title?: string;

    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    @ApiPropertyOptional()
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
    @ApiPropertyOptional()
    to?: Date;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    uploader: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    sortOrder: boolean;
}
