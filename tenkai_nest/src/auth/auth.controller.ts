import { Body, Controller, Headers, Post, UseGuards, Req } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

import { User, UserRole } from "src/users/user.schema";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorators/roles.decorator";

import { LoginParamsDto } from "./dto/login.params.dto";
import { RegisterParamsDto } from "./dto/register.params.dto";
import { Request } from "express";
import { LoginResponseDto } from "./dto/login.response.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Roles(UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("register")
    @ApiOperation({ summary: "Register User" })
    @ApiBearerAuth()
    @ApiResponse({ description: "User has been successfully created", type: User })
    async register(@Body() registerParams: RegisterParamsDto): Promise<User> {
        return this.authService.register(registerParams);
    }

    @Post("login")
    @ApiResponse({ description: "User has been successfully login", type: LoginResponseDto })
    async login(@Body() loginParams: LoginParamsDto, @Req() req: Request): Promise<LoginResponseDto> {
        const bearerToken = req.headers.authorization;
        let token;
        if (bearerToken) {
            token = bearerToken.split(" ")[1];
        }
        return this.authService.login(token, loginParams);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("logout")
    @ApiBearerAuth()
    async logout(@Headers("authorization") bearerToken: string) {
        const [, token] = bearerToken.split(" ");
        return this.authService.logout(token);
    }
}
