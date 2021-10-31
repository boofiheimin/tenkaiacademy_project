import { userStub } from '../test/stubs/user.stub';

export const UsersRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockReturnValue({ docs: [userStub()], totalCount: 1 }),
    findById: jest.fn().mockReturnValue(userStub()),
    findOne: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockImplementation((dto) => ({ ...userStub(), ...dto })),
    delete: jest.fn().mockReturnValue(userStub()),
    findByUsername: jest.fn().mockReturnValue(userStub()),
});
