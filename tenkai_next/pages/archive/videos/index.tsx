import { useEffect, useState } from 'react';
import { VideoLists } from '../../../components/VideoLists';
import { VideosResponse } from '../../../interfaces/video.interface';
import { fetchVideos } from '../../../lib/api';

const Videos = () => {
    const [data, setData] = useState<VideosResponse>({
        docs: [],
        totalCount: 0,
    });
    useEffect(() => {
        async function fetch() {
            const response = await fetchVideos();
            setData(response);
        }
        fetch();
    }, []);
    return <VideoLists data={data} />;
};
export default Videos;
