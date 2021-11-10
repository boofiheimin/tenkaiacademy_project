import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

export const useDarkModeEX = () => {
    const { toggle, value } = useDarkMode(true, {
        classNameDark: 'dark',
        classNameLight: 'light',
    });

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, [value]);

    return { toggle, isDarkMode };
};
