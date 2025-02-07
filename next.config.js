/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/humanhours',
  assetPrefix: '/humanhours/',
  trailingSlash: true,
}

module.exports = nextConfig 