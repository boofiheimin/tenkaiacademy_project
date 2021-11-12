import { ReactNode } from 'react';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <main className="bg-white text-black dark:bg-gray-700 dark:text-white h-full flex-grow transition-all duration-200 overflow-auto pt-5">
            {children}
        </main>
    );
};
