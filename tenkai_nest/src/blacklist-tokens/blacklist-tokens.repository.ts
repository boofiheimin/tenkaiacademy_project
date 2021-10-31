import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { BlacklistTokenDocument } from './schemas/blacklist-token.schema';

export class BlacklistTokensRepository extends BaseRepository<BlacklistTokenDocument> {
    constructor(@InjectModel('BlacklistToken') private readonly blacklistTokenModel: Model<BlacklistTokenDocument>) {
        super(blacklistTokenModel, BlacklistTokensRepository.name);
    }
}
