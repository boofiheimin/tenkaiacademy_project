import { BlacklistToken } from 'src/blacklist-tokens/schemas/blacklist-token.schema';

export const blacklistTokenStub = (): BlacklistToken => ({
    token: '12345678AB',
    expireAt: new Date(0),
});

export const dummyToken = (): string =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjJ9.gteCc7zEvXGo7ywMWlpOgECiksd7LobX6WRAqewkrCE';
