import '@/styles/globals.css';
import '@/styles/ios.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Aura OS</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
