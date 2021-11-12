import { SiDiscogs, SiBookstack } from 'react-icons/si';
import { FaHome, FaYoutube, FaFilm, FaItunesNote } from 'react-icons/fa';
import { MdLightMode, MdDarkMode, MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { useDarkModeEX } from '../../lib/hooks';
import { Shuriken } from '../Shuriken';
import { NavBarItem } from './NavBarItem';

interface Props {
    mobile: boolean;
}

const NavBarContent = ({ mobile }: Props) => {
    const { toggle, isDarkMode } = useDarkModeEX();
    const [fullMode, setFullMode] = useState(!mobile);

    const handleToggleMode = () => setFullMode(!fullMode);
    const handleSwitchMode = () => toggle();

    return (
        <>
            <nav
                className={`fixed ${fullMode ? 'w-52' : 'w-16'} ${
                    mobile && !fullMode ? 'h-16' : 'h-screen'
                } dark:bg-gray-900 bg-gray-200 text-kanata-blue dark:text-kanata-gold transition-all duration-150 ease-linear z-40`}
            >
                <ul
                    className={`list-none px-2 py-0 m-0 flex flex-col items-center h-full ${
                        fullMode ? 'overflow-hidden' : 'overflow-visible'
                    }`}
                >
                    <div className="w-full py-2 flex items-center">
                        <div className={`p-2  ${!fullMode && 'hidden'}`}>
                            <Shuriken className="fill-current h-6" />
                        </div>
                        <span className={`ml-2 font-mono text-xl font-bold ${!fullMode && 'hidden'} whitespace-nowrap`}>
                            天界学園
                        </span>
                        <div
                            className={`ml-auto flex items-center justify-center h-12 w-12 rounded-xl ${
                                !mobile &&
                                'dark:hover:bg-kanata-gold hover:bg-kanata-blue dark:hover:text-white cursor-pointer hover:text-white'
                            } transition-all duration-200 ease-linear`}
                            onClick={handleToggleMode}
                            role="button"
                            tabIndex={0}
                        >
                            <MdMenu className="text-2xl" />
                        </div>
                    </div>
                    <div
                        className={`${
                            mobile && !fullMode && 'hidden'
                        } h-full w-full flex flex-col items-center justify-center`}
                    >
                        <NavBarItem icon={<FaHome className="text-2xl" />} text="Home" fullMode={fullMode} />
                        <NavBarItem icon={<SiDiscogs className="text-2xl" />} text="Discography" fullMode={fullMode} />
                        <NavBarItem
                            icon={<SiBookstack className="text-2xl" />}
                            text="Archive"
                            fullMode={fullMode}
                            subMenus={[
                                { text: 'Videos', icon: <FaYoutube /> },
                                { text: 'Clips', icon: <FaFilm /> },
                                { text: 'Songs', icon: <FaItunesNote /> },
                            ]}
                        />
                        <NavBarItem
                            className="mt-auto"
                            icon={
                                isDarkMode ? <MdLightMode className="text-2xl" /> : <MdDarkMode className="text-2xl" />
                            }
                            text="Toggle Theme"
                            fullMode={fullMode}
                            onClick={handleSwitchMode}
                        />
                    </div>
                </ul>
            </nav>
            {!mobile && (
                <div className={`${fullMode ? 'w-52' : 'w-16'} h-full transition-all duration-150 ease-linear`} />
            )}
            {mobile && fullMode && (
                <div
                    className="absolute h-full w-full bg-black z-30 opacity-60"
                    onClick={handleToggleMode}
                    aria-hidden
                />
            )}
        </>
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
