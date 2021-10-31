import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IEmbedTags } from 'src/tags/schemas/tag.schema';
import { IRelatedVideo, ITimestamp, VideoSource } from '../schemas/video.schema';

export class UpdateVideoParamsDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    videoId?: string;

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
    @ValidateNested({ each: true })
    @Type(() => IEmbedTags)
    @ApiPropertyOptional({ type: IEmbedTags, isArray: true })
    tags?: IEmbedTags[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ITimestamp)
    @ApiPropertyOptional({ type: ITimestamp, isArray: true })
    timestamps?: ITimestamp[];

    @IsOptional()
    @IsString({ each: true })
    @ApiPropertyOptional()
    relatedTweets?: string[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IRelatedVideo)
    @ApiPropertyOptional({ type: IRelatedVideo, isArray: true })
    relatedVideos?: IRelatedVideo[];

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
