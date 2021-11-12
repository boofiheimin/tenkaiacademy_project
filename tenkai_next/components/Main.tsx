import { ReactNode } from 'react';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <main className="bg-white text-black dark:bg-gray-700 dark:text-white h-full flex-grow transition-all duration-100 overflow-auto px-6 pt-5">
            {children}
        </main>
    );
};
