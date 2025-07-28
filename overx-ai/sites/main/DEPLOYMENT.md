# Main Site Deployment Guide

This guide covers deploying the main OverX AI website as a static site from a monorepo structure.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- GitHub repository with Actions enabled (for GitHub Pages)

## Building for Production

### Static Export

```bash
# Install dependencies
npm install

# Build for static export
npm run build:static

# Export static files
npm run export
```

This creates an `out` directory with all static files.

## Deployment Options

### 1. GitHub Pages (Monorepo)

Since this is a monorepo, you have several options:

#### Option A: GitHub Actions (Recommended)
The repository includes a GitHub Action that automatically deploys the main site when changes are pushed.

**Setup:**
1. Go to repository Settings > Pages
2. Source: GitHub Actions
3. Custom domain: overx.ai
4. The workflow will automatically run on pushes to master

**Manual trigger:**
```bash
# Go to Actions tab in GitHub and manually run "Deploy Main Site to GitHub Pages"
```

#### Option B: Deploy to separate repository
1. Create a new repository (e.g., `overx-ai-site`)
2. Build locally:
   ```bash
   cd overx-ai/sites/main
   npm run build:static && npm run export
   ```
3. Push the `out` directory to the new repo:
   ```bash
   cd out
   git init
   git add .
   git commit -m "Deploy site"
   git remote add origin https://github.com/yourusername/overx-ai-site.git
   git push -f origin master
   ```

#### Option C: Use gh-pages branch in monorepo
```bash
cd overx-ai/sites/main
npm run build:static && npm run export
npx gh-pages -d out --dest . --repo https://github.com/yourusername/overx.ai.git
```

### 2. Cloudflare Pages

```bash
# Run the deployment script
./deploy-cloudflare-pages.sh
```

**Cloudflare Pages Settings:**
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build:static && npm run export`
   - Build output directory: `out`
   - Environment variables: None required

### 3. Vercel

**Vercel Settings:**
1. Import GitHub repository
2. Framework Preset: Next.js
3. Build Command: `npm run build:static && npm run export`
4. Output Directory: `out`

### 4. Netlify

**Netlify Settings:**
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build:static && npm run export`
   - Publish directory: `out`

## Environment Variables

No environment variables are required for the static build. All configuration is done at build time.

## Custom Domain Setup

### For GitHub Pages:
1. Create a `CNAME` file in the root with your domain:
   ```
   overx.ai
   ```
2. Configure DNS:
   - A record: 185.199.108.153
   - A record: 185.199.109.153
   - A record: 185.199.110.153
   - A record: 185.199.111.153
   - CNAME: www -> [username].github.io

### For Cloudflare Pages:
1. Add custom domain in Cloudflare Pages settings
2. DNS records are automatically configured

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check that navigation works
- [ ] Test language switching
- [ ] Verify external links (blog, converter, etc.)
- [ ] Check SEO meta tags
- [ ] Test on mobile devices
- [ ] Verify HTTPS is working
- [ ] Check performance with Lighthouse

## Troubleshooting

### Images not loading
- Ensure images are in the `public` directory
- Check that image paths start with `/`

### 404 errors on refresh
- For GitHub Pages: Ensure `.nojekyll` file exists
- For other platforms: Check redirect rules

### Language switching issues
- Static export doesn't support i18n routing
- Consider client-side language switching or separate builds per language

## Performance Optimization

The static build is already optimized with:
- Minified JavaScript and CSS
- Optimized images
- Proper caching headers
- Compressed assets

## Monitoring

After deployment:
1. Set up Google Analytics
2. Configure Google Search Console
3. Monitor Core Web Vitals
4. Set up uptime monitoring