#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Ensure shared package is built
echo "Building shared package..."
cd ../../shared
npm install --legacy-peer-deps
npm run build

# Go back to converter directory
cd ../sites/converter

# Copy shared package locally to avoid workspace issues
echo "Copying shared package..."
rm -rf node_modules/@overx-ai/shared
mkdir -p node_modules/@overx-ai
cp -r ../../shared node_modules/@overx-ai/

# Install converter dependencies
echo "Installing converter dependencies..."
npm install --legacy-peer-deps --no-save @overx-ai/shared

# Build converter site
echo "Building converter site..."
npm run build

echo "Build complete!"