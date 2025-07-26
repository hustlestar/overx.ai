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
  
  // Remove i18n for static export (GitHub Pages doesn't support it)
  // You'll need to build separately for each locale or use client-side i18n
  
  // Optimize for performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // For GitHub Pages deployment with custom domain
  basePath: process.env.BASE_PATH || '',
  assetPrefix: process.env.BASE_PATH || '',
  
  // Trailing slashes for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig