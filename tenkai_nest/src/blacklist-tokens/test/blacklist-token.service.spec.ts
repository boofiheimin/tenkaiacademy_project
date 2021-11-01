import { Test, TestingModule } from '@nestjs/testing';
import { BlacklistTokensService } from '../blacklist-tokens.service';
import { BlacklistTokensRepository } from '../blacklist-tokens.repository';
import { blacklistTokenStub, dummyToken } from './stubs/blacklist-token.stub';
import { UnauthorizedException } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';

jest.mock('../blacklist-tokens.repository');

describe('BlacklistTokenService', () => {
    let blacklistsTokenService: BlacklistTokensService;
    let blacklistsTokenRepository: BlacklistTokensRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlacklistTokensService, BlacklistTokensRepository],
        }).compile();

        blacklistsTokenService = module.get<BlacklistTokensService>(BlacklistTokensService);
        blacklistsTokenRepository = module.get<BlacklistTokensRepository>(BlacklistTokensRepository);
        jest.clearAllMocks();
    });

    describe('validateToken', () => {
        describe('valid token', () => {
            beforeEach(async () => {
                await blacklistsTokenService.validateToken('random string');
            });
            it('should call BlacklistTokenRepository', () => {
                expect(blacklistsTokenRepository.findOne).toBeCalledWith({ token: 'random string' });
            });
        });
        describe('invalid token', () => {
            let error;
            beforeEach(async () => {
                try {
                    await blacklistsTokenService.validateToken(blacklistTokenStub().token);
                } catch (err) {
                    error = err;
                }
            });
            it('should call blacklistsTokenRepository', () => {
                expect(blacklistsTokenRepository.findOne).toBeCalledWith({ token: blacklistTokenStub().token });
            });
            it('should throw UnauthorizedException', async () => {
                expect(error).toBeInstanceOf(UnauthorizedException);
            });
        });
    });

    describe('blacklistToken', () => {
        describe('when call', () => {
            let blacklistToken;
            const { exp } = jwt.decode(dummyToken()) as JwtPayload;
            beforeEach(async () => {
                blacklistToken = await blacklistsTokenService.blacklistToken(dummyToken());
            });

            it('should call BlacklistTokenRepository', () => {
                expect(blacklistsTokenRepository.create).toBeCalledWith({
                    token: dummyToken(),
                    expireAt: new Date(exp * 1000),
                });
            });
            it('should return BlacklistToken', async () => {
                expect(blacklistToken).toEqual({
                    token: dummyToken(),
                    expireAt: new Date(exp * 1000),
                });
            });
        });
    });
});
