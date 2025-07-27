#!/bin/bash

echo "Running Vercel custom install..."

# Backup original package.json and use Vercel-specific one
cp package.json package.original.json
cp package.vercel.json package.json

# Install dependencies without workspace references
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Keep the Vercel package.json for the build process
echo "Install complete!"