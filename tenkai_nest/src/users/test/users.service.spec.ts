import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.repository');

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: UsersRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, UsersRepository],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersRepository = module.get<UsersRepository>(UsersRepository);
    });

    it('should be sth', () => {
        expect(usersService).toBeDefined();
        expect(usersRepository).toBeDefined();
    });

    describe('createUser', () => {
        let user: User;
        beforeEach(async () => {
            user = await usersService.createUser(userStub());
        });
        it('should call UserRepository', async () => {
            expect(usersRepository.create).toBeCalledWith(userStub());
        });
        it('should return with user', async () => {
            expect(user).toEqual(userStub());
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
        it('should return with user', async () => {
            expect(user).toEqual(userStub());
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
        it('should return with user', async () => {
            expect(user).toEqual(userStub());
        });
    });
});
