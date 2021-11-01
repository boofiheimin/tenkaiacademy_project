import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVideoInputDto {
    @IsString()
    @ApiProperty()
    videoId: string;
}
