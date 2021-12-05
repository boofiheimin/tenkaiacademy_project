export const getConfig = () => ({
    apiUrl: process.env.apiUrl || 'http://localhost:5000/api/v2',
    videosListLimit: parseInt(process.env.videosListLimit, 10) || 40,
});
