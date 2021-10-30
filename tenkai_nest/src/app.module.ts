import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { BlacklistTokensModule } from "./blacklist-tokens/blacklist-tokens.module";

import config from "./config/config";
import { LoggerMiddleWare } from "./utils/logger.middleware";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get("mongoUri"),
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            load: [config],
        }),
        BlacklistTokensModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleWare).forRoutes("*");
    }
}
