import { ReactNode } from 'react';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <main className="bg-white text-black dark:bg-gray-700 dark:text-white h-full w-full px-20 transition-all duration-100">
            {children}
        </main>
    );
};
