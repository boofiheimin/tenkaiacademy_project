import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class UpdateClipInputDto {
    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    @IsOptional()
    srcVideoIds?: string[];

    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    @IsOptional()
    langs?: string[];

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
    constructor(data: object) {
        objectClassConstructor(this, data, [
            'srcVideoIds',
            'langs',
            'title',
            'description',
            'thumbnail',
            'duration',
            'publishedAt',
            'uploader',
            'tagIds',
            'relatedClipIds',
        ]);
    }
}
