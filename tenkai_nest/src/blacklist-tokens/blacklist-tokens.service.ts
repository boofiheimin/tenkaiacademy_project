import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

import { BlacklistToken } from "./blacklist-token.schema";

@Injectable()
export class BlacklistTokensService {
    constructor(@InjectModel("BlacklistToken") private readonly blacklistTokenModel: Model<BlacklistToken>) {}

    async validateToken(token: string): Promise<void> {
        const blacklistToken = await this.blacklistTokenModel.findOne({ token });
        if (blacklistToken) {
            throw new HttpException("Unauthorized: Token Blacklisted", HttpStatus.UNAUTHORIZED);
        }
    }

    async blacklistToken(token: string): Promise<BlacklistToken> {
        const { exp } = jwt.decode(token) as JwtPayload;
        return this.blacklistTokenModel.create({
            token,
            expireAt: new Date(exp * 1000),
        });
    }
}
