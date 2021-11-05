import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ClipLang } from '../schemas/clip.schema';

export class CreateClipInputDto {
    @ApiProperty()
    @IsString()
    videoId: string;
    @ApiProperty({ type: String, isArray: true })
    @IsString({ each: true })
    srcVideoIds: string[];
    @IsEnum(ClipLang, { each: true })
    @ApiProperty({ enum: ClipLang, isArray: true })
    langs: ClipLang[];
}
