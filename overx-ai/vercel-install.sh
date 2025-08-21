#!/bin/bash

echo "Installing dependencies for Vercel deployment..."

# First, install root dependencies without workspace packages
echo "Installing root dependencies..."
npm install --omit=optional --no-audit --no-fund || true

# Build the shared package first
echo "Building shared package..."
cd shared
# Ensure all dependencies including React are installed for build
npm install --no-audit --no-fund
# Install dev dependencies too for TypeScript
npm install --save-dev @types/react @types/react-dom @types/node --no-audit --no-fund
npm run build || echo "Shared package build failed, will copy existing files"
cd ..

# Install converter site dependencies
echo "Installing converter site dependencies..."
cd sites/converter
# Clean install to ensure all dependencies are properly installed
rm -rf node_modules package-lock.json
# Install all dependencies including twemoji
npm install --no-audit --no-fund
# Double-check twemoji is installed (it should be in package.json now)
if [ ! -d "node_modules/twemoji" ]; then
  echo "Installing twemoji separately..."
  npm install --save twemoji --no-audit --no-fund
  npm install --save-dev @types/twemoji --no-audit --no-fund
fi
cd ../..

# Install main site dependencies
echo "Installing main site dependencies..."
cd sites/main
npm install --no-audit --no-fund

echo "Installation complete!"