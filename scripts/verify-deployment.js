const https = require('https');
const chalk = require('chalk');

const SITE_URL = 'https://framoccino.github.io/humanhours';
const CRITICAL_PATHS = [
  '/',
  '/manifest.json',
  '/sw.js',
  '/icons/icon-192x192.png'
];

async function verifyDeployment() {
  console.log(chalk.blue('🔍 Verifying deployment...'));

  for (const path of CRITICAL_PATHS) {
    const url = `${SITE_URL}${path}`;
    try {
      const status = await checkUrl(url);
      if (status === 200) {
        console.log(chalk.green(`✅ ${url} - OK`));
      } else {
        console.log(chalk.red(`❌ ${url} - Failed (${status})`));
      }
    } catch (error) {
      console.log(chalk.red(`❌ ${url} - Error: ${error.message}`));
    }
  }
}

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', reject);
  });
}

verifyDeployment(); 