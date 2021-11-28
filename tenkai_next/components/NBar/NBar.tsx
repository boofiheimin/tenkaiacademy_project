/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, cloneElement, useEffect, ReactNode } from 'react';
import { FaHome, FaYoutube, FaFilm, FaItunesNote } from 'react-icons/fa';
import { SiDiscogs, SiBookstack } from 'react-icons/si';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../lib/hooks';
import { Shuriken } from '../Shuriken';
import { NavBarMode, useAppStore } from '../../lib/stores';

interface MenuItem {
    text: string;
    icon: ReactElement;
    link: string;
}

interface NBarItemProps extends MenuItem {
    active?: boolean;
}

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

const NBarItem = ({ icon, text, active = false, link }: NBarItemProps) => {
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
                    {active && <div className="absolute h-1 w-1/2 bottom-1 rounded-full bg-kgold dark:bg-kblue" />}
                </div>
            </a>
        </Link>
    );
};

interface NBarVerticalItemProps {
    icon: ReactNode;
    text: string;
    link: string;
    active: boolean;
    halfMode: boolean;
}

const NBarVerticalItem = ({ icon, text, link, active, halfMode }: NBarVerticalItemProps) => {
    return (
        <Link href={link} passHref>
            <a>
                <motion.div
                    className={`${
                        active ? 'dark:bg-gray-600 bg-gray-400 pointer-events-none' : ''
                    } w-full flex py-2 h-14 px-4 items-center dark:hover:bg-gray-700 hover:bg-gray-300`}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="ml-1 mr-5 text-2xl">{icon}</div>
                    <div className={`${halfMode ? 'group-hover:block hidden' : 'block'} text-xl`}>{text}</div>
                </motion.div>
            </a>
        </Link>
    );
};

export const NBar = () => {
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
                <div
                    className="grid grid-flow-col  divide-black dark:divide-white h-full"
                    style={{ gridAutoColumns: 'minmax(0,1fr)' }}
                >
                    {SiteMaps.map(({ text, icon, link }) => (
                        <NBarItem icon={icon} text={text} link={link} active={router.pathname === link} key={text} />
                    ))}
                    <button type="button" onClick={handleSwitchMode}>
                        <div className="px-2">
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
                    <NBarVerticalItem
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
