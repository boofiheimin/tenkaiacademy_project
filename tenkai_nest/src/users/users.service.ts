import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import BaseService from "src/base/base.service";
import { User } from "./user.schema";

@Injectable()
export class UsersService extends BaseService<User> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super(userModel, new Logger(UsersService.name));
    }

    async findByUsername(username: string, withPassword?: boolean): Promise<User> {
        this.logger.log(`Finding user:<username:${username}>`);
        return this.userModel.findOne({ username }).select(withPassword ? "+password" : undefined);
    }
}
