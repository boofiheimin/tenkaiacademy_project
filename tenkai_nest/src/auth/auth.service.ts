import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { LoginInputDto } from './dto/login.input.dto';
import { RegisterInputDto } from './dto/register.input.dto';
import { AccessTokenPayload, LoginServiceResponse, RefreshTokenPayload } from './interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async register(registerInput: RegisterInputDto): Promise<User> {
        return this.usersService.createUser(registerInput);
    }

    private async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username, true);

        if (!user) {
            throw new UnauthorizedException('Incorrect Username');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new UnauthorizedException('Incorrect Password');
        }

        return user;
    }

    private getJwtAccessToken(user: User) {
        const payload: AccessTokenPayload = {
            id: (user as UserDocument)._id,
        };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('jwt_access_token_secret'),
            expiresIn: this.configService.get('jwt_access_token_expire'),
        });
    }

    private getCookieWithJwtRefreshToken(user: User) {
        const payload: RefreshTokenPayload = {
            id: (user as UserDocument)._id,
            refreshTokenVersion: user.refreshTokenVersion,
        };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('jwt_refresh_token_secret'),
            expiresIn: this.configService.get('jwt_refresh_token_expire'),
        });

        return `refresh_token=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'jwt_refresh_token_expire',
        )}`;
    }

    private getLogOutCookie() {
        return 'refresh_token=; HttpOnly; Path=/; Max-Age=0';
    }

    async login(loginInput: LoginInputDto): Promise<LoginServiceResponse> {
        const { username, password } = loginInput;
        const user = await this.validateUser(username, password);

        const accessToken = this.getJwtAccessToken(user);
        const refreshTokenCookie = this.getCookieWithJwtRefreshToken(user);
        return {
            token: accessToken,
            user: {
                id: (user as UserDocument).id.toString(),
                username: user.username,
                role: user.role,
            },
            refreshTokenCookie,
        };
    }

    logout() {
        return this.getLogOutCookie();
    }

    async refreshToken(user: User) {
        const accessToken = this.getJwtAccessToken(user);
        return {
            token: accessToken,
            user: {
                id: (user as UserDocument).id.toString(),
                username: user.username,
                role: user.role,
            },
        };
    }
}
