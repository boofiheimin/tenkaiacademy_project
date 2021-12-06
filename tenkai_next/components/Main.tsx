import { ReactNode } from 'react';
import { NavBarPadding } from './NavBar/NavBarPadding';

interface Prop {
    children: ReactNode;
}

export const Main = ({ children }: Prop) => {
    return (
        <div className="transition-all duration-200 pb-2 h-full ">
            <NavBarPadding>
                <div className="w-full h-full">{children}</div>
            </NavBarPadding>
        </div>
    );
};
