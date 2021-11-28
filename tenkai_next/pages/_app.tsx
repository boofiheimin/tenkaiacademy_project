// import { NavBar } from '../components/NavBar/NavBar';
import { Main } from '../components/Main';

import { NBar } from '../components/NBar/NBar';

import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        // Why did adding min-height: inherit solve it? IDK 😒
        <div className="flex flex-col md:flex-row w-full" style={{ minHeight: 'inherit' }}>
            <NBar />
            <Main>
                <Component {...pageProps} />
            </Main>
        </div>
    );
}

export default MyApp;
