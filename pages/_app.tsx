import { AppProps } from 'next/app';
import { Web3Provider } from '@/context/Web3Context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initializeMonitoring, trackPageView } from '../utils/monitoring';
import { debug } from '../utils/debug';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';

// Initialize monitoring
initializeMonitoring();

// Update the routes configuration
const routes = {
  '/': 'Home',
  '/tasks': 'Tasks',
  '/wallet': 'Wallet',
  '/messages': 'Messages',
  '/community': 'Community',
  '/dao': 'DAO'
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

  // Add navigation tracking
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('Route changed to:', url);
      trackPageView(url);
    };

    router.events.on('routeChange', handleRouteChange);
    return () => {
      router.events.off('routeChange', handleRouteChange);
    };
  }, [router]);

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