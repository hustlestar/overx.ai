# Learn Words Bot - Subdomain Site

This is the dedicated marketing and information site for Learn Words Bot, deployed at `learn.overx.ai`.

## Overview

Learn Words Bot is an AI-powered language learning Telegram bot that helps users master vocabulary in 13 languages through spaced repetition and intelligent exercises.

## Features

- 🌐 Multi-language support (English, Spanish, Russian)
- 📱 Responsive design optimized for all devices
- 🚀 Fast page loads with Next.js optimization
- 📝 Blog with language learning tips and updates
- 🎨 Modern, engaging UI with smooth animations
- 🔍 SEO optimized for language learning keywords

## Development

### Prerequisites
- Node.js 18.17.0+
- npm or yarn
- Access to the monorepo root

### Local Development

1. From the monorepo root:
   ```bash
   npm install
   npm run build:shared
   ```

2. Navigate to this directory:
   ```bash
   cd sites/learn-words
   npm install
   npm run dev
   ```

3. Open [http://localhost:3002](http://localhost:3002)

### Building for Production

From the monorepo root:
```bash
npm run build:learn
```

Or from this directory:
```bash
npm run build
```

## Project Structure

```
src/
├── pages/          # Next.js pages
│   ├── index.tsx   # Homepage
│   ├── features.tsx # Features page
│   ├── pricing.tsx  # Pricing plans
│   ├── blog/       # Blog pages
│   └── api/        # API routes
├── components/     # React components
├── lib/           # Utilities and helpers
├── content/       # Blog markdown files
└── styles/        # Global styles
```

## Content Management

### Blog Posts
Blog posts are stored as Markdown files in `src/content/blog/`. Each post should have:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
category: "tips|languages|updates|success"
excerpt: "Brief description"
readTime: "X min read"
---

Post content in Markdown...
```

### Translations
Translations are managed in `public/locales/{locale}/common.json`.

## Deployment

This site is deployed to Vercel as a separate project:

1. **Domain**: `learn.overx.ai`
2. **Framework**: Next.js
3. **Build Command**: `cd ../.. && npm run build:shared && cd sites/learn-words && npm run build`
4. **Output Directory**: `.next`

### Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://learn.overx.ai
NEXT_PUBLIC_MAIN_SITE_URL=https://overx.ai
```

## SEO Optimization

- Structured data for articles and organization
- Dynamic sitemap generation at `/sitemap.xml`
- Optimized meta tags for each page
- Open Graph and Twitter Card support
- Multilingual SEO with hreflang tags

## Performance

- Lazy loading for images and components
- Optimized bundle size with dynamic imports
- Edge caching for static assets
- ISR (Incremental Static Regeneration) for blog posts

## Analytics

The site includes:
- Google Analytics (if configured)
- Core Web Vitals monitoring
- User interaction tracking
- Conversion tracking for bot signups

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally and on preview deployments
4. Submit a pull request

## Support

For issues or questions:
- Check the main project documentation
- Contact the development team
- Review Vercel deployment logs