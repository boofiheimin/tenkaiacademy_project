import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BlacklistToken } from "src/blacklist-tokens/blacklist-token.schema";
import { BlacklistTokensService } from "src/blacklist-tokens/blacklist-tokens.service";
import { User } from "src/users/user.schema";
import { UsersService } from "src/users/users.service";

import { LoginParamsDto } from "./dto/login.params.dto";
import { LoginResponseDto } from "./dto/login.response.dto";
import { RegisterParamsDto } from "./dto/register.params.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private blacklistTokenService: BlacklistTokensService,
        private jwtService: JwtService,
    ) {}

    async register(registerParams: RegisterParamsDto): Promise<User> {
        return this.usersService.create(registerParams);
    }

    private async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username, true);

        if (!user) {
            throw new HttpException("Invalid Username", HttpStatus.UNAUTHORIZED);
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new HttpException("Invalid Password", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async login(token: string, loginParams: LoginParamsDto): Promise<LoginResponseDto> {
        if (token) {
            await this.blacklistTokenService.validateToken(token);
            await this.blacklistTokenService.blacklistToken(token);
        }
        const { username, password } = loginParams;
        const user = await this.validateUser(username, password);
        const payload = { id: user._id, username: user.username };
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        };
    }

    async logout(token: string): Promise<BlacklistToken> {
        return this.blacklistTokenService.blacklistToken(token);
    }
}
