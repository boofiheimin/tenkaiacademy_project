import { IoGrid, IoList } from 'react-icons/io5';
import { v4 as uuidV4 } from 'uuid';

import { useState } from 'react';
import { useAppStore } from '../../lib/stores';

import { TopSearchBar } from '../../components/TopSearchBar';
import { VideoCard } from '../../components/VideoCard';
import { Tooltip } from '../../components/Tooltip';

const Videos = () => {
    const [viewMode, setViewMode] = useState(true);
    const fullMode = useAppStore((state) => state.fullMode);

    const toggleViewMode = () => setViewMode(!viewMode);

    return (
        <>
            <TopSearchBar />
            <div className="h-16" />
            <div className={`${fullMode ? 'md:pl-52' : 'md:pl-16'} transition-all duration-200`}>
                <div className="px-10">
                    <div className="h-20 border-b flex justify-between items-end leading-none pb-1">
                        <span className="">Total: 69 Videos </span>
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
                    <div
                        className={`pt-4 grid gap-4 ${
                            viewMode
                                ? 'grid-cols-video justify-center'
                                : 'grid-cols-video lgMax:justify-center lg:grid-cols-none lg:px-10'
                        }  items-center`}
                    >
                        {/* test array */}
                        {[...Array(20)].map(() => (
                            <VideoCard key={uuidV4()} horizontal={!viewMode} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Videos;
