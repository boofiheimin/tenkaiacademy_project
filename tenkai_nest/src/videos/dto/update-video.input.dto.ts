import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ITimestamp, VideoSource } from '../schemas/video.schema';

export class UpdateVideoInputDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    title?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    description?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    thumbnail?: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    duration?: number;

    @IsOptional()
    @IsDate()
    @ApiPropertyOptional()
    publishedAt?: Date;

    @IsOptional()
    @ApiPropertyOptional({ type: Number, isArray: true })
    tagIds?: number[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ITimestamp)
    @ApiPropertyOptional({ type: ITimestamp, isArray: true })
    timestamps?: ITimestamp[];

    @IsOptional()
    @IsString({ each: true })
    @ApiPropertyOptional({ type: String, isArray: true })
    relatedTweets?: string[];

    @IsOptional()
    @IsString({ each: true })
    @ApiPropertyOptional({ type: String, isArray: true })
    relatedVideoIds?: string[];

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    uploader?: string;

    @IsOptional()
    @IsEnum(VideoSource)
    @ApiPropertyOptional()
    source?: VideoSource;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    mirror?: string;
}
