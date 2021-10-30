import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/user.schema';

class UserMetaData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    username: string;
    @ApiProperty({ enum: Object.values(UserRole) })
    role: UserRole;
}

export class LoginResponseDto {
    @ApiProperty({ description: "Jwt's signed token for authorization" })
    token: string;

    @ApiProperty()
    user: UserMetaData;
}
