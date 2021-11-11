import { NavBar } from '../components/NavBar/NavBar';
import { Main } from '../components/Main';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Main>
                <Component {...pageProps} />
            </Main>
        </>
    );
}

export default MyApp;
