import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { BlacklistToken } from './schemas/blacklist-token.schema';
import { BlacklistTokensRepository } from './blacklist-tokens.repository';

@Injectable()
export class BlacklistTokensService {
    constructor(private blacklistTokenRepository: BlacklistTokensRepository) {}

    async validateToken(token: string): Promise<void> {
        try {
            const blacklistToken = await this.blacklistTokenRepository.findOne({ token });
            if (blacklistToken) {
                throw new UnauthorizedException('Token Blacklisted');
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                return;
            }
            throw error;
        }
    }

    async blacklistToken(token: string): Promise<BlacklistToken> {
        const { exp } = jwt.decode(token) as JwtPayload;
        return this.blacklistTokenRepository.create({
            token,
            expireAt: new Date(exp * 1000),
        });
    }
}
