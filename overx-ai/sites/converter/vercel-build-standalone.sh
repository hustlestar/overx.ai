#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Debug: Show current directory structure
echo "Current directory: $(pwd)"
echo "Checking for shared package..."
ls -la ../..
ls -la ../../shared || echo "Shared directory not found at ../../shared"

# Clean old build artifacts
echo "Cleaning old build artifacts..."
rm -rf node_modules/@overx-ai/shared
rm -rf .next

# Dependencies should already be installed by vercel-install.sh
# DO NOT run npm install here as it breaks the dependency tree
echo "Checking installed dependencies..."
# Check for TypeScript types
if [ -d "node_modules/@types/node" ]; then
  echo "✓ @types/node is installed"
else
  echo "✗ ERROR: @types/node is NOT installed"
fi

# Check for twemoji
if [ -d "node_modules/twemoji" ]; then
  echo "✓ twemoji is installed"
else
  echo "✗ ERROR: twemoji is NOT installed - installing now"
  npm install twemoji @types/twemoji --no-audit --no-fund
fi

# Build shared package first
echo "Building shared package..."
cd ../../shared
rm -rf dist
# Ensure React types are installed for the build
npm install --save-dev @types/react @types/react-dom @types/node --no-audit --no-fund
npm run build || echo "Warning: Shared package build failed"
cd ../sites/converter

# Ensure node_modules exists
mkdir -p node_modules/@overx-ai/shared

# Find the correct path to shared package
SHARED_PATH=""
if [ -d "../../shared/dist" ]; then
  SHARED_PATH="../../shared"
elif [ -d "../../../overx-ai/shared/dist" ]; then
  SHARED_PATH="../../../overx-ai/shared"
elif [ -d "../../../../shared/dist" ]; then
  SHARED_PATH="../../../../shared"
else
  echo "ERROR: Could not find shared package dist folder"
  echo "Trying to find shared folder..."
  find ../.. -name "shared" -type d 2>/dev/null | head -5
fi

if [ -n "$SHARED_PATH" ] && [ -d "$SHARED_PATH/dist" ]; then
  echo "Found shared package at: $SHARED_PATH"
  # Copy only the compiled JS/d.ts files from shared package
  echo "Copying shared package dist files (JS and d.ts only)..."
  # Copy all JS files and d.ts files, but exclude source TS files
  find $SHARED_PATH/dist -name "*.js" -o -name "*.d.ts" -o -name "*.js.map" -o -name "*.d.ts.map" -o -name "*.mjs" -o -name "*.mjs.map" -o -name "*.d.mts" | while read file; do
    # Get relative path from dist folder
    rel_path=${file#$SHARED_PATH/dist/}
    # Create directory structure
    mkdir -p "node_modules/@overx-ai/shared/$(dirname "$rel_path")"
    # Copy file
    cp "$file" "node_modules/@overx-ai/shared/$rel_path"
  done
  
  # Also copy any non-TypeScript source files that might be needed
  find $SHARED_PATH -maxdepth 1 -name "*.json" -o -name "*.md" | while read file; do
    cp "$file" "node_modules/@overx-ai/shared/"
  done
  cp $SHARED_PATH/package.json node_modules/@overx-ai/shared/temp-package.json || true
else
  echo "ERROR: Could not copy shared package files"
fi

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