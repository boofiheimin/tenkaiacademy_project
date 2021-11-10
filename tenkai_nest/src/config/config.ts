export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    mongoUri: process.env.MONGO_URI,
    jwt_access_token_expire: process.env.JWT_ACCESS_TOKEN_EXPIRE || '15m',
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    jwt_refresh_token_expire: process.env.JWT_REFRESH_TOKEN_EXPIRE || '1d',
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    youtube_api_key: process.env.YOUTUBE_API_KEY || '',
    channel_id: process.env.CHANNEL_ID || 'UCZlDXzGoo7d44bwdNObFacg',
});
