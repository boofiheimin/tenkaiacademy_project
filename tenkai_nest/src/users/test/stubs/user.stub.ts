import { User, UserRole } from 'src/users/schemas/user.schema';

export interface UserStub extends User {
    id: {
        toString: () => string;
    };
}

export const userStub = (): UserStub => ({
    id: { toString: () => 'test-id' },
    username: 'test-user',
    password: '12345678',
    role: UserRole.ADMIN,
    refreshTokenVersion: 0,
    matchPassword: (pwd) => pwd === '12345678',
});
