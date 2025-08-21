#!/bin/bash

echo "Installing dependencies for Vercel deployment..."

# First, install root dependencies without workspace packages
echo "Installing root dependencies..."
npm install --omit=optional --no-audit --no-fund || true

# Build the shared package first
echo "Building shared package..."
cd shared
npm install --no-audit --no-fund
npm run build
cd ..

# Install converter site dependencies
echo "Installing converter site dependencies..."
cd sites/converter
# Clean install to ensure all dependencies are properly installed
rm -rf node_modules package-lock.json
npm install --no-audit --no-fund
cd ../..

# Install main site dependencies
echo "Installing main site dependencies..."
cd sites/main
npm install --no-audit --no-fund

echo "Installation complete!"