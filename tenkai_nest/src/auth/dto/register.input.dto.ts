import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/users/schemas/user.schema';
import { objectClassConstructor } from 'src/utils/utilities';

export class RegisterInputDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty({ minLength: 8 })
    @IsString()
    @MinLength(8, {
        message: 'Password is too short, Min Length 8',
    })
    password: string;

    @ApiProperty({ enum: Object.values(UserRole) })
    @IsEnum(UserRole)
    role: UserRole;
    constructor(data: object) {
        objectClassConstructor(this, data, ['username', 'password', 'role']);
    }
}
