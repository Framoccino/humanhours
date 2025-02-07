/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/human-hours',
  assetPrefix: '/human-hours/',
  trailingSlash: true,
}

module.exports = nextConfig 