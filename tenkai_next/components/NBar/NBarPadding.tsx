import { ReactNode } from 'react';
import { NavBarMode, useAppStore } from '../../lib/stores';

interface Props {
    children: ReactNode;
}

export const NBarPadding = ({ children }: Props) => {
    const fullMode = useAppStore((state) => state.fullMode);

    let stateStyle = '';

    if (fullMode === NavBarMode.FULL) {
        stateStyle = 'pl-52';
    } else if (fullMode === NavBarMode.HALF) {
        stateStyle = 'pl-16';
    } else {
        stateStyle = 'pl-0';
    }

    return <div className={`${stateStyle} pt-16`}>{children}</div>;
};
