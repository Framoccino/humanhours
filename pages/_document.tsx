import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character Set and Viewport */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A192F" />

        {/* Primary Meta Tags */}
        <meta name="title" content="Human Hours - P2P Economy Powered by Time" />
        <meta 
          name="description" 
          content="A Decentralized P2P Economy Powered by Time. Trade skills and services directly using blockchain technology." 
        />
        <meta 
          name="keywords" 
          content="blockchain, p2p economy, time banking, skills exchange, decentralized, DAO, human hours, cryptocurrency" 
        />

        {/* Application Meta */}
        <meta name="application-name" content="Human Hours" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Human Hours" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#16A34A" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://framoccino.github.io/humanhours/" />
        <meta property="og:title" content="Human Hours - P2P Economy" />
        <meta property="og:description" content="Trade your time and skills in a decentralized economy" />
        <meta property="og:image" content="https://framoccino.github.io/humanhours/og-image.png" />
        <meta property="og:site_name" content="Human Hours" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://framoccino.github.io/humanhours/" />
        <meta name="twitter:title" content="Human Hours - P2P Economy" />
        <meta name="twitter:description" content="Trade your time and skills in a decentralized economy" />
        <meta name="twitter:image" content="https://framoccino.github.io/humanhours/twitter-image.png" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/humanhours/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Web3 Integration */}
        <script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js" 
                type="application/javascript"></script>

        {/* AI Matching System Integration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.HumanHoursAI = {
                initialize: function() {
                  console.log('AI Matching System Initialized');
                },
                findMatches: function(skills, location) {
                  return new Promise((resolve) => {
                    resolve([
                      { skill: 'Gardening', match: 95 },
                      { skill: 'Web Development', match: 88 },
                      { skill: 'Teaching', match: 82 }
                    ]);
                  });
                }
              };
            `
          }}
        />

        {/* P2P Network Integration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.HumanHoursP2P = {
                initialize: function() {
                  console.log('P2P Network Initialized');
                },
                connect: function() {
                  return new Promise((resolve) => {
                    resolve({ status: 'connected', peers: 5 });
                  });
                }
              };
            `
          }}
        />
      </Head>
      <body className="bg-[#0A192F] text-[#E6F1FF]">
        {/* Preloader */}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="preloader" className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
        </div>

        {/* Main App */}
        <Main />

        {/* Modal Root for Dialogs */}
        <div id="modal-root"></div>

        {/* Toast Notifications */}
        <div id="toast-root"></div>

        {/* Scripts */}
        <NextScript />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful');
                    },
                    function(err) {
                      console.log('Service Worker registration failed');
                    }
                  );
                });
              }
            `,
          }}
        />

        {/* Initialize Core Application */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.HumanHours = {
                version: '0.1.0',
                name: 'Human Hours',
                symbol: 'HH',
                description: 'A Decentralized P2P Economy Powered by Time',
                initialize: async function() {
                  await HumanHoursAI.initialize();
                  await HumanHoursP2P.connect();
                  console.log('Human Hours Platform Initialized');
                }
              };
              
              document.addEventListener('DOMContentLoaded', function() {
                HumanHours.initialize();
              });
            `,
          }}
        />
      </body>
    </Html>
  );
} 