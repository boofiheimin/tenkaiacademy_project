import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs';
import { useAppStore } from '../lib/stores';

export const TopSearchBar = () => {
    const fullMode = useAppStore((state) => state.fullMode);
    return (
        <div
            className={`${
                fullMode ? 'md:px-52' : 'md:px-16'
            }  w-screen bg-gray-900 h-16 flex justify-center items-center fixed z-30`}
        >
            <div className="text-xl w-10 h-10 flex justify-center items-center">
                <BsSearch />
            </div>
            <div className="max-w-xs md:max-w-sm w-full mx-2">
                <input
                    className="text-black appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                />
            </div>
            <div className="text-xl w-10 h-10 flex justify-center items-center">
                <BsThreeDotsVertical />
            </div>
        </div>
    );
};
