import { v4 as uuidV4 } from 'uuid';
import { IoGrid, IoList } from 'react-icons/io5';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tooltip } from '../Tooltip';
import { VideoCard } from '../VideoCard';
import { SearchBar } from './SearchBar';
import { Video } from '../../interfaces/video.interface';
import { ShurikenLoader } from '../ShurikenLoader';

interface Props {
    videos: Video[];
    totalCount: number;
    fetchNext: () => void;
    hasMore: boolean;
    loading: boolean;
}
export const VideoLists = ({ videos, totalCount, fetchNext, hasMore, loading }: Props) => {
    const [viewMode, setViewMode] = useState(true);
    const toggleViewMode = () => setViewMode(!viewMode);
    return (
        <div className="px-10">
            <SearchBar />
            <div className="h-20 border-b flex justify-between items-end leading-none pb-1">
                <span className="">{`Total: ${loading ? '---' : totalCount}  Videos`}</span>
                <div className="text-2xl text-gray-500 hidden lg:flex">
                    <Tooltip text="Grid" className="mr-2">
                        <button
                            type="button"
                            className={`${viewMode ? 'pointer-events-none text-white' : ''}`}
                            onClick={toggleViewMode}
                        >
                            <IoGrid />
                        </button>
                    </Tooltip>
                    <Tooltip text="List">
                        <button
                            type="button"
                            className={`${!viewMode ? 'pointer-events-none text-white' : ''}`}
                            onClick={toggleViewMode}
                        >
                            <IoList />
                        </button>
                    </Tooltip>
                </div>
            </div>
            <InfiniteScroll dataLength={videos.length} hasMore={hasMore} next={fetchNext} loader={<ShurikenLoader />}>
                <div
                    className={`pt-4 grid gap-4 ${
                        viewMode
                            ? 'grid-cols-video justify-center'
                            : 'grid-cols-video lgMax:justify-center lg:grid-cols-none lg:px-10'
                    }  items-center`}
                >
                    {videos.map((video) => (
                        <VideoCard key={uuidV4()} horizontal={!viewMode} video={video} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};
