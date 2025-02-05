/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/humanhours',
    assetPrefix: '/humanhours/',
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig; 