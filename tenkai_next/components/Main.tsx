import { ReactNode } from 'react';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <main className="bg-white text-black dark:bg-gray-800 dark:text-white flex-grow transition-all duration-200">
            {children}
        </main>
    );
};
