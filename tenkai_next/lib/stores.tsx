import create from 'zustand';

export enum NavBarMode {
    CLOSE,
    FULL,
    HALF,
}
interface AppStore {
    fullMode: NavBarMode;
    darkMode: boolean;
    setFullMode: (mode: NavBarMode) => void;
    setAppDarkMode: (mode: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    fullMode: NavBarMode.CLOSE,
    darkMode: true,
    setFullMode: (mode) => set(() => ({ fullMode: mode })),
    setAppDarkMode: (mode) => set(() => ({ darkMode: mode })),
}));
