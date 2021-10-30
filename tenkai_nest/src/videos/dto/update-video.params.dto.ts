import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IEmbedTags } from 'src/tags/tag.schema';
import { IRelatedVideo, ITimestamp, VideoSource } from '../video.schema';

export class UpdateVideoParamsDto {
    @IsOptional()
    @IsString()
    videoId?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsOptional()
    @IsDate()
    publishedAt?: Date;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IEmbedTags)
    tags?: IEmbedTags[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ITimestamp)
    timestamps?: ITimestamp[];

    @IsOptional()
    @IsString({ each: true })
    relatedTweets?: string[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IRelatedVideo)
    relatedVideos?: IRelatedVideo[];

    @IsOptional()
    @IsString()
    uploader?: string;

    @IsOptional()
    @IsEnum(VideoSource)
    source?: VideoSource;

    @IsOptional()
    @IsString()
    mirror?: string;
}
