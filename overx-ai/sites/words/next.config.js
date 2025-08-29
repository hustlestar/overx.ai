const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  poweredByHeader: false,
  trailingSlash: true,
  
  // Transpile the shared package
  transpilePackages: ['@overx-ai/shared'],
  
  // Disable type checking during build to avoid monorepo conflicts
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async redirects() {
    return [
      // Redirect /en/ to / for default English locale (non-blog pages)
      {
        source: '/en',
        destination: '/',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/',
        destination: '/',
        permanent: true,
        locale: false,
      },
      // Redirect specific /en/ pages to root (avoiding blog conflicts)
      {
        source: '/en/(about|features|pricing)',
        destination: '/$1',
        permanent: true,
        locale: false,
      },
      {
        source: '/en/(about|features|pricing)/',
        destination: '/$1/',
        permanent: true,
        locale: false,
      },
      // Redirect non-locale blog URLs to English version
      {
        source: '/blog/:path*',
        destination: '/en/blog/:path*',
        permanent: false,
        locale: false,
      },
      {
        source: '/images/:path*',
        destination: '/en/images/:path*',
        permanent: false,
        locale: false,
      },
    ]
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https://words.overx.ai; frame-src 'none'; object-src 'none'; base-uri 'self';"
          },
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
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
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