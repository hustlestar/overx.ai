# Deployment Guide for OverX AI Subdomains

## Overview
This monorepo contains multiple sites that are deployed to different subdomains:
- Main site: `overx.ai` (sites/main)
- Learn Words Bot: `learn.overx.ai` (sites/learn-words)
- CV Site: `cv.overx.ai` (sites/cv)
- Blog: `blog.overx.ai` (sites/blog)

## Deployment Setup

### Prerequisites
1. Vercel account with access to the overx.ai domain
2. Node.js 18.17.0 or higher
3. npm or yarn package manager

### Initial Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Link the project to Vercel**
   ```bash
   vercel link
   ```

### Deploying the Main Site

1. Navigate to the root directory
2. Deploy the main site:
   ```bash
   vercel --prod
   ```

### Deploying Subdomain Sites

Each subdomain site needs to be deployed as a separate Vercel project.

#### Learn Words Bot (learn.overx.ai)

1. **Create a new Vercel project**
   ```bash
   cd sites/learn-words
   vercel
   ```

2. **Configure the project**
   - Project name: `overx-ai-learn-words`
   - Framework: Next.js
   - Build command: `cd ../.. && npm run build:shared && cd sites/learn-words && npm run build`
   - Output directory: `.next`
   - Install command: `cd ../.. && npm install && cd sites/learn-words && npm install`

3. **Add custom domain**
   - Go to Vercel Dashboard > Project Settings > Domains
   - Add `learn.overx.ai`
   - Configure DNS records as instructed

4. **Environment Variables**
   Add these environment variables in Vercel:
   ```
   NEXT_PUBLIC_SITE_URL=https://learn.overx.ai
   NEXT_PUBLIC_MAIN_SITE_URL=https://overx.ai
   ```

### DNS Configuration

For each subdomain, add a CNAME record pointing to:
- `cname.vercel-dns.com`

Or if using Vercel DNS, it will be configured automatically.

### Deployment Scripts

Add these scripts to the root `package.json` for easier deployment:

```json
{
  "scripts": {
    "deploy:main": "vercel --prod",
    "deploy:learn": "cd sites/learn-words && vercel --prod",
    "deploy:all": "npm run deploy:main && npm run deploy:learn"
  }
}
```

### Continuous Deployment

1. **GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Each push to `main` branch will trigger automatic deployments

2. **Branch Previews**
   - Pull requests automatically create preview deployments
   - Preview URLs follow pattern: `<project>-<branch>-<team>.vercel.app`

### Shared Components

The `shared` package is built before each site deployment:
1. Shared components are in `/shared`
2. Build command includes: `npm run build:shared`
3. Sites import from `@overx-ai/shared`

### Monitoring

1. **Vercel Analytics**
   - Enable Web Analytics in project settings
   - Monitor performance and user metrics

2. **Error Tracking**
   - Set up error tracking with Sentry or similar
   - Add error boundary components

### Troubleshooting

**Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are installed
- Verify environment variables are set

**Domain Issues**
- Verify DNS propagation (can take up to 48 hours)
- Check SSL certificate status in Vercel dashboard
- Ensure domain ownership verification

**Performance Issues**
- Enable ISR (Incremental Static Regeneration) for dynamic content
- Optimize images with Next.js Image component
- Use Vercel Edge Functions for API routes

### Best Practices

1. **Environment Variables**
   - Never commit sensitive data
   - Use Vercel environment variables
   - Different values for preview/production

2. **Caching**
   - Configure proper cache headers
   - Use ISR for blog posts
   - Implement stale-while-revalidate

3. **SEO**
   - Ensure proper meta tags on all pages
   - Submit sitemaps to search engines
   - Monitor Core Web Vitals

4. **Security**
   - Enable security headers
   - Use Content Security Policy
   - Regular dependency updates

## Support

For deployment issues:
- Check Vercel status page
- Review Vercel documentation
- Contact team lead for access issues