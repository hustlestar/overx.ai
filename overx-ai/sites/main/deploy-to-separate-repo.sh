#!/bin/bash

# Configuration
REPO_URL=${1:-"https://github.com/hustlestar/overx-ai-site.git"}
BRANCH=${2:-"main"}

echo "Deploying main site to separate repository..."
echo "Repository: $REPO_URL"
echo "Branch: $BRANCH"

# Build the site
echo "Building static site..."
npm run build:static
npm run export

# Check if build was successful
if [ ! -d "out" ]; then
  echo "Error: Build failed, 'out' directory not found"
  exit 1
fi

# Navigate to output directory
cd out

# Initialize git repository
echo "Initializing git repository..."
git init
git add .
git commit -m "Deploy site - $(date '+%Y-%m-%d %H:%M:%S')"

# Add remote and push
echo "Pushing to repository..."
git remote add origin "$REPO_URL"
git push -f origin master:$BRANCH

echo "Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to the repository settings"
echo "2. Enable GitHub Pages from the $BRANCH branch"
echo "3. Add custom domain: overx.ai"