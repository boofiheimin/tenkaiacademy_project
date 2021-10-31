import { Test, TestingModule } from '@nestjs/testing';
import { BlacklistTokensService } from '../blacklist-tokens.service';
import { BlacklistTokensRepository } from '../blacklist-tokens.repository';
import { blacklistTokenStub, dummyToken } from './stubs/blacklist-token.stub';
import { UnauthorizedException } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';

jest.mock('../blacklist-tokens.repository');

describe('BlacklistTokenService', () => {
    let blacklistTokenService: BlacklistTokensService;
    let blacklistTokenRepository: BlacklistTokensRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlacklistTokensService, BlacklistTokensRepository],
        }).compile();

        blacklistTokenService = module.get<BlacklistTokensService>(BlacklistTokensService);
        blacklistTokenRepository = module.get<BlacklistTokensRepository>(BlacklistTokensRepository);
    });

    describe('validateToken', () => {
        describe('valid token', () => {
            beforeEach(async () => {
                await blacklistTokenService.validateToken('randomstring');
            });
            it('should call BlacklistTokenRepository', () => {
                expect(blacklistTokenRepository.findOne).toBeCalledWith({ token: 'randomstring' });
            });
        });
        describe('invalid token', () => {
            let error;
            beforeEach(async () => {
                try {
                    await blacklistTokenService.validateToken(blacklistTokenStub().token);
                } catch (err) {
                    error = err;
                }
            });
            it('should call blacklistTokenRepository', () => {
                expect(blacklistTokenRepository.findOne).toBeCalledWith({ token: blacklistTokenStub().token });
            });
            it('should throw UnauthorizedException', async () => {
                expect(error).toBeInstanceOf(UnauthorizedException);
            });
        });
    });

    describe('blacklistToken', () => {
        describe('when called', () => {
            let blacklistToken;
            const { exp } = jwt.decode(dummyToken()) as JwtPayload;
            beforeEach(async () => {
                blacklistToken = await blacklistTokenService.blacklistToken(dummyToken());
            });

            it('should call BlacklistTokenRepository', () => {
                expect(blacklistTokenRepository.create).toBeCalledWith({
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
