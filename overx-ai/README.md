# OverX.ai - SEO-Optimized Multi-Subdomain Website

A high-performance, SEO-first multi-subdomain website built with Next.js, featuring comprehensive SEO optimization, structured data, and performance monitoring.

## 🚀 Features

### SEO Excellence
- **Comprehensive Meta Tags**: Dynamic title, description, Open Graph, and Twitter Cards
- **Structured Data**: Full schema.org implementation for Organization, Article, Product, and more
- **XML Sitemaps**: Auto-generated sitemaps with proper indexing
- **Performance Optimization**: Core Web Vitals optimization, image optimization, lazy loading
- **Content Optimization**: Built-in SEO analysis tools and keyword mapping

### Architecture
- **Monorepo Structure**: Managed with npm workspaces and Turborepo
- **Shared Components**: Reusable SEO and performance components
- **Multi-subdomain**: Support for main site, blog, and product subdomains
- **TypeScript**: Full type safety across the entire codebase

## 📁 Project Structure

```
overx-ai/
├── sites/
│   ├── main/          # Main website (overx.ai)
│   ├── blog/          # Blog subdomain (blog.overx.ai)
│   ├── cv/            # CV subdomain (cv.overx.ai)
│   └── products/      # Product subdomains
├── shared/            # Shared components and utilities
│   ├── components/
│   │   ├── SEO/       # SEO components
│   │   └── Performance/ # Performance components
│   └── lib/
│       ├── schema/    # Structured data generators
│       └── sitemap/   # Sitemap utilities
├── seo-tools/         # SEO monitoring and analysis
└── scripts/           # Build and maintenance scripts
```

## 🛠️ Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Development**
```bash
npm run dev
```

3. **Build**
```bash
npm run build
```

4. **SEO Audit**
```bash
npm run check-seo
```

## 📊 SEO Components

### BaseSEO Component
```tsx
<BaseSEO
  title="Page Title"
  description="Page description"
  canonical="https://overx.ai/page"
  openGraph={{
    type: 'website',
    title: 'OG Title',
    description: 'OG Description',
    image: { url: 'https://overx.ai/og.jpg' }
  }}
  structuredData={[organizationSchema, websiteSchema]}
/>
```

### Structured Data
```tsx
const schema = createOrganizationSchema({
  name: 'OverX.ai',
  url: 'https://overx.ai',
  logo: 'https://overx.ai/logo.png',
  sameAs: ['https://twitter.com/overxai']
})
```

### Performance Components
```tsx
// Optimized images
<OptimizedImage src="/image.jpg" alt="Description" width={800} height={600} />

// Lazy loading
<LazyLoad offset={100}>
  <HeavyComponent />
</LazyLoad>
```

## 🔍 SEO Best Practices

### Page Requirements
Every page must include:
- ✅ Unique title (50-60 characters)
- ✅ Unique meta description (150-160 characters)
- ✅ Canonical URL
- ✅ Open Graph tags
- ✅ Structured data
- ✅ Single H1 tag
- ✅ Proper heading hierarchy
- ✅ Optimized images with alt text

### Performance Targets
- Lighthouse Score: 95+
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.8s
- Cumulative Layout Shift: <0.1

## 📈 Monitoring

### SEO Health Check
Run automated SEO audits:
```bash
npm run check-seo
```

This will check for:
- Missing meta tags
- Heading structure issues
- Missing alt text
- Broken internal links
- Missing structured data

### Content Optimization
Use the ContentOptimizer utility:
```tsx
const optimizer = new ContentOptimizer()
const analysis = optimizer.analyzeContent(content, 'target keyword')
```

## 🚀 Deployment

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://overx.ai
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build Commands
```bash
# Build all sites
npm run build

# Generate sitemaps
npm run generate-sitemap

# Run SEO audit
npm run check-seo
```

## 📝 Adding New Pages

1. Create the page component with SEO tags
2. Add to sitemap configuration
3. Update keyword mapping
4. Run SEO audit to verify

Example:
```tsx
export default function NewPage() {
  return (
    <>
      <BaseSEO
        title="New Page Title"
        description="New page description"
        canonical="https://overx.ai/new-page"
      />
      <h1>New Page</h1>
      {/* Content */}
    </>
  )
}
```

## 🔧 Maintenance

### Regular Tasks
- Review SEO audit reports weekly
- Update sitemaps after content changes
- Monitor Core Web Vitals
- Update structured data as needed
- Review and update keyword mappings

### Performance Optimization
- Use `npm run analyze` to check bundle sizes
- Implement code splitting for large components
- Use dynamic imports for below-fold content
- Optimize images before uploading

## 📚 Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## 🤝 Contributing

1. Run SEO audit before committing
2. Ensure all pages pass SEO requirements
3. Test Core Web Vitals locally
4. Update documentation for new features

---

Built with ❤️ for maximum SEO performance