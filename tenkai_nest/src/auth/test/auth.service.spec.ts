import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { UserStub, userStub } from 'src/users/test/stubs/user.stub';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

jest.mock('src/users/users.service');

const omitStubFn = (stub: UserStub) => {
    return omit(stub, ['matchPassword', 'id']);
};

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    const mockSignedToken = 'signedToken';
    const mockExpireAge = 999;
    let response;
    let error: Error;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue(mockSignedToken),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue(mockExpireAge),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jest.clearAllMocks();
    });

    describe('register', () => {
        describe('when called', () => {
            let user;
            beforeEach(async () => {
                user = await authService.register(omitStubFn(userStub()));
            });
            it('should call UsersService', () => {
                expect(usersService.createUser).toBeCalledWith(omitStubFn(userStub()));
            });
            it('should return with the user', () => {
                expect(user).toEqual(omitStubFn(userStub()));
            });
        });
    });

    describe('login', () => {
        describe('with correct credential', () => {
            beforeEach(async () => {
                response = await authService.login({
                    username: userStub().username,
                    password: userStub().password,
                });
            });

            it('should call UsersService', () => {
                expect(usersService.findByUsername).toBeCalledWith(userStub().username, true);
            });
            it('should return with the correct response', () => {
                expect(response).toEqual({
                    token: mockSignedToken,
                    refreshTokenCookie: `refresh_token=${mockSignedToken}; HttpOnly; Path=/; Max-Age=${mockExpireAge}`,
                    user: {
                        id: userStub().id.toString(),
                        username: userStub().username,
                        role: userStub().role,
                    },
                });
            });
        });
        describe('with incorrect credential', () => {
            describe('incorrect username', () => {
                beforeEach(async () => {
                    try {
                        await authService.login({
                            username: 'wrong',
                            password: userStub().password,
                        });
                    } catch (e) {
                        error = e;
                    }
                });

                it('should call UsersService', () => {
                    expect(usersService.findByUsername).toBeCalledWith('wrong', true);
                });

                it('should throw UnauthorizedException', () => {
                    expect(error).toBeInstanceOf(UnauthorizedException);
                    expect((error as UnauthorizedException).message).toEqual('Incorrect Username');
                });
            });
            describe('incorrect password', () => {
                beforeEach(async () => {
                    try {
                        await authService.login({
                            username: userStub().username,
                            password: 'wrong',
                        });
                    } catch (e) {
                        error = e;
                    }
                });

                it('should call UsersService', () => {
                    expect(usersService.findByUsername).toBeCalledWith(userStub().username, true);
                });

                it('should throw UnauthorizedException', () => {
                    expect(error).toBeInstanceOf(UnauthorizedException);
                    expect((error as UnauthorizedException).message).toEqual('Incorrect Password');
                });
            });
        });
    });

    describe('logout', () => {
        describe('when called', () => {
            beforeEach(async () => {
                response = await authService.logout();
            });
            it('should return with logout cookie', () => {
                expect(response).toEqual('refresh_token=; HttpOnly; Path=/; Max-Age=0');
            });
        });
    });
});
