import axios from 'axios';
import toast from 'react-hot-toast';
import { VideosResponse } from '../interfaces/video.interface';

const URL = process.env.apiUrl || 'http://localhost:5000/api/v2';

const API = axios.create({ baseURL: URL });

const get = async (endpoint: string, parameters?: { [key: string]: any }) => {
    try {
        const response = await API.get(endpoint, { params: parameters });
        const { data } = response;
        return data;
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
        return null;
    }
};

export const fetchVideos = async (page = 0): Promise<VideosResponse> => {
    const limit = parseInt(process.env.videoListLimit, 10);
    const skip = page * limit;
    return get('/videos', { skip, limit });
};
