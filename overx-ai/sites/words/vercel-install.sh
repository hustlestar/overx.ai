#!/bin/bash

echo "Installing dependencies for Words site Vercel deployment..."

# Go to root directory
cd ../..

# First, install root dependencies without workspace packages
echo "Installing root dependencies..."
npm install --omit=optional --no-audit --no-fund || true

# Build the shared package first
echo "Building shared package..."
cd shared
npm install --no-audit --no-fund
npm run build
cd ..

# Install words site dependencies
echo "Installing words site dependencies..."
cd sites/words
npm install --no-audit --no-fund

echo "Installation complete for Words site!"