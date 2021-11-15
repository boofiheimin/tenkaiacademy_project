import { ReactNode } from 'react';
import { useAppStore } from '../../lib/stores';

interface Props {
    children: ReactNode;
}

export const NavBarPadding = ({ children }: Props) => {
    const fullMode = useAppStore((state) => state.fullMode);
    return <div className={`transition-all duration-200 ${fullMode ? 'md:pl-52' : 'md:pl-16'}`}>{children}</div>;
};
