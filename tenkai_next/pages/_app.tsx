import { NavBar } from '../components/NavBar/NavBar';
import { Main } from '../components/Main';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex h-full w-full">
            <NavBar />
            <Main>
                <Component {...pageProps} />
            </Main>
        </div>
    );
}

export default MyApp;
