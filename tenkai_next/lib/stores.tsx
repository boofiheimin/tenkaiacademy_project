import create from 'zustand';

interface AppStore {
    fullMode: boolean;
    setFullMode: (mode: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    fullMode: true,
    setFullMode: (mode) => set(() => ({ fullMode: mode })),
}));
