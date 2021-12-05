import axios from 'axios';
import toast from 'react-hot-toast';
import { Video, VideosResponse } from '../interfaces/video.interface';
import { getConfig } from './config';

const API = axios.create({ baseURL: getConfig().apiUrl });

const get = async (endpoint: string, parameters?: { [key: string]: any }) => {
    try {
        const response = await API.get(endpoint, { params: parameters });
        const { data } = response;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error);
            toast.error('Something went wrong');
            return null;
        }
        throw error;
    }
};

export const fetchVideos = async (page = 0): Promise<VideosResponse> => {
    const limit = getConfig().videosListLimit;
    const skip = page * limit;
    return get('/videos', { skip, limit });
};

export const fetchVideo = async (videoId: string): Promise<Video> => {
    return get(`/videos/${videoId}`);
};
