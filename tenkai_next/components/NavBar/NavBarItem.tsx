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
            <a onClick={(event) => event.stopPropagation()} role="menuitem" tabIndex={0}>
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
                </div>
            </a>
        </Link>
    );
};
