import { IoGrid, IoList } from 'react-icons/io5';
import { v4 as uuidV4 } from 'uuid';

import { useAppStore } from '../../lib/stores';

import { TopSearchBar } from '../../components/TopSearchBar';
import { VideoCard } from '../../components/VideoCard';

const Videos = () => {
    const fullMode = useAppStore((state) => state.fullMode);
    return (
        <div>
            <TopSearchBar />
            <div className="h-16" />
            <div className={`${fullMode ? 'md:pl-52' : 'md:pl-16'} transition-all duration-200`}>
                <div className="px-5">
                    <div className="h-20 border-b flex justify-between items-end leading-none pb-1">
                        <span className="">Total: 69 Videos </span>
                        <div className="flex text-xl">
                            <IoGrid className="mr-4" />
                            <IoList />
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
