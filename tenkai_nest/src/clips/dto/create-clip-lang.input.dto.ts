import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateClipLangInputDto {
    @MaxLength(2)
    @IsString()
    @ApiProperty()
    code: string;
    @IsString()
    @ApiProperty()
    fullName: string;
}
