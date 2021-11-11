import { SiDiscogs, SiBookstack } from 'react-icons/si';
import { FaHome } from 'react-icons/fa';
import { MdLightMode, MdDarkMode, MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { useDarkModeEX } from '../../lib/hooks';
import { Shuriken } from '../Shuriken';
import { NavBarItem } from './NavBarItem';

export const NavBar = () => {
    const { toggle, isDarkMode } = useDarkModeEX();
    const [fullMode, setFullMode] = useState(true);
    const handleToggleMode = () => setFullMode(!fullMode);
    const handleSwitchMode = () => toggle();
    return (
        <nav
            className={`fixed ${
                fullMode ? 'w-52' : 'w-16'
            } h-screen dark:bg-gray-800 bg-gray-200 text-kanata-blue dark:text-kanata-gold transition-all duration-150 ease-linear`}
        >
            <ul
                className={`list-none px-2 py-0 m-0 flex flex-col items-center h-full ${
                    fullMode ? 'overflow-hidden' : 'overflow-visible'
                }`}
            >
                <div className="w-full py-4 flex items-center">
                    <div className={`p-2  ${!fullMode && 'hidden'}`}>
                        <Shuriken className="fill-current h-6" />
                    </div>
                    <span className={`ml-2 font-mono text-xl font-bold ${!fullMode && 'hidden'} whitespace-nowrap`}>
                        天界学園
                    </span>
                    <div
                        className="ml-auto flex items-center justify-center h-12 w-12 rounded-xl dark:hover:bg-kanata-gold hover:bg-kanata-blue dark:hover:text-white cursor-pointer hover:text-white transition-all duration-200 ease-linear"
                        onClick={handleToggleMode}
                        role="button"
                        tabIndex={0}
                    >
                        <MdMenu className="text-2xl" />
                    </div>
                </div>
                <NavBarItem icon={<FaHome className="text-2xl" />} text="Home" fullMode={fullMode} />
                <NavBarItem icon={<SiDiscogs className="text-2xl" />} text="Discography" fullMode={fullMode} />
                <NavBarItem icon={<SiBookstack className="text-2xl" />} text="Archive" fullMode={fullMode} />
                <NavBarItem
                    className="mt-auto"
                    icon={isDarkMode ? <MdLightMode className="text-2xl" /> : <MdDarkMode className="text-4xl" />}
                    text="Toggle Theme"
                    fullMode={fullMode}
                    onClick={handleSwitchMode}
                />
            </ul>
        </nav>
    );
};
