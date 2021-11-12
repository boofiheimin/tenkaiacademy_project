import { MouseEventHandler, ReactNode, useState } from 'react';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';

interface SubMenu {
    text: string;
    icon: ReactNode;
    link: string;
}
interface Props {
    icon: ReactNode;
    text?: string;
    link?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    className?: string;
    fullMode?: boolean;
    subMenus?: SubMenu[];
}

export const NavBarItem = ({
    className = '',
    icon,
    text,
    link,
    fullMode = false,
    onClick = () => {},
    subMenus,
}: Props) => {
    const router = useRouter();
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const handleToggleSubMenu = () => setOpenSubMenu(!openSubMenu);

    const isActive = router.pathname === link;

    return (
        <li
            className={`${className} flex flex-col justify-center w-full my-2 mx-auto p-2 ${
                openSubMenu ? 'dark:bg-gray-800 bg-gray-300' : `${isActive ? 'dark:bg-gray-800 bg-gray-300' : ''}`
            } canhover:dark:hover:bg-gray-800 canhover:hover:bg-gray-300 rounded-xl transition-all duration-200 ease-linear`}
        >
            {link ? (
                <Link href={link} passHref>
                    <a
                        className={`flex items-center cursor-pointer ${isActive ? 'pointer-events-none' : ''}`}
                        onClick={subMenus ? handleToggleSubMenu : onClick}
                        role="menuitem"
                        tabIndex={0}
                    >
                        <div className="h-8 w-8 grid place-items-center flex-shrink-0">{icon}</div>
                        {fullMode && <div className="ml-3 whitespace-nowrap">{text}</div>}
                        {fullMode && subMenus && (
                            <BiChevronDown
                                className={`ml-auto h-6 w-6 ${
                                    openSubMenu && '-rotate-180'
                                } transition-all duration-100`}
                            />
                        )}
                    </a>
                </Link>
            ) : (
                <a
                    className={`flex items-center cursor-pointer ${isActive ? 'pointer-events-none' : ''}`}
                    onClick={subMenus ? handleToggleSubMenu : onClick}
                    role="menuitem"
                    tabIndex={0}
                >
                    <div className="h-8 w-8 grid place-items-center flex-shrink-0">{icon}</div>
                    {fullMode && <div className="ml-3 whitespace-nowrap">{text}</div>}
                    {fullMode && subMenus && (
                        <BiChevronDown
                            className={`ml-auto h-6 w-6 ${openSubMenu && '-rotate-180'} transition-all duration-100`}
                        />
                    )}
                </a>
            )}

            {subMenus && (
                <div
                    className={`transition-all duration-100 ${
                        openSubMenu ? 'scale-y-100 h-auto' : 'scale-y-0 h-0'
                    } origin-top`}
                >
                    <ul className="flex flex-col justify-center">
                        {subMenus.map((subMenu) => {
                            const isSubMenuActive = router.pathname === subMenu.link;
                            return (
                                <>
                                    <li
                                        key={`_${subMenu.text}`}
                                        className={`w-full cursor-pointer px-1 py-2 dark:text-yellow-100 text-blue-600 canhover:dark:hover:bg-gray-700 canhover:hover:bg-gray-400 text-sm flex items-center rounded-xl ${
                                            isSubMenuActive ? 'dark:bg-gray-700 bg-gray-400' : ''
                                        }`}
                                    >
                                        <Link href={subMenu.link} passHref>
                                            <a className="w-full flex">
                                                <div className="px-1 py-1 mr-5">{subMenu.icon}</div>
                                                {fullMode && subMenu.text}
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            )}
        </li>
    );
};
