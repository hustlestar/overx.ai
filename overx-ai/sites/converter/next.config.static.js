const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Static export
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Optimize for performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Generate static pages at build time
  generateBuildId: async () => {
    return 'static-build-' + Date.now()
  },
  
  // Trailing slashes for static hosting
  trailingSlash: true,
}

module.exports = nextConfig