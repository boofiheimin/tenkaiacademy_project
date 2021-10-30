import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVideoParamsDto {
    @IsString()
    @ApiProperty()
    videoId: string;
}
