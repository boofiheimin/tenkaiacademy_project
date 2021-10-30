import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { BlacklistTokensService } from "src/blacklist-tokens/blacklist-tokens.service";

import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private blacklistToken: BlacklistTokensService,
    ) {
        super({
            secretOrKey: configService.get("jwt_secret"),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {
        const user = await this.userService.findById(payload.id);
        const [, token] = request.headers.authorization.split(" ");
        await this.blacklistToken.validateToken(token);
        return user;
    }
}
