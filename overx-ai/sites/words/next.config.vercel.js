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
  trailingSlash: true,
  
  // Webpack configuration to resolve shared package (compiled JS files only)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@overx-ai/shared': path.resolve(__dirname, 'node_modules/@overx-ai/shared'),
    }
    
    // Don't try to compile TypeScript files from shared package
    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, 'node_modules/@overx-ai/shared'),
      use: 'ignore-loader'
    })
    
    return config
  },
  
  // Disable type checking and linting during build to avoid monorepo conflicts
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optimize for performance
  compiler: {
    removeConsole: false, // Keep console logs for debugging
  },
  
  // Headers for security and SEO
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
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Rewrites for SEO
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  }
}

module.exports = nextConfig