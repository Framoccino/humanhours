import { AppProps } from 'next/app';
import { Web3Provider } from '../context/Web3Context';
import { ErrorBoundary } from '../components/error/ErrorBoundary';
import { initializeMonitoring, trackPageView } from '../utils/monitoring';
import { debug } from '../utils/debug';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';

// Initialize monitoring
initializeMonitoring();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Register service worker
      debug.log('Registering service worker...');
      const script = document.createElement('script');
      script.src = '/humanhours/sw-register.js';
      document.body.appendChild(script);

      // Track page view
      trackPageView(window.location.pathname);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Web3Provider>
        <Head>
          <title>Human Hours - P2P Economy Powered by Time</title>
          <meta name="description" content="A decentralized P2P economy powered by time where users trade skills and services directly." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          
          {/* PWA Meta Tags */}
          <meta name="application-name" content="Human Hours" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Human Hours" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#0A192F" />
        </Head>
        <Component {...pageProps} />
      </Web3Provider>
    </ErrorBoundary>
  );
} 