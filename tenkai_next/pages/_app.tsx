import { NavBarWrapper } from '../components/NavBar/NavBarWrapper';
import { Main } from '../components/Main';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex h-full w-full">
            <NavBarWrapper />
            <Main>
                <Component {...pageProps} />
            </Main>
        </div>
    );
}

export default MyApp;
