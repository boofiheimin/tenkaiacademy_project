import { useEffect, useState } from 'react';

// Hook
function useLocalStorage<T>(key: string, initialValue?: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            let item;
            if (process.browser) {
                item = window.localStorage.getItem(key);
            }
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue] as const;
}

// Hook
export function useDarkMode() {
    const [isDarkMode, setDarkMode] = useLocalStorage('dark-mode-enabled', true);
    useEffect(
        () => {
            const className = 'dark';
            const element = window.document.body;
            if (isDarkMode) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },
        [isDarkMode], // Only re-call effect when value changes
    );

    // Return enabled state and setter
    return [isDarkMode, setDarkMode] as const;
}
