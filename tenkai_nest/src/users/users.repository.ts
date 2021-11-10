import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel, UsersRepository.name, {
            username: 1,
            role: 1,
            refreshTokenVersion: 1,
        });
    }

    async findByUsername(username: string, withPassword?: boolean): Promise<User> {
        this.logger.log(`Finding user:<username:${username}>`);
        return this.userModel.findOne({ username }).select(withPassword ? '+password' : undefined);
    }
}
