# CLAUDE.md - OverX AI Development Guidelines

## Project Overview
OverX AI is a multi-subdomain company website with **exceptional SEO** as the primary focus. Every technical decision should prioritize search engine visibility and Core Web Vitals performance.

## Project Structure
```
overx-ai/
├── sites/
│   ├── main/               # Next.js - overx.ai (port 3000)
│   ├── blog/               # Next.js - blog.overx.ai (port 3001)
│   ├── cv/                 # Static HTML - cv.overx.ai (port 3002)
│   ├── converter/          # Next.js - converter.overx.ai (port 3003)
│   ├── learn-words/        # Next.js - learn.overx.ai (port 3002)
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
- **Converter**: http://localhost:3003 - Currency converter with Chrome extension
- **Learn Words**: http://localhost:3002 - Language learning platform

## Development Commands
```bash
# Development
npm run dev                 # Start all sites in development mode

# Building
npm run build              # Build main site only
npm run build:all          # Build all sites
npm run build:converter    # Build converter site
npm run build:learn        # Build learn-words site
npm run generate-sitemap   # Generate XML sitemaps for all sites
npm run check-seo         # Run SEO health audit

# Testing
npm run lint              # Run ESLint
npm run type-check        # Run TypeScript checks

# Known Issues & Fixes
# If you encounter "workspace:*" dependency errors:
# - Check package.json files for "workspace:*" and replace with "*"
# - Run npm install from root directory
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
        title="Product Name - AI Solution | OverX AI"
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

## Recent Updates & Known Issues

### Theme System (Light/Dark Mode)
- **Configuration**: Tailwind must have `darkMode: 'class'` in config
- **Theme Classes**: Use `dark:` prefix for dark mode, `light:` for light mode overrides
- **Common Issues**:
  - Missing `darkMode: 'class'` in tailwind.config.js causes light: variants to not work
  - Hydration errors with client-only components (wrap in mounted check)
  - Theme persistence across subdomains using cookies with domain `.overx.ai`

### Cross-Subdomain Synchronization
- **Language Sync**: Implemented via cookies with `.overx.ai` domain
- **Theme Sync**: Uses localStorage + cookies for persistence
- **Implementation**: See `useLanguageSync` and `useTheme` hooks

### Converter Site Blog System
- **Structure**: Blog content separated into individual files for maintainability
  - Metadata: `/sites/converter/src/content/blog/metadata.ts`
  - Content: `/sites/converter/src/content/blog/[slug].ts`
- **Features**:
  - Full localization (en, es, ru)
  - Cross-linking based on tags
  - SEO optimized with structured data
  - Dynamic sitemap generation
- **Blog Posts** (6 total):
  1. Why Transparent Exchange Rates Matter for International Business
  2. Save Money While Traveling: Currency Converter Chrome Extension Guide
  3. Compare Currency Exchange APIs 2024: Complete Developer Guide
  4. Real-time Currency Alerts: Maximize Your Exchange Rates
  5. Cryptocurrency vs Traditional Currency Exchange: What's Best in 2024?
  6. Avoid Dynamic Currency Conversion Scams: Complete Guide

### Sitemap Generation
- **Custom Script**: `scripts/generate-converter-sitemap.js` for dynamic blog routes
- **Coverage**: Main, Blog, and Converter sites
- **Localization**: Generates URLs for all locales (en, es, ru)

### Build & Deployment
- **Shared Package**: Must be built before site builds
- **Monorepo Structure**: Uses npm workspaces with Turbo
- **Dependencies**: Use "*" instead of "workspace:*" for shared dependencies

### Service Worker
- **Cache Management**: Remove non-existent resources from cache list
- **Redirect Handling**: Use `redirect: 'follow'` in fetch options

### Common Fixes Applied
1. **Tailwind Light Mode**: Added `darkMode: 'class'` configuration
2. **Form Reusability**: Created shared `ContactForm` component
3. **Blog Content**: Escaped backticks in markdown code blocks
4. **Dependencies**: Fixed @tanstack/react-table installation
5. **Workspace Protocol**: Replaced "workspace:*" with "*"

### Testing Checklist
- [ ] Test light/dark mode switching on all pages
- [ ] Verify cross-subdomain language sync
- [ ] Check all blog posts render correctly in all languages
- [ ] Validate sitemap includes all pages and locales
- [ ] Run build for all sites to ensure no errors

### Post-Development Checklist
When completing any task, always run:
1. `npm run lint` - Check for linting errors
2. `npm run type-check` - Verify TypeScript types
3. `npm run build:converter` (or relevant build command) - Ensure build succeeds

**Important**: If lint/typecheck commands are not found, ask the user for the correct commands and suggest adding them to this document for future reference.