#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Skip shared package build - use existing dist
echo "Using pre-built shared package..."

# Ensure node_modules exists
mkdir -p node_modules/@overx-ai

# Copy shared package and ensure it has proper structure
echo "Copying shared package..."
cp -r ../../shared node_modules/@overx-ai/shared

# Ensure the shared package is recognized as a module
echo "Ensuring shared package is recognized..."
if [ ! -f node_modules/@overx-ai/shared/package.json ]; then
  echo "Warning: shared package.json not found, build may fail"
fi

# Create symlink for better resolution (in case cp doesn't work properly)
echo "Creating package symlink..."
cd node_modules/@overx-ai
ln -sf shared shared || true
cd ../..

# Debug: Check if shared package is properly installed
echo "Checking shared package installation..."
ls -la node_modules/@overx-ai/shared/

# Use Vercel-specific Next.js config
echo "Using Vercel Next.js config..."
mv next.config.js next.config.original.js
cp next.config.vercel.js next.config.js

# Build converter site
echo "Building converter site..."
npm run build

# Restore original config
mv next.config.js next.config.vercel.js
mv next.config.original.js next.config.js

echo "Build complete!"