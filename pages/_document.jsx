import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Aura OS" />
                <meta name="application-name" content="Aura OS" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, interactive-widget=resizes-content, viewport-fit=cover" />
            </Head>
            <body className="bg-black text-white overflow-hidden select-none touch-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
