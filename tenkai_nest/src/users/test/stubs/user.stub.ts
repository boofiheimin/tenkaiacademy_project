import { User, UserRole } from 'src/users/schemas/user.schema';

export const userStub = (): User => ({
    username: 'test-user',
    password: '12345678',
    role: UserRole.ADMIN,
});
