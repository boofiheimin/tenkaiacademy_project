import { blacklistTokenStub } from '../test/stubs/blacklist-token.stub';

export const BlacklistTokensRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [blacklistTokenStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(blacklistTokenStub()),
    findOne: jest.fn().mockImplementation((input) => {
        if (input.token !== blacklistTokenStub().token) {
            return null;
        } else return blacklistTokenStub();
    }),
    update: jest.fn().mockReturnValue(blacklistTokenStub()),
    delete: jest.fn().mockReturnValue(blacklistTokenStub()),
});
