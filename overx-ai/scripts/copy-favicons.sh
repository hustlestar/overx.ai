#!/bin/bash

# Script to copy favicon files from shared to all sites
# Run this after generating PNG files from the SVG

SHARED_FAVICON_DIR="shared/public/favicon"
SITES=("sites/main/public" "sites/converter/public" "sites/blog/public")

# Ensure all site public directories exist
for site in "${SITES[@]}"; do
  mkdir -p "$site"
done

# Copy all favicon files
for site in "${SITES[@]}"; do
  echo "Copying favicons to $site..."
  cp "$SHARED_FAVICON_DIR"/*.svg "$site/" 2>/dev/null || true
  cp "$SHARED_FAVICON_DIR"/*.ico "$site/" 2>/dev/null || true
  cp "$SHARED_FAVICON_DIR"/*.png "$site/" 2>/dev/null || true
  cp "$SHARED_FAVICON_DIR"/*.webmanifest "$site/" 2>/dev/null || true
done

echo "✅ Favicon files copied to all sites"