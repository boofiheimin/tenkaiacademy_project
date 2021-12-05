import { ReactNode } from 'react';
import { NavBarPadding } from './NavBar/NavBarPadding';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <div className="bg-kwhite text-black dark:bg-gray-700 dark:text-white flex-grow transition-all duration-200 pb-2 flex items-stretch overflow-auto">
            <NavBarPadding>
                <div className="w-full h-full">{children}</div>
            </NavBarPadding>
        </div>
    );
};
