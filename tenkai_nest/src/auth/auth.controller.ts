import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User, UserRole } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

import { LoginInputDto } from './dto/login.input.dto';
import { RegisterInputDto } from './dto/register.input.dto';
import { Request } from 'express';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh-token.guard';
import { RequestWithUser } from './interfaces/auth.interface';
import { LogOutResponseDto } from './dto/logout.response.dto';
import { RevokeTokenInputDto } from './dto/revoke-token.input.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Roles(UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('register')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Register User' })
    @ApiResponse({ description: 'User has been successfully created', type: User })
    async register(@Body() registerInput: RegisterInputDto): Promise<User> {
        return this.authService.register(new RegisterInputDto(registerInput));
    }

    @Post('login')
    @ApiOperation({ summary: 'Login User' })
    @ApiResponse({ description: 'User has been successfully login', type: LoginResponseDto })
    async login(@Body() loginInput: LoginInputDto, @Req() req: Request): Promise<LoginResponseDto> {
        const { token, user, refreshTokenCookie } = await this.authService.login(new LoginInputDto(loginInput));
        req.res.setHeader('Set-Cookie', [refreshTokenCookie]);
        return { token, user };
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('logout')
    @ApiOperation({ summary: 'Logout User' })
    @ApiBearerAuth()
    @ApiResponse({ description: 'User has been successfully logout', type: LogOutResponseDto })
    logout(@Req() req: Request): LogOutResponseDto {
        const logoutCookie = this.authService.logout();
        req.res.setHeader('Set-Cookie', [logoutCookie]);
        return {
            message: 'logout successfully',
        };
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    @ApiResponse({ description: 'AccessToken refreshed', type: LoginResponseDto })
    async refresh(@Req() request: RequestWithUser): Promise<LoginResponseDto> {
        return this.authService.refreshToken(request.user);
    }

    @Roles(UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('revoke')
    @ApiOperation({ summary: 'Revoke Refresh Token for user' })
    @ApiBearerAuth()
    @ApiResponse({ description: "User's RefreshToken have been revoke", type: User })
    async revokeToken(@Body() revokeTokenInputDto: RevokeTokenInputDto): Promise<User> {
        return this.authService.revokeToken(revokeTokenInputDto.userId);
    }
}
