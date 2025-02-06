async function verifyConnections() {
  console.log('Verifying connections...');

  // Check Web3 availability
  if (typeof window.ethereum !== 'undefined') {
    console.log('✅ Web3 is available');
  } else {
    console.log('❌ Web3 is not available');
  }

  // Check if site is served over HTTPS
  if (window.location.protocol === 'https:') {
    console.log('✅ Site is served over HTTPS');
  } else {
    console.log('❌ Site is not served over HTTPS');
  }

  // Check if all required assets are loaded
  const requiredAssets = [
    '/humanhours/_next/static/css/app.css',
    '/humanhours/_next/static/js/main.js'
  ];

  for (const asset of requiredAssets) {
    try {
      const response = await fetch(asset);
      if (response.ok) {
        console.log(`✅ Asset loaded: ${asset}`);
      } else {
        console.log(`❌ Asset failed to load: ${asset}`);
      }
    } catch (error) {
      console.log(`❌ Asset failed to load: ${asset}`);
    }
  }
}

// Run verification when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', verifyConnections);
} 