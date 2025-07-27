#!/bin/bash

echo "Building converter site for Vercel deployment..."

# Go to root directory
cd ../..

# Install dependencies at root level using --legacy-peer-deps to handle workspace issues
npm install --legacy-peer-deps

# Build shared package first
cd shared
npm install --legacy-peer-deps
npm run build
cd ..

# Build converter site
cd sites/converter
npm install --legacy-peer-deps
npm run build

echo "Build complete!"