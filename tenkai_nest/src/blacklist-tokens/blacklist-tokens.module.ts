import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlacklistTokenSchema } from './schemas/blacklist-token.schema';
import { BlacklistTokensService } from './blacklist-tokens.service';
import { BlacklistTokensRepository } from './blacklist-tokens.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'BlacklistToken', schema: BlacklistTokenSchema }])],
    providers: [BlacklistTokensService, BlacklistTokensRepository],
    exports: [BlacklistTokensService],
})
export class BlacklistTokensModule {}
