import { useRouter } from 'next/router';
import { SiDiscogs, SiBookstack } from 'react-icons/si';
import { FaHome, FaYoutube, FaFilm, FaItunesNote } from 'react-icons/fa';
import { MdLightMode, MdDarkMode, MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDarkMode } from '../../lib/hooks';
import { Shuriken } from '../Shuriken';
import { NavBarItem } from './NavBarItem';
import { useAppStore } from '../../lib/stores';

interface Props {
    mobile: boolean;
}

const NavBarContent = ({ mobile }: Props) => {
    const router = useRouter();
    const [isDarkMode, setDarkMode] = useDarkMode();
    const { fullMode, setFullMode } = useAppStore();
    const [mobileFullMode, setMobileFullMode] = useState(false);

    useEffect(() => {
        if (mobile) {
            setMobileFullMode(false);
        }
    }, []);

    useEffect(() => {
        if (mobile) {
            setMobileFullMode(false);
        }
    }, [router.pathname, mobile]);

    const handleToggleMode = () => (mobile ? setMobileFullMode(!mobileFullMode) : setFullMode(!fullMode));
    const handleSwitchMode = () => setDarkMode(!isDarkMode);

    const isFullMode = mobile ? mobileFullMode : fullMode;

    return (
        <div className="text-kanata-blue dark:text-kanata-gold">
            <nav
                className={`fixed ${isFullMode ? 'w-52' : 'w-16'} ${
                    mobile && !isFullMode ? 'h-16' : 'h-full'
                }  transition-all duration-150 ease-linear z-40 dark:bg-gray-900 bg-gray-200`}
            >
                <ul className="list-none px-2 py-0 m-0 flex flex-col items-center h-full overflow-y-auto overflow-x-hidden">
                    <div className="w-full py-2 flex items-center">
                        <div className={`p-2  ${!isFullMode && 'hidden'}`}>
                            <Shuriken className="fill-current h-6" />
                        </div>
                        <span
                            className={`ml-2 font-mono text-xl font-bold ${!isFullMode && 'hidden'} whitespace-nowrap`}
                        >
                            天界学園
                        </span>
                        <div
                            className={`ml-auto flex items-center justify-center h-12 w-12 rounded-xl ${
                                !mobile &&
                                'canhover:dark:hover:bg-kanata-gold canhover:hover:bg-kanata-blue canhover:dark:hover:text-white cursor-pointer canhover:hover:text-white'
                            } transition-all duration-200 ease-linear`}
                            onClick={handleToggleMode}
                            role="button"
                            tabIndex={0}
                        >
                            <MdMenu className="text-2xl" />
                        </div>
                    </div>
                    <div className={`${mobile && !isFullMode && 'hidden'} h-full w-full flex flex-col items-center`}>
                        <NavBarItem icon={<FaHome className="text-2xl" />} text="Home" link="/" fullMode={isFullMode} />
                        <NavBarItem
                            icon={<SiDiscogs className="text-2xl" />}
                            text="Discography"
                            link="/discography"
                            fullMode={isFullMode}
                        />
                        <NavBarItem
                            icon={<SiBookstack className="text-2xl" />}
                            text="Archive"
                            fullMode={isFullMode}
                            subMenus={[
                                { text: 'Videos', icon: <FaYoutube />, link: '/videos' },
                                { text: 'Clips', icon: <FaFilm />, link: '/clips' },
                                { text: 'Songs', icon: <FaItunesNote />, link: '/songs' },
                            ]}
                        />
                        {!mobile && (
                            <NavBarItem
                                className="mt-auto"
                                icon={
                                    isDarkMode ? (
                                        <MdLightMode className="text-2xl" />
                                    ) : (
                                        <MdDarkMode className="text-2xl" />
                                    )
                                }
                                text="Toggle Theme"
                                fullMode={isFullMode}
                                onClick={handleSwitchMode}
                            />
                        )}
                    </div>
                </ul>
            </nav>
            {mobile && (
                <>
                    <div className="fixed h-16 w-screen  z-10 flex justify-end items-center dark:bg-gray-900 bg-gray-200 p-2">
                        <div
                            className={`ml-auto flex items-center justify-center h-12 w-12 rounded-xl ${
                                !mobile &&
                                'canhover:dark:hover:bg-kanata-gold canhover:hover:bg-kanata-blue canhover:dark:hover:text-white cursor-pointer canhover:hover:text-white '
                            } transition-all duration-200 ease-linear`}
                            onClick={handleSwitchMode}
                            onKeyPress={({ key }) => {
                                if (key === 'Enter') {
                                    handleSwitchMode();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            {isDarkMode ? <MdLightMode className="text-2xl" /> : <MdDarkMode className="text-2xl" />}
                        </div>
                    </div>
                    <div className="h-16 w-screen" />
                </>
            )}

            {mobile && isFullMode && (
                <div
                    className="absolute h-full w-full bg-black z-20 opacity-60"
                    onClick={handleToggleMode}
                    aria-hidden
                />
            )}
        </div>
    );
};

export const NavBar = () => {
    return (
        <>
            <div className="hidden md:block">
                <NavBarContent mobile={false} />
            </div>
            <div className="block md:hidden">
                <NavBarContent mobile />
            </div>
        </>
    );
};
