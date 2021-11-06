import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class LoginInputDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['username', 'password']);
    }
}
