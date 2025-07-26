#!/bin/bash

# Deploy converter site to Vercel with correct settings
# Make sure you have Vercel CLI installed: npm i -g vercel

echo "Deploying converter site to Vercel..."

# Deploy with specific settings
vercel --prod \
  --build-env NODE_ENV=production \
  --env NEXT_PUBLIC_SITE_URL=https://converter.overx.ai \
  --scope your-team-name \
  --confirm

echo "Deployment complete!"