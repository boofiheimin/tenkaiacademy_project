import { ReactNode } from 'react';
import { useAppStore } from '../../lib/stores';

interface Props {
    children: ReactNode;
}

export const NavBarPadding = ({ children }: Props) => {
    const fullMode = useAppStore((state) => state.fullMode);
    return <div className={`transition-all duration-200 ${fullMode ? 'md:px-52' : 'md:px-16'} h-full`}>{children}</div>;
};
