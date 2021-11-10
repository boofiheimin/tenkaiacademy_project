import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { User } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
jest.mock('../users.repository');

const omitStubFn = (stub: any) => {
    return omit(stub, ['matchPassword', 'id']);
};

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: UsersRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, UsersRepository],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersRepository = module.get<UsersRepository>(UsersRepository);
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        let user: User;
        beforeEach(async () => {
            user = await usersService.createUser({
                username: userStub().username,
                password: userStub().password,
                role: userStub().role,
            });
        });
        it('should call UserRepository', async () => {
            expect(usersRepository.create).toBeCalledWith({
                username: userStub().username,
                password: userStub().password,
                role: userStub().role,
            });
        });
        it('should return with the user', async () => {
            expect(omitStubFn(user)).toEqual(omitStubFn(userStub()));
        });
    });

    describe('findByUsername', () => {
        let user: User;
        beforeEach(async () => {
            user = await usersService.findByUsername(userStub().username, true);
        });
        it('should call UserRepository', async () => {
            expect(usersRepository.findByUsername).toBeCalledWith(userStub().username, true);
        });
        it('should return with the user', async () => {
            expect(omitStubFn(user)).toEqual(omitStubFn(userStub()));
        });
    });

    describe('findUserById', () => {
        let user: User;
        beforeEach(async () => {
            user = await usersService.findUserById('user-id');
        });
        it('should call UserRepository', async () => {
            expect(usersRepository.findById).toBeCalledWith('user-id');
        });
        it('should return with the user', async () => {
            expect(omitStubFn(user)).toEqual(omitStubFn(userStub()));
        });
    });
});
