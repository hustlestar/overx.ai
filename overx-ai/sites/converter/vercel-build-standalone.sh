#!/bin/bash

echo "Building converter site for Vercel deployment (standalone mode)..."

# Skip shared package build - use existing dist
echo "Using pre-built shared package..."

# Manually copy shared package to node_modules
echo "Copying shared package..."
mkdir -p node_modules/@overx-ai
cp -r ../../shared node_modules/@overx-ai/

# Build converter site
echo "Building converter site..."
npm run build

echo "Build complete!"