#!/bin/bash

echo "Running Vercel custom install..."

# Remove .npmrc to prevent workspace detection
rm -f .npmrc

# Remove any parent package.json files that might interfere
if [ -f ../../package.json ]; then
  mv ../../package.json ../../package.json.backup
fi

# Backup original package.json and use Vercel-specific one
cp package.json package.original.json
cp package.vercel.json package.json

# Install dependencies without workspace references
echo "Installing dependencies..."
npm install --legacy-peer-deps --no-workspaces

# Restore parent package.json if it was moved
if [ -f ../../package.json.backup ]; then
  mv ../../package.json.backup ../../package.json
fi

# Keep the Vercel package.json for the build process
echo "Install complete!"