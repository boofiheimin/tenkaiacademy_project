import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
    createUser: jest.fn().mockImplementation((dto) => dto),
    findByUsername: jest.fn().mockReturnValue(userStub()),
    findUserById: jest.fn().mockRejectedValue(userStub()),
});
