import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlacklistTokensModule } from 'src/blacklist-tokens/blacklist-tokens.module';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        BlacklistTokensModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get('jwt_secret'),
                signOptions: { expiresIn: config.get('jwt_expire') },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
