import { NavBar } from '../components/NavBar/NavBar';
import { Main } from '../components/Main';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <NavBar />
            <Main>
                <Component {...pageProps} />
            </Main>
        </div>
    );
}

export default MyApp;
