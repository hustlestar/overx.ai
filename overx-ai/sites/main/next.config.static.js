/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Remove i18n for static export
  // You'll need to build separately for each locale or use client-side i18n
  
  // Optimize for performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // For GitHub Pages or custom domain deployment
  basePath: process.env.BASE_PATH || '',
  assetPrefix: process.env.BASE_PATH || '',
  
  // Trailing slashes for static hosting
  trailingSlash: true,
  
  // Environment variables that will be inlined at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://overx.ai',
  },
}

module.exports = nextConfig