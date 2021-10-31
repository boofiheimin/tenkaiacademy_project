import { blacklistTokenStub } from '../test/stubs/blacklist-token.stub';

export const BlacklistTokensService = jest.fn().mockReturnValue({
    validateToken: jest.fn(),
    blacklistTokenStub: jest.fn().mockReturnValue(blacklistTokenStub()),
});
