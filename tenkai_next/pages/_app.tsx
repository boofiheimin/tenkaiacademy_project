import { Toaster } from 'react-hot-toast';
import { Main } from '../components/Main';

import { NavBar } from '../components/NavBar/NavBar';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        // Why did adding min-height: inherit solve it? IDK 😒
        <div className="h-full w-full" style={{ minHeight: 'inherit' }}>
            <Toaster />
            <NavBar />
            <Main>
                <Component {...pageProps} />
            </Main>
        </div>
    );
}

export default MyApp;
