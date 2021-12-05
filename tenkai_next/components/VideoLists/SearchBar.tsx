import { FaSearchPlus } from 'react-icons/fa';
import { Tooltip } from '../Tooltip';

export const SearchBar = () => {
    return (
        <div className="py-4 w-full flex justify-center items-center">
            <div className="pt-2 max-w-full w-96 text-gray-700 flex items-center">
                <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    className="w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                />
                <Tooltip text="Advanced Search">
                    <button type="button" className="p-3 text-xl dark:text-white">
                        <FaSearchPlus />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};
