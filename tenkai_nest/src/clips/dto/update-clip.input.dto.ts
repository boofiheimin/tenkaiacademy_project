import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ClipLang } from '../schemas/clip.schema';

export class UpdateClipInputDto {
    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    @IsOptional()
    srcVideoIds?: string[];

    @ApiProperty({ enum: ClipLang, enumName: 'ClipLang', isArray: true })
    @IsEnum(ClipLang, { each: true })
    @IsOptional()
    langs?: ClipLang[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    thumbnail?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    duration?: number;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    publishedAt?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    uploader?: string;

    @ApiProperty()
    @IsNumber({}, { each: true })
    @IsOptional()
    tagIds?: number[];

    @ApiProperty()
    @IsString({ each: true })
    @IsOptional()
    relatedClipIds?: string[];
}
