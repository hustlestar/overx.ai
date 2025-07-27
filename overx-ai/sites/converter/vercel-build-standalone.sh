#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Skip shared package build - use existing dist
echo "Using pre-built shared package..."

# Ensure node_modules exists
mkdir -p node_modules/@overx-ai/shared

# Copy only the necessary files from shared package
echo "Copying shared package dist files..."
cp -r ../../shared/dist/* node_modules/@overx-ai/shared/
cp ../../shared/package.json node_modules/@overx-ai/shared/

# Update package.json to point to correct entry points
echo "Updating shared package.json..."
cd node_modules/@overx-ai/shared
# Create a new package.json with corrected paths
cat > package.json << 'EOF'
{
  "name": "@overx-ai/shared",
  "version": "1.0.0",
  "private": true,
  "main": "./index.js",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "default": "./index.js"
    },
    "./seo": {
      "types": "./components/SEO/index.d.ts",
      "default": "./components/SEO/index.js"
    },
    "./performance": {
      "types": "./components/Performance/index.d.ts",
      "default": "./components/Performance/index.js"
    },
    "./lib/schema": {
      "types": "./lib/schema/index.d.ts",
      "default": "./lib/schema/index.js"
    }
  }
}
EOF
cd ../../..

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