#!/bin/bash

echo "Building converter site for Vercel deployment..."

# Use standalone package.json for Vercel build
if [ -f "package-standalone.json" ]; then
  echo "Using standalone package.json for Vercel..."
  mv package.json package-workspace.json
  cp package-standalone.json package.json
fi

# Install dependencies locally (not as workspace)
echo "Installing dependencies..."
npm install

# Build the shared package inline
echo "Building shared package..."
cd ../../shared
npm install
npm run build
cd ../sites/converter

# Copy shared package to node_modules
echo "Copying shared package..."
rm -rf node_modules/@overx-ai/shared
mkdir -p node_modules/@overx-ai
cp -r ../../shared node_modules/@overx-ai/shared

# Build converter site  
echo "Building converter site..."
npm run build

echo "Build complete!"