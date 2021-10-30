import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { BaseFindParamsDto } from 'src/base/dto/base-find.params.dto';

export class FindVideosParamsDto extends BaseFindParamsDto {
    @IsOptional()
    @IsString()
    title?: string;
    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsArray()
    tags?: number[];
    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => new Date(value))
    @IsDate()
    from?: Date;
    @IsOptional()
    @Type(() => String)
    @Transform(({ value }) => new Date(value))
    to?: Date;
    @IsOptional()
    @IsString()
    uploader: string;
    @IsOptional()
    @IsBoolean()
    sortOrder: boolean;
}
