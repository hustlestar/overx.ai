const { i18n } = require('./next-i18next.config')

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
  
  
  // Optimize for performance
  compiler: {
    // Temporarily disable console removal for debugging
    removeConsole: false, // process.env.NODE_ENV === 'production',
  },
  
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    domains: ['cdn.jsdelivr.net'], // Allow Twemoji CDN
  },
  
  // Redirects
  async redirects() {
    return [
      // Redirect all converter.overx.ai/blog URLs to rates.overx.ai/blog
      {
        source: '/blog/:path*',
        destination: 'https://rates.overx.ai/blog/:path*',
        permanent: true,
      },
      // Redirect contact page to main site consultancy
      {
        source: '/contact',
        destination: 'https://www.overx.ai/consultancy',
        permanent: true,
      },
    ]
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.overx.ai https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https://api.overx.ai https://rates.overx.ai; frame-src 'none'; object-src 'none'; base-uri 'self';"
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
            value: 'SAMEORIGIN'
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
            key: 'Cache-Control',
            value: 'public, max-age=180, stale-while-revalidate=300'
          }
        ]
      }
    ]
  },
  
  
}

module.exports = nextConfig