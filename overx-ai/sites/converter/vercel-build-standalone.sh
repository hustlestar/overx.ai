#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Build shared package first
echo "Building shared package..."
cd ../../shared
npm install --legacy-peer-deps --no-workspaces
npm run build

# Go back to converter directory
cd ../sites/converter

# Manually copy shared package to node_modules
echo "Copying shared package..."
mkdir -p node_modules/@overx-ai
cp -r ../../shared node_modules/@overx-ai/

# Ensure shared package is treated as installed
echo "Updating package-lock..."
touch node_modules/@overx-ai/shared/package.json

# Build converter site
echo "Building converter site..."
npm run build

echo "Build complete!"