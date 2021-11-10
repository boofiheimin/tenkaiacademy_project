import { ApiProperty } from '@nestjs/swagger';

export class LogOutResponseDto {
    @ApiProperty()
    message: string;
}
