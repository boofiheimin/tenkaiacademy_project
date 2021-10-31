import { UserRole } from '../schemas/user.schema';

export class CreateUserInputDto {
    username: string;
    password: string;
    role: UserRole;
}
