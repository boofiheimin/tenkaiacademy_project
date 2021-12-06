import { useEffect, useState } from 'react';
import { VideoLists } from '../../../components/VideoLists';
import { Video } from '../../../interfaces/video.interface';
import { fetchVideos } from '../../../lib/api';
import { getConfig } from '../../../lib/config';

const Videos = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([]);
    const [total, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            const { docs, totalCount } = await fetchVideos(page);
            if (docs.length < getConfig().videosListLimit) {
                setHasMore(false);
            }
            setVideos((v) => [...v, ...docs]);
            setTotalCount(totalCount);
            setLoading(false);
        }
        fetch();
    }, [page]);

    const fetchNext = () => {
        console.log('what');
        setPage(page + 1);
    };
    return <VideoLists videos={videos} totalCount={total} fetchNext={fetchNext} hasMore={hasMore} loading={loading} />;
};
export default Videos;
