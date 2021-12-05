import { ReactNode } from 'react';

import { NavBarMode, useAppStore } from '../../lib/stores';

interface Props {
    children: ReactNode;
}

export const NavBarPadding = ({ children }: Props) => {
    const fullMode = useAppStore((state) => state.fullMode);

    let stateStyle = '';

    if (fullMode === NavBarMode.FULL) {
        stateStyle = 'md:pl-52 smMax:pb-16';
    } else if (fullMode === NavBarMode.HALF) {
        stateStyle = 'md:pl-16 smMax:pb-16';
    } else {
        stateStyle = 'md:pl-0';
    }

    return <div className={`${stateStyle} pt-16 w-full h-full`}>{children}</div>;
};
