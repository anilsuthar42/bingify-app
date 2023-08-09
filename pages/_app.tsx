import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import Head from 'next/head';

import '../styles/globals.css';

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <>
      <Head>
        <title>Bingify</title>

        <link rel="icon" href="/bingify.png" />
        {/* If your favicon is in PNG format, use the following line instead */}
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}