import { cloneElement } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { MenuItem } from './NavBar.interface';

interface NavBarItemProps extends MenuItem {
    active?: boolean;
}

export const NavBarItem = ({ icon, text, active = false, link }: NavBarItemProps) => {
    return (
        <Link href={link} passHref>
            <a>
                <div
                    className={`relative px-2 h-full grid place-items-center font-bold ${
                        active ? 'text-kgold dark:text-kblue pointer-events-none' : ''
                    }`}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="grid place-items-center"
                    >
                        {cloneElement(icon, { className: `${icon.props.className} text-2xl` })}
                        <span className="text-xs">{text}</span>
                    </motion.div>
                    {active && <div className="absolute h-1 w-1/2 top-10 rounded-full bg-kgold dark:bg-kblue" />}
                </div>
            </a>
        </Link>
    );
};
