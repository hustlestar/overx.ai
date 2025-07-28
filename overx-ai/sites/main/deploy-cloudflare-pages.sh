#!/bin/bash

echo "Building main site for Cloudflare Pages deployment..."

# Build the static site
npm run build:static

# Export the site
npm run export

# Create _headers file for Cloudflare
cat > out/_headers << EOF
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
EOF

# Create _redirects file if needed
cat > out/_redirects << EOF
# Redirects for Cloudflare Pages
/home / 301
EOF

echo "Build complete! The 'out' directory is ready for deployment to Cloudflare Pages."
echo ""
echo "To deploy to Cloudflare Pages:"
echo "1. Connect your GitHub repository to Cloudflare Pages"
echo "2. Set build command: npm run build:static && npm run export"
echo "3. Set build output directory: out"
echo "4. Deploy!"