import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Human Hours - P2P Economy Powered by Time</title>
        <meta name="description" content="A decentralized P2P economy powered by time where users trade skills and services directly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Human Hours - P2P Economy" />
        <meta property="og:description" content="Trade your time and skills in a decentralized economy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://framoccino.github.io/humanhours/" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Human Hours" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Human Hours" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#16A34A" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 