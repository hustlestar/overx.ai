const { i18n } = require('./next-i18next.config')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    ...i18n,
    localeDetection: false, // We handle this in middleware
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Don't transpile modules, use compiled JS from node_modules only
  transpilePackages: [],
  
  // Webpack configuration to resolve shared package (compiled JS files only)
  webpack: (config) => {
    // Force resolve to node_modules version only, not source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@overx-ai/shared': path.resolve(__dirname, 'node_modules/@overx-ai/shared'),
    }
    
    // Ensure node_modules is checked first for module resolution
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
    
    return config
  },
  
  // Optimize for performance
  compiler: {
    // Temporarily disable console removal for debugging
    removeConsole: false, // process.env.NODE_ENV === 'production',
  },
  
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=180, stale-while-revalidate=300'
          }
        ]
      }
    ]
  },
  
  // Rewrites for better URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      }
    ]
  },
  
}

module.exports = nextConfig