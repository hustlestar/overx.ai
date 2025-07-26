# Converter Site Deployment Guide for Vercel

## Prerequisites
1. Vercel account with access to your domain
2. Domain `overx.ai` configured in Vercel
3. Git repository connected to Vercel

## Deployment Steps

### 1. Initial Setup in Vercel Dashboard

1. Create a new project in Vercel
2. Import your Git repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `overx-ai/sites/converter`
   - **Build Command**: `cd ../.. && npm run build:converter`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && npm install`

### 2. Environment Variables

Add these environment variables in Vercel dashboard:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://converter.overx.ai
```

### 3. Domain Configuration

1. Go to Project Settings → Domains
2. Add `converter.overx.ai`
3. Configure DNS:
   - Add CNAME record: `converter` → `cname.vercel-dns.com`
   - Or use Vercel nameservers for automatic configuration

### 4. Build Configuration

The `vercel.json` file includes:
- Custom build commands for monorepo structure
- SEO-optimized headers
- Cache control for static assets
- URL rewrites for sitemap and robots.txt
- Clean URLs configuration

### 5. Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy with specific configuration
vercel --prod --scope your-team-name
```

### 6. Post-Deployment Checklist

- [ ] Verify subdomain is accessible at https://converter.overx.ai
- [ ] Check SSL certificate is active
- [ ] Test all pages load correctly
- [ ] Verify sitemap.xml and robots.txt
- [ ] Run Lighthouse audit
- [ ] Check SEO meta tags
- [ ] Test i18n functionality
- [ ] Monitor Core Web Vitals

### 7. Continuous Deployment

For automatic deployments:
1. Connect Git repository to Vercel
2. Configure branch deployments:
   - Production: `main` or `master` branch
   - Preview: All other branches
3. Set up deployment notifications

### 8. Performance Optimization

The configuration includes:
- Edge network deployment (iad1 region)
- Optimized caching headers
- Static asset optimization
- Function duration limits

### 9. Monitoring

After deployment:
1. Monitor Analytics in Vercel dashboard
2. Check Web Vitals metrics
3. Set up alerts for downtime
4. Review build logs for optimization opportunities

## Troubleshooting

### Build Fails
- Check `npm run build:converter` works locally
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run type-check`

### Domain Not Working
- Verify DNS propagation (can take up to 48 hours)
- Check domain configuration in Vercel dashboard
- Ensure SSL certificate is provisioned

### Performance Issues
- Review bundle size in Vercel dashboard
- Check for large images or unoptimized assets
- Enable Vercel Analytics for detailed insights