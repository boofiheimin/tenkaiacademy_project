import { Request } from 'express';
import { User, UserRole } from 'src/users/schemas/user.schema';

export interface AccessTokenPayload {
    id: string;
}

export interface RefreshTokenPayload {
    id: string;
    refreshTokenVersion: number;
}

export interface LoginServiceResponse {
    token: string;
    user: {
        id: string;
        username: string;
        role: UserRole;
    };
    refreshTokenCookie: string;
}

export interface RequestWithUser extends Request {
    user: User;
}
