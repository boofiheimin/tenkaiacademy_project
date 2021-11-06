import { Body, Controller, Headers, Post, UseGuards, Req } from '@nestjs/common';
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
import { BlacklistToken } from 'src/blacklist-tokens/schemas/blacklist-token.schema';

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
        const bearerToken = req.headers.authorization;
        let token;
        if (bearerToken) {
            token = bearerToken.split(' ')[1];
        }
        return this.authService.login(new LoginInputDto(loginInput), token);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('logout')
    @ApiOperation({ summary: 'Logout User' })
    @ApiBearerAuth()
    @ApiResponse({ description: 'User has been successfully logout', type: BlacklistToken })
    async logout(@Headers('authorization') bearerToken: string): Promise<BlacklistToken> {
        const [, token] = bearerToken.split(' ');
        return this.authService.logout(token);
    }
}
