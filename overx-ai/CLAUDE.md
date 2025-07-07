# CLAUDE.md - OverX.ai Development Guidelines

## Project Overview
OverX.ai is a multi-subdomain company website with **exceptional SEO** as the primary focus. Every technical decision should prioritize search engine visibility and Core Web Vitals performance.

## Project Structure
```
overx-ai/
├── sites/
│   ├── main/               # Next.js - overx.ai (port 3000)
│   ├── blog/               # Next.js - blog.overx.ai (port 3001)
│   ├── cv/                 # Static HTML - cv.overx.ai (port 3002)
│   └── products/
│       ├── product-a/      # Existing Jekyll
│       ├── product-b/      # Static HTML/CSS
│       └── product-c/      # Next.js with SSG
├── shared/                 # Shared components and utilities
├── seo-tools/             # SEO monitoring and health checks
└── scripts/               # Build and maintenance scripts
```

### Active Sites
- **Main**: http://localhost:3000 - Company homepage
- **Blog**: http://localhost:3001 - Blog platform
- **CV**: http://localhost:3002 - Professional CV/Resume (AI & Agent Development focus)

## Development Commands
```bash
# Development
npm run dev                 # Start all sites in development mode

# Building
npm run build              # Build all sites
npm run generate-sitemap   # Generate XML sitemaps
npm run check-seo         # Run SEO health audit

# Testing
npm run lint              # Run ESLint
npm run type-check        # Run TypeScript checks
```

## SEO-First Development Rules

### 1. Every Page MUST Include
- [ ] Unique, keyword-optimized title (50-60 chars)
- [ ] Unique meta description (150-160 chars)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Appropriate structured data (JSON-LD)
- [ ] Single H1 tag with target keyword
- [ ] Proper heading hierarchy (H2-H6)
- [ ] Internal links (3-5 minimum per page)
- [ ] Optimized images with descriptive alt text
- [ ] Breadcrumb navigation (except homepage)

### 2. Performance Requirements
- Lighthouse score: 95+ on all metrics
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.8s
- Cumulative Layout Shift: <0.1

### 3. Code Standards
```tsx
// Always use the shared SEO components
import { BaseSEO, Breadcrumbs, SmartLink } from '@overx-ai/shared/seo'
import { OptimizedImage, LazyLoad } from '@overx-ai/shared/performance'

// Example page implementation
export default function ProductPage() {
  const structuredData = [
    createProductSchema({
      name: 'Product Name',
      description: 'Product description',
      // ... other fields
    })
  ]

  return (
    <>
      <BaseSEO
        title="Product Name - AI Solution | OverX.ai"
        description="Product description with keywords..."
        canonical="https://overx.ai/products/product-name"
        structuredData={structuredData}
      />
      
      <Breadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products' },
        { name: 'Product Name' }
      ]} />
      
      <h1>Product Name</h1>
      {/* Content */}
    </>
  )
}
```

## Content Optimization Guidelines

### Keyword Usage
```typescript
// Always check keyword map for target keywords
import { getKeywordsForPage } from '@overx-ai/shared/content/keywords/keywordMap'

const keywords = getKeywordsForPage('/products/product-a')
// Use keywords.primary[0] as main target keyword
// Include keywords.secondary in content naturally
// Use keywords.longtail for specific sections
```

### Content Requirements
- Minimum 300 words per page (600+ preferred)
- Target keyword in first 100 words
- Keyword density: 0.5-2.5%
- Use related keywords naturally
- Include FAQ section where appropriate
- Add internal links to related content

## Image Optimization
```tsx
// Always use OptimizedImage component
<OptimizedImage
  src="/images/product.jpg"
  alt="Descriptive alt text with keyword"
  width={800}
  height={600}
  priority={isAboveFold}
/>

// For heavy components, use LazyLoad
<LazyLoad offset={200}>
  <HeavyComponent />
</LazyLoad>
```

## Structured Data Implementation
```typescript
// Main site pages
const schemas = [
  createOrganizationSchema({ /* config */ }),
  createWebSiteSchema({ /* config */ })
]

// Blog posts
const schemas = [
  createBlogPostingSchema({ /* config */ })
]

// Product pages
const schemas = [
  createProductSchema({ /* config */ }),
  createSoftwareApplicationSchema({ /* config */ })
]
```

## URL Structure Guidelines
- Use lowercase, hyphenated URLs
- Include target keyword in URL
- Keep URLs short and descriptive
- Maintain consistent structure:
  - `overx.ai/products/[product-name]`
  - `blog.overx.ai/[year]/[month]/[slug]`
  - `[product].overx.ai/features/[feature-name]`

## Pre-commit Checklist
Before committing any changes:

1. **Run SEO audit**: `npm run check-seo`
2. **Check performance**: Run Lighthouse locally
3. **Verify meta tags**: Ensure all SEO tags are present
4. **Test images**: All images have alt text
5. **Validate links**: No broken internal links
6. **Review content**: Meets minimum word count

## Common Issues and Solutions

### Missing Meta Tags
```tsx
// ❌ Wrong
export default function Page() {
  return <div>Content</div>
}

// ✅ Correct
export default function Page() {
  return (
    <>
      <BaseSEO title="..." description="..." />
      <div>Content</div>
    </>
  )
}
```

### Poor Image Implementation
```tsx
// ❌ Wrong
<img src="/image.jpg" />

// ✅ Correct
<OptimizedImage
  src="/image.jpg"
  alt="Descriptive text"
  width={800}
  height={600}
/>
```

### Incorrect Heading Structure
```tsx
// ❌ Wrong
<h1>Title 1</h1>
<h3>Subtitle</h3>  // Skipped H2
<h1>Title 2</h1>   // Multiple H1s

// ✅ Correct
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

## Monitoring and Maintenance

### Weekly Tasks
- Review SEO audit reports
- Check Core Web Vitals in Search Console
- Update content based on keyword performance
- Monitor 404 errors and fix broken links

### Monthly Tasks
- Full site SEO audit
- Update XML sitemaps
- Review and update structured data
- Analyze competitor SEO strategies

## Resources
- Keyword Map: `/shared/content/keywords/keywordMap.ts`
- SEO Components: `/shared/components/SEO/`
- Schema Generators: `/shared/lib/schema/`
- Content Optimizer: `/shared/lib/seo/contentOptimizer.ts`

## Important Notes
- **Never skip SEO requirements** - they are mandatory for all pages
- **Performance is SEO** - slow sites rank poorly
- **Content quality matters** - write for users first, optimize second
- **Test on mobile** - mobile-first indexing is critical
- **Monitor regularly** - SEO is an ongoing process

Remember: Every decision should improve SEO performance. When in doubt, choose the option that provides better search visibility and user experience.