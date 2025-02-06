/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['i.pravatar.cc'],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96],
    },
    basePath: '/humanhours',
    assetPrefix: '/humanhours/',
    trailingSlash: true,
    exportPathMap: async function () {
        return {
            '/': { page: '/' },
            '/dao': { page: '/dao' },
            '/messages': { page: '/messages' },
            '/community': { page: '/community' },
        }
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    experimental: {
        optimizeCss: true,
        optimizeImages: true,
    },
    env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
}

module.exports = nextConfig; 