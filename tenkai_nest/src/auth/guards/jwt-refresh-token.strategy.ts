import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenPayload } from '../interfaces/auth.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
        super({
            secretOrKey: configService.get('jwt_refresh_token_secret'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.refresh_token;
                },
            ]),
        });
    }

    async validate(payload: RefreshTokenPayload) {
        const { id, refreshTokenVersion } = payload;
        const user = await this.usersService.findUserById(id);
        if (user.refreshTokenVersion !== refreshTokenVersion) {
            throw new UnauthorizedException('Refresh Token Revoke');
        }
        return user;
    }
}
