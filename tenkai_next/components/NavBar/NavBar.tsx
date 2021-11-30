/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FaHome, FaYoutube, FaFilm, FaItunesNote } from 'react-icons/fa';
import { SiDiscogs, SiBookstack } from 'react-icons/si';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useDarkMode } from '../../lib/hooks';
import { NavBarMode, useAppStore } from '../../lib/stores';

import { Shuriken } from '../Shuriken';
import { NavBarItem } from './NavBarItem';

import { MenuItem } from './NavBar.interface';
import { NavBarVerticalItem } from './NavBarSubItem';

const SiteMaps: MenuItem[] = [
    {
        text: 'Home',
        icon: <FaHome />,
        link: '/',
    },
    {
        text: 'Discography',
        icon: <SiDiscogs />,
        link: '/discography',
    },
    {
        text: 'Archive',
        icon: <SiBookstack />,
        link: '/archive/videos',
    },
];

const SiteSubMaps: MenuItem[] = [
    {
        text: 'Videos',
        icon: <FaYoutube />,
        link: '/archive/videos',
    },
    {
        text: 'Clips',
        icon: <FaFilm />,
        link: '/archive/clips',
    },
    {
        text: 'Songs',
        icon: <FaItunesNote />,
        link: '/archive/songs',
    },
];

const variants = {
    open: { width: '13rem' },
    closed: { width: 0 },
    half: { width: '4rem' },
};

export const NavBar = () => {
    const [isDarkMode, setDarkMode] = useDarkMode();
    const { fullMode, setFullMode } = useAppStore();

    const router = useRouter();

    useEffect(() => {
        if (router.pathname.includes('archive')) {
            if (router.pathname.includes('videos/')) {
                setFullMode(NavBarMode.HALF);
            } else {
                setFullMode(NavBarMode.FULL);
            }
        } else {
            setFullMode(NavBarMode.CLOSE);
        }
    }, [router.pathname]);

    const handleSwitchMode = () => setDarkMode(!isDarkMode);

    let sideBarState = 'closed';
    if (fullMode === NavBarMode.FULL) {
        sideBarState = 'open';
    } else if (fullMode === NavBarMode.HALF) {
        sideBarState = 'half';
    } else {
        sideBarState = 'closed';
    }

    return (
        <>
            <div className="fixed w-screen h-16 bg-white dark:bg-black dark:text-white shadow-md flex justify-between items-center px-4 z-40">
                <div className="flex items-center">
                    <Shuriken className="w-8 h-8 mr-4 text-kanata-gold dark:text-kblue fill-current" />
                    <span className="text-xl font-bold">Tenkai Academy</span>
                </div>
                <div className="flex items-center">
                    <div
                        className="grid grid-flow-col  divide-black dark:divide-white h-full"
                        style={{ gridAutoColumns: 'minmax(0,1fr)' }}
                    >
                        {SiteMaps.map(({ text, icon, link }) => (
                            <NavBarItem
                                icon={icon}
                                text={text}
                                link={link}
                                active={router.pathname === link}
                                key={text}
                            />
                        ))}
                    </div>
                    <button type="button" onClick={handleSwitchMode}>
                        <div className="px-2 flex justify-center items-center">
                            {isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
                        </div>
                    </button>
                </div>
            </div>
            <motion.div
                variants={variants}
                initial="closed"
                animate={sideBarState}
                whileHover="open"
                className="fixed z-30 top-16 h-full bg-white dark:bg-gray-900 dark:text-white shadow-md transition-all duration-200 overflow-hidden group"
                transition={{ duration: 0.1 }}
            >
                {SiteSubMaps.map(({ text, icon, link }) => (
                    <NavBarVerticalItem
                        {...{ text, icon, link }}
                        key={text}
                        active={router.pathname === link}
                        halfMode={fullMode === NavBarMode.HALF}
                    />
                ))}
            </motion.div>
        </>
    );
};
