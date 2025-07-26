#!/bin/bash

echo "Building converter site for Vercel deployment..."

# Go to root directory
cd ../..

# Install dependencies at root level
npm install

# Build shared package first
cd shared
npm run build
cd ..

# Build converter site
cd sites/converter
npm run build

echo "Build complete!"