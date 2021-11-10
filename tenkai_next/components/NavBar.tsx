import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useDarkMode from 'use-dark-mode';
import { Shuriken } from './Shuriken';

export const NavBar = () => {
    const { toggle, value } = useDarkMode(true, {
        classNameDark: 'dark',
        classNameLight: 'light',
    });
    const handleSwitchMode = () => toggle();
    return (
        <nav className="fixed w-20 h-screen dark:bg-gray-800 bg-gray-200">
            <ul className="list-none p-0 m-0 flex flex-col items-center h-full">
                <li className="w-full p-4">
                    <Shuriken className="fill-current dark:text-kanata-gold text-kanata-blue w-full" />
                </li>
                <li className="w-full mt-auto p-4" onClick={handleSwitchMode} role="menuitem">
                    {value ? (
                        <MdLightMode className="text-kanata-gold  w-full text-5xl" />
                    ) : (
                        <MdDarkMode className="text-kanata-blue w-full text-5xl" />
                    )}
                </li>
            </ul>
        </nav>
    );
};
