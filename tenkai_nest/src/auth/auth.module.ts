import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './guards/jwt-refresh-token.strategy';

@Module({
    imports: [ConfigModule, UsersModule, PassportModule, JwtModule.register({})],
    providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
