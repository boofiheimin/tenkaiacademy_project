import { motion } from 'framer-motion';
import Link from 'next/link';

import { MenuItem } from './NavBar.interface';

export interface NavBarVerticalItemProps extends MenuItem {
    active: boolean;
    halfMode: boolean;
}

export const NavBarVerticalItem = ({ icon, text, link, active, halfMode }: NavBarVerticalItemProps) => {
    return (
        <Link href={link} passHref>
            <a
                onClick={(event) => {
                    console.log('what');
                    event.stopPropagation();
                }}
                role="menuitem"
                tabIndex={0}
            >
                <motion.div
                    className={`${
                        active ? 'dark:bg-gray-600 bg-gray-400 pointer-events-none' : ''
                    } w-full flex py-2 h-14 px-4 items-center dark:hover:bg-gray-700 hover:bg-gray-300`}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="ml-1 mr-5 text-2xl">{icon}</div>
                    <div className={`${halfMode ? 'group-hover:block hidden' : 'block'} smMax:block text-xl`}>
                        {text}
                    </div>
                </motion.div>
            </a>
        </Link>
    );
};
