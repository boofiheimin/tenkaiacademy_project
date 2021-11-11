import { NavBar } from './NavBar';

export const NavBarWrapper = () => {
    return (
        <>
            <div className="hidden md:block">
                <NavBar startFull />
            </div>
            <div className="block md:hidden">
                <NavBar startFull={false} />
            </div>
        </>
    );
};
