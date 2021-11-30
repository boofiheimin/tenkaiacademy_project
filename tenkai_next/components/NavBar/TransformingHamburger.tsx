import { useState } from 'react';

interface BarProps {
    className?: string;
}

const Bar = ({ className }: BarProps) => {
    return (
        <span
            className={`${className} absolute h-1 w-full dark:bg-white bg-black rounded-2xl opacity-100 left-0 rotate-0 transition-all duration-200 ease-in-out`}
        />
    );
};

interface Props {
    onOpen?: () => void;
}

export const TransformingHamburger = ({ onOpen = () => {} }: Props) => {
    const [open, setOpen] = useState(false);
    const handleToggleOpen = () => {
        onOpen();
        setOpen(!open);
    };
    return (
        <button onClick={handleToggleOpen} type="button">
            <div className="w-7 h-4 relative cursor-pointer">
                <Bar className={open ? 'top-2 w-0 left-1/2' : 'top-0'} />
                <Bar className={`top-2 ${open ? 'rotate-45' : ''}`} />
                <Bar className={`top-2 ${open ? '-rotate-45' : ''}`} />
                <Bar className={open ? 'top-2 w-0 left-1/2' : 'top-4'} />
            </div>
        </button>
    );
};
