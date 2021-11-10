import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RevokeTokenInputDto {
    @IsString()
    @ApiProperty()
    userId: string;
}
