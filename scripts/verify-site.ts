export async function verifySite() {
  const checks = {
    routing: false,
    wallet: false,
    assets: false,
    api: false
  };

  // Check routing
  try {
    const routes = ['/', '/tasks', '/wallet', '/messages', '/community', '/dao'];
    for (const route of routes) {
      const response = await fetch(`${window.location.origin}/humanhours${route}`);
      if (!response.ok) throw new Error(`Route ${route} not accessible`);
    }
    checks.routing = true;
  } catch (error) {
    console.error('Routing check failed:', error);
  }

  // Check wallet connection
  try {
    if (typeof window.ethereum !== 'undefined') {
      checks.wallet = true;
    }
  } catch (error) {
    console.error('Wallet check failed:', error);
  }

  // Check assets
  try {
    const assets = [
      '/humanhours/_next/static/css/app.css',
      '/humanhours/_next/static/js/main.js',
      '/humanhours/manifest.json'
    ];
    for (const asset of assets) {
      const response = await fetch(asset);
      if (!response.ok) throw new Error(`Asset ${asset} not found`);
    }
    checks.assets = true;
  } catch (error) {
    console.error('Assets check failed:', error);
  }

  // Check API endpoints
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('API endpoint not responding');
    checks.api = true;
  } catch (error) {
    console.error('API check failed:', error);
  }

  // Log results
  console.table(checks);
  return Object.values(checks).every(Boolean);
} 