export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    mongoUri: process.env.MONGO_URI,
    jwt_expire: process.env.JWT_EXPIRE || '1d',
    jwt_secret: process.env.JWT_SECRET || '',
    youtube_api_key: process.env.YOUTUBE_API_KEY || '',
    channel_id: process.env.CHANNEL_ID || 'UCZlDXzGoo7d44bwdNObFacg',
});
