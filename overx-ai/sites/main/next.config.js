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
  
  // Redirects for removed/non-existent pages
  async redirects() {
    return [
      // Redirect www to non-www for canonical URL consistency
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.overx.ai' }],
        destination: 'https://overx.ai/:path*',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/consultancy',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  
  // Security and performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https://api.overx.ai https://rates.overx.ai https://words.overx.ai https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com; frame-src 'none'; object-src 'none'; base-uri 'self';"
          },
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
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
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