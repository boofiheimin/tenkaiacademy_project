import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ClipLang } from '../schemas/clip.schema';

export class UpdateClipInputDto {
    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    srcVideoIds?: string[];

    @ApiProperty({ enum: ClipLang, enumName: 'ClipLang', isArray: true })
    @IsEnum(ClipLang, { each: true })
    langs?: ClipLang[];

    @ApiProperty()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsString()
    thumbnail?: string;

    @ApiProperty()
    @IsNumber()
    duration?: number;

    @ApiProperty()
    @IsDate()
    publishedAt?: Date;

    @ApiProperty()
    @IsString()
    uploader?: string;

    @ApiProperty()
    @IsNumber({}, { each: true })
    tagIds?: number[];

    @ApiProperty()
    @IsString({ each: true })
    relatedClipIds?: string[];
}
