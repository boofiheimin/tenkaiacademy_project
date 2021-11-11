import { MouseEventHandler, ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    text?: string;
    onClick?: MouseEventHandler<HTMLLIElement>;
    className?: string;
    fullMode?: boolean;
}

export const NavBarItem = ({ className = '', icon, text, fullMode = false, onClick = () => {} }: Props) => (
    <li
        className={`${className} relative flex items-center h-12 w-full my-2 mx-auto p-2 dark:hover:bg-kanata-gold hover:bg-kanata-blue  dark:hover:text-white hover:text-white rounded-xl transition-all duration-200 ease-linear cursor-pointer group`}
        onClick={onClick}
        role="menuitem"
    >
        <div className="h-8 w-8 grid place-items-center flex-shrink-0">{icon}</div>
        {fullMode && <div className="ml-3 whitespace-nowrap">{text}</div>}
        {!fullMode && text && (
            <span className="absolute w-auto p-2 m-2 flex items-center min-w-max top-0 bottom-0 left-14 rounded-md text-white bg-gray-900 transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                {text}
            </span>
        )}
    </li>
);
