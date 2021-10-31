import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { omit } from 'lodash';
import { BlacklistTokensService } from 'src/blacklist-tokens/blacklist-tokens.service';
import { blacklistTokenStub } from 'src/blacklist-tokens/test/stubs/blacklist-token.stub';
import { userStub } from 'src/users/test/stubs/user.stub';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

jest.mock('src/users/users.service');
jest.mock('src/blacklist-tokens/blacklist-tokens.service');

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let blacklistTokenService: BlacklistTokensService;
    const mockSignedToken = 'signedToken';
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                BlacklistTokensService,
                UsersService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValueOnce(mockSignedToken),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        blacklistTokenService = module.get<BlacklistTokensService>(BlacklistTokensService);
    });

    describe('register', () => {
        describe('when called', () => {
            let user;
            beforeEach(async () => {
                user = await authService.register(omit(userStub(), 'matchPassword'));
            });
            it('should call UsersService', () => {
                expect(usersService.createUser).toBeCalledWith(omit(userStub(), 'matchPassword'));
            });
            it('should return with user', () => {
                expect(user).toEqual(omit(userStub(), 'matchPassword'));
            });
        });
    });

    describe('login', () => {
        describe('with correct credential', () => {
            let response;
            beforeEach(async () => {
                response = await authService.login({
                    username: userStub().username,
                    password: userStub().password,
                });
            });

            it('should call UsersService', async () => {
                expect(usersService.findByUsername).toBeCalledWith(userStub().username, true);
            });
            it('should return with correct response', async () => {
                expect(response).toEqual({
                    token: mockSignedToken,
                    user: {
                        username: userStub().username,
                        role: userStub().role,
                    },
                });
            });
        });
        describe('with incorrect credential', () => {
            describe('incorrect username', () => {
                let error;
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
                let error;
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
        describe('with token', () => {
            describe('valid token', () => {
                const token = 'random token';
                beforeEach(async () => {
                    await authService.login(
                        {
                            username: userStub().username,
                            password: userStub().password,
                        },
                        token,
                    );
                });
                it('should call BlacklistTokenService', () => {
                    expect(blacklistTokenService.validateToken).toBeCalledWith(token);
                    expect(blacklistTokenService.blacklistToken).toBeCalledWith(token);
                });
            });
            describe('invalid token', () => {
                let error;
                beforeEach(async () => {
                    try {
                        await authService.login(
                            {
                                username: userStub().username,
                                password: userStub().password,
                            },
                            blacklistTokenStub().token,
                        );
                    } catch (e) {
                        error = e;
                    }
                });
                it('should call BlacklistTokenService', () => {
                    expect(blacklistTokenService.validateToken).toBeCalledWith(blacklistTokenStub().token);
                });
                it('should throw UnauthorizedException', async () => {
                    expect(error).toBeInstanceOf(UnauthorizedException);
                });
            });
        });
    });

    describe('logout', () => {
        describe('when called', () => {
            let blacklistToken;
            beforeEach(async () => {
                blacklistToken = await authService.logout(blacklistTokenStub().token);
            });
            it('should call BlacklistTokenService', () => {
                expect(blacklistTokenService.blacklistToken).toBeCalledWith(blacklistTokenStub().token);
            });
            it('should return with blacklistToken', () => {
                expect(blacklistToken).toEqual(blacklistTokenStub());
            });
        });
    });
});
