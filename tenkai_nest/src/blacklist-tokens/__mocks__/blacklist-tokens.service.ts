import { UnauthorizedException } from '@nestjs/common';
import { blacklistTokenStub } from '../test/stubs/blacklist-token.stub';

export const BlacklistTokensService = jest.fn().mockReturnValue({
    validateToken: jest.fn().mockImplementation((token) => {
        if (token === blacklistTokenStub().token) {
            throw new UnauthorizedException('Token Blacklisted');
        }
    }),
    blacklistToken: jest.fn().mockReturnValue(blacklistTokenStub()),
});
