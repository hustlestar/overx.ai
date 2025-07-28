#!/bin/bash

echo "Building main site for GitHub Pages deployment..."

# Build the static site
npm run build:static

# Export the site
npm run export

# Create a .nojekyll file to prevent GitHub from processing the site
touch out/.nojekyll

# Copy CNAME file if it exists
if [ -f CNAME ]; then
  cp CNAME out/
fi

echo "Build complete! The 'out' directory is ready for deployment to GitHub Pages."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Create a gh-pages branch: git checkout -b gh-pages"
echo "2. Copy the out directory contents: cp -r out/* ."
echo "3. Commit and push: git add . && git commit -m 'Deploy to GitHub Pages' && git push origin gh-pages"
echo ""
echo "Or use gh-pages npm package:"
echo "npx gh-pages -d out"