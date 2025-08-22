/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n: {
    ...i18n,
    localeDetection: false, // We handle this in middleware
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Image optimization for Vercel
  images: {
    domains: ['overx.ai', 'cdn.jsdelivr.net'], // Added cdn.jsdelivr.net for Twemoji
  },
  
  // Optimize for performance
  compiler: {
    // Temporarily disable console removal for debugging
    removeConsole: false, // process.env.NODE_ENV === 'production',
  },
  
  // Environment variables that will be inlined at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://overx.ai',
  },
  
  // Serve shared favicon files
  async rewrites() {
    return [
      {
        source: '/shared/favicon/:path*',
        destination: '/api/favicon/:path*',
      },
    ]
  },
}

module.exports = nextConfig