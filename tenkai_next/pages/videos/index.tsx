import { IoGrid, IoList } from 'react-icons/io5';
import { v4 as uuidV4 } from 'uuid';

import { useAppStore } from '../../lib/stores';

import { TopSearchBar } from '../../components/TopSearchBar';
import { VideoCard } from '../../components/VideoCard';
import { Tooltip } from '../../components/Tooltip';

const Videos = () => {
    const fullMode = useAppStore((state) => state.fullMode);
    return (
        <div>
            <TopSearchBar />
            <div className="h-16" />
            <div className={`${fullMode ? 'md:pl-52' : 'md:pl-16'} transition-all duration-200`}>
                <div className="px-10">
                    <div className="h-20 border-b flex justify-between items-end leading-none pb-1">
                        <span className="">Total: 69 Videos </span>
                        <div className="flex text-2xl text-gray-500">
                            <Tooltip text="Grid" className="mr-2">
                                <button type="button" className="text-white pointer-events-none">
                                    <IoGrid />
                                </button>
                            </Tooltip>
                            <Tooltip text="List">
                                <button type="button">
                                    <IoList />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="pt-4 grid gap-4 grid-cols-video justify-items-center items-center justify-center">
                        {/* test array */}
                        {[...Array(20)].map(() => (
                            <VideoCard key={uuidV4()} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Videos;
