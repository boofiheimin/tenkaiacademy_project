import { MouseEventHandler, ReactNode, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface SubMenu {
    text: string;
    icon: ReactNode;
}
interface Props {
    icon: ReactNode;
    text?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    fullMode?: boolean;
    subMenus?: SubMenu[];
}

export const NavBarItem = ({ className = '', icon, text, fullMode = false, onClick = () => {}, subMenus }: Props) => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const handleToggleSubMenu = () => setOpenSubMenu(!openSubMenu);

    return (
        <li
            className={`${className} relative flex flex-col justify-center w-full my-2 mx-auto p-2 ${
                openSubMenu && 'dark:bg-gray-800 bg-gray-300'
            } dark:hover:bg-gray-800 hover:bg-gray-300 rounded-xl transition-all duration-200 ease-linear`}
        >
            <div
                className="flex items-center cursor-pointer group"
                onClick={subMenus ? handleToggleSubMenu : onClick}
                role="menuitem"
                tabIndex={0}
            >
                <div className="h-8 w-8 grid place-items-center flex-shrink-0">{icon}</div>
                {fullMode && <div className="ml-3 whitespace-nowrap">{text}</div>}
                {subMenus && (
                    <BiChevronDown
                        className={`ml-auto h-6 w-6 ${openSubMenu && '-rotate-180'} transition-all duration-100`}
                    />
                )}
                {!fullMode && text && (
                    <span className="absolute w-auto h-8 p-2 m-2 flex items-center min-w-max top-0 bottom-0 left-12 rounded-md text-white bg-gray-900 transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                        {text}
                    </span>
                )}
            </div>
            {subMenus && (
                <div
                    className={`transition-all duration-100 ${
                        openSubMenu ? 'scale-y-100 h-auto' : 'scale-y-0 h-0'
                    } origin-top`}
                >
                    <ul className="flex flex-col justify-center">
                        {subMenus.map((subMenu) => {
                            return (
                                <li
                                    key={`_${subMenu.text}`}
                                    className="relative w-full cursor-pointer px-1 py-2 dark:text-yellow-100 text-blue-600 dark:hover:bg-gray-700 hover:bg-gray-400 text-sm flex items-center rounded-xl group"
                                >
                                    <div className="px-1 py-1 mr-5">{subMenu.icon}</div>
                                    {fullMode && subMenu.text}
                                    {!fullMode && text && (
                                        <span className="absolute w-auto h-8 p-2 m-2 flex items-center min-w-max top-0 bottom-0 left-10 rounded-md text-white bg-gray-900 transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                            {subMenu.text}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </li>
    );
};
