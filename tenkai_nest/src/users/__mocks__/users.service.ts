import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
    createUser: jest.fn().mockImplementation((dto) => dto),
    findByUsername: jest.fn().mockImplementation((username) => {
        if (username === userStub().username) {
            return userStub();
        }
        return null;
    }),
    findUserById: jest.fn().mockRejectedValue(userStub()),
});
