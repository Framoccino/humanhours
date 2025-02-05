/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['avatars.dicebear.com'],
    },
    basePath: '/humanhours',
    assetPrefix: '/humanhours/',
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig; 