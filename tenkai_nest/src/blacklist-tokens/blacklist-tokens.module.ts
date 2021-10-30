import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlacklistTokenSchema } from "./blacklist-token.schema";
import { BlacklistTokensService } from "./blacklist-tokens.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "BlacklistToken", schema: BlacklistTokenSchema }])],
    providers: [BlacklistTokensService],
    exports: [BlacklistTokensService],
})
export class BlacklistTokensModule {}
