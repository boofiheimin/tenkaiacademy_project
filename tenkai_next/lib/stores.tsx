import create from 'zustand';

interface AppStore {
    fullMode: boolean;
    darkMode: boolean;
    setFullMode: (mode: boolean) => void;
    setAppDarkMode: (mode: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    fullMode: true,
    darkMode: true,
    setFullMode: (mode) => set(() => ({ fullMode: mode })),
    setAppDarkMode: (mode) => set(() => ({ darkMode: mode })),
}));
