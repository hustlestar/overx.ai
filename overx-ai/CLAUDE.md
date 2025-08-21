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
│   ├── converter/          # Next.js - rates.overx.ai (port 3003)
│   └── words/              # Next.js - words.overx.ai (port 3004)
├── shared/                 # Shared components and utilities
├── seo-tools/             # SEO monitoring and health checks
└── scripts/               # Build and maintenance scripts
```

### Active Sites
- **Main**: http://localhost:3000 - Company homepage
- **Blog**: http://localhost:3001 - Blog platform
- **CV**: http://localhost:3002 - Professional CV/Resume (AI & Agent Development focus)
- **Converter**: http://localhost:3003 - Currency converter with Chrome extension
- **Words**: http://localhost:3004 - Learn Words Telegram bot landing page

## Development Commands
```bash
# Development
npm run dev                 # Start all sites in development mode

# Building
npm run build              # Build main site only
npm run build:all          # Build all sites
npm run build:converter    # Build converter site
npm run build:words        # Build words site
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

## Vercel Deployment Configuration

### Converter Site (rates.overx.ai)
- **Root Directory**: `overx-ai/sites/converter`
- **Build Command**: `cd ../.. && npm run build:converter`
- **Install Command**: `cd ../.. && npm install`
- **Output Directory**: Leave blank (Next.js default)

### Main Site (overx.ai)
- **Root Directory**: `overx-ai`
- **Build Command**: `npm run build`
- **Output Directory**: `sites/main/.next`

### Words Site (words.overx.ai)
- **Root Directory**: `overx-ai/sites/words`
- **Build Command**: Default
- **Output Directory**: Default

### Important Build Notes
- The monorepo structure requires navigating to the root for installs
- Each site has its own build configuration
- Shared package must be built before site builds
- Dev dependencies must be preserved during production installs

## Recent Updates & Known Issues

### 🔄 Latest Updates (December 2024)

#### Social Media Previews & SEO Enhancements
- **EnhancedSEO Component**: All sites now use shared `EnhancedSEO` component for consistent social media previews
  - Automatic fallbacks for Open Graph and Twitter Card meta tags
  - Site-specific defaults for overx.ai, blog.overx.ai, rates.overx.ai, words.overx.ai
  - Simplified implementation - just pass title, description, and canonical URL
- **Social Preview Crawler**: Created scripts to verify all pages have proper meta tags
  - `scripts/check-social-previews.js` - Network-based crawler for production sites
  - `scripts/check-social-previews-local.js` - Local build verification
- **Preview Images**: Each site has dedicated og-image.png (1312x736) for social sharing

#### Navigation & UI Updates
- **Gradient Link Component**: Shared `GradientLink` component for consistent branding
  - Animated gradient effect with CSS animation
  - Fixed SSR compatibility issues by using standard anchor tags
  - Added animated-gradient-text styles to all sites
- **Navigation Consistency**: OverX AI links no longer open in new window
- **UI Improvements**: 
  - Removed "Exchange Rates Pro" header from converter homepage
  - Moved base currency selector to tip section with 💡 icon
  - Added spacing above provider comparison title

#### Shared Code Architecture
- **Maximum Code Reuse**: Centralized common components in shared package
  - `EnhancedSEO` - Automatic SEO with site-specific defaults
  - `GradientLink` - Consistent branded links across all sites
  - `ContactForm` - Reusable form component
  - `BlogImage` - Multi-image support with localization
- **Build Optimization**: Fixed Vercel deployment issues with shared package
  - Updated build scripts to compile shared package during deployment
  - Resolved caching issues causing React errors in production

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
- **Blog Posts** (9 total):
  1. Why Transparent Exchange Rates Matter for International Business
  2. Save Money While Traveling: Currency Converter Chrome Extension Guide
  3. Compare Currency Exchange APIs 2024: Complete Developer Guide
  4. Real-time Currency Alerts: Maximize Your Exchange Rates
  5. Cryptocurrency vs Traditional Currency Exchange: What's Best in 2024?
  6. Avoid Dynamic Currency Conversion Scams: Complete Guide
  7. Advanced Currency Math: Complex Multi-Currency Expressions
  8. How to Convert Currency Mathematical Expressions: Step-by-Step Tutorial
  9. Complete Guide to Currency Conversion with Mathematical Expressions

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

## Blog Post Content Generation Guidelines

### Multi-Image System Requirements
Every blog post MUST now include 3-4 high-quality images with proper localization:

1. **Hero Image** (type: "hero") - Main post image using premium MCP generation
2. **Featured/Infographic Image** (type: "featured") - Text-based visual using ideogram model
3. **Content Images** (type: "content") - 1-2 supporting images using standard generation

### Image Generation Using MCP Tools

**⚠️ CRITICAL SEO RULE: For images with text overlays, ALWAYS use the text generation tool with ideogram model**

#### 1. Text-Based Images (SEO PRIORITY)
```typescript
// MANDATORY for infographics, titles, or any text overlays
// This tool ensures text is readable and SEO-optimized
mcp__image-gen-mcp__generate_text_image({
  prompt: "Professional infographic with 'Key Title Text' prominently displayed. Include relevant visual elements and clear, readable typography.",
  aspect_ratio: "16:9", // Standard for blog headers
  style: "photorealistic_with_text", // Automatically uses ideogram model
  model: "ideogram-ai/ideogram-v3-turbo" // Best text rendering
})
```

#### 2. Premium Hero Images (REQUIRED)
```typescript
// Use for main post image - highest quality
mcp__image-gen-mcp__generate_premium_image({
  prompt: "Detailed, professional scene relevant to post topic",
  aspect_ratio: "16:9", // Hero images should be landscape
  model: "black-forest-labs/flux-dev", // Default premium model
  style: "photorealistic"
})
```

#### 3. Supporting Content Images
```typescript
// Standard quality for additional context images
mcp__image-gen-mcp__generate_blog_image({
  prompt: "Supporting scene or concept illustration",
  aspect_ratio: "4:3", "21:9", or "3:2", // Vary for visual interest
  style: "photorealistic"
})
```

### SEO-Critical Text Image Guidelines

#### When to Use Text Generation Tool
**MANDATORY for:**
- Blog post titles or headlines in images
- Infographics with key statistics or data
- Step-by-step process diagrams with text
- Comparison charts with labels
- Call-to-action graphics with text buttons
- Warning or alert graphics with text messages

#### Text Image SEO Best Practices
1. **Include target keywords in the image text** - helps with image SEO
2. **Make text large and readable** - improves user experience signals
3. **Use consistent branding colors** - builds brand recognition
4. **Keep text concise** - 3-7 words maximum for headlines
5. **Ensure high contrast** - text must be easily readable
6. **Test on mobile** - text should be legible on small screens

#### Example Text Image Prompts
```typescript
// For converter blog posts
"Professional fintech infographic showing 'Save 3-7% on Exchange Rates' with currency symbols, charts, and modern design"

// For API comparison posts  
"Technical comparison chart titled 'Best Currency APIs 2024' with API names, performance metrics, and developer-focused design"

// For travel money guides
"Travel-themed infographic with 'Travel Money Tips' and '5 Smart Strategies' text, passport, world map, savings icons"
```

### Blog Post Structure Requirements

#### Frontmatter Schema
```yaml
---
title: "Post Title"
excerpt: "Brief description"
coverImage: "/images/posts/legacy-image.jpg" # Legacy support
images: # NEW MULTI-IMAGE SYSTEM
  - url: "/images/posts/hero-image.png"
    alt:
      en: "English description"
      es: "Spanish description" # Optional but recommended
      ru: "Russian description" # Optional but recommended
    width: 1344
    height: 768
    type: "hero" # hero, featured, or content
    caption: # Optional
      en: "English caption"
      es: "Spanish caption"
      ru: "Russian caption"
  - url: "/images/posts/infographic.png"
    alt:
      en: "Infographic description"
    width: 1024
    height: 1024
    type: "featured"
  # ... additional content images
date: "2024-01-15T09:00:00.000Z"
# ... other metadata
---
```

### Image Requirements

#### Alt Text Standards
- **Primary (en)**: Always required, descriptive and keyword-optimized
- **Secondary (es, ru)**: Optional but highly recommended for international SEO
- Must describe the image content and context, not just keywords
- Include relevant terms naturally without keyword stuffing

#### Image Dimensions and Types
- **Hero**: 16:9 ratio (1344×768), premium quality, covers main topic
- **Featured**: 1:1 or 4:3 ratio (1024×1024), often text-heavy or infographic
- **Content**: Various ratios (4:3, 21:9, 3:2), supporting the narrative

#### File Naming Convention
```
/images/posts/[descriptive-name-with-dashes].png
```
Examples:
- `overx-ai-workspace-hero.png`
- `productivity-tools-infographic.png`
- `before-after-comparison.png`

### Content Integration Guidelines

#### Image Placement Strategy
1. **Hero image**: Immediately after title, sets the scene
2. **Featured image**: After introduction, supports main value proposition
3. **Content images**: Throughout article, break up text sections
4. **Comparison images**: Use 21:9 ratio for before/after scenarios

#### Responsive Sizing
- Images automatically resize using BlogImage component
- Hero images: Full width, 400-500px height
- Content images: Max 896px width, centered
- Featured images: Max 768px width, centered

### Localization Best Practices

#### Multi-Language Alt Text
```yaml
alt:
  en: "Primary English description with target keywords"
  es: "Descripción en español con palabras clave objetivo"
  ru: "Русское описание с целевыми ключевыми словами"
```

#### Caption Guidelines
- Use captions to provide context or call-to-action
- Keep captions concise (under 100 characters)
- Localize for international audiences when possible

### Quality Standards

#### Visual Consistency
- Use consistent color scheme (blues, purples, tech aesthetic)
- Maintain professional, modern styling across all images
- Ensure high resolution and crisp details

#### SEO Optimization
- Include target keywords naturally in alt text
- Use descriptive file names
- Optimize file sizes (aim for under 1MB per image)
- Provide proper aspect ratios for different usage contexts

### Blog Post Workflow

#### Required Steps for New Blog Posts
1. **Content Planning**: Outline 3-4 image concepts
2. **Image Generation** (SEO-Critical):
   - **MANDATORY**: Generate text/infographic images using `mcp__image-gen-mcp__generate_text_image`
   - Generate hero image using premium MCP
   - Generate 1-2 supporting images using standard MCP
3. **Image Processing**:
   - Copy images to `/sites/blog/public/images/posts/`
   - Use descriptive, SEO-friendly filenames
4. **Frontmatter Setup**:
   - Add all images to `images` array
   - Include localized alt text for each
   - Set appropriate `type` for each image
5. **Content Integration**:
   - Reference images naturally in content flow
   - Use BlogImage component for proper display
6. **Quality Check**:
   - Verify all images load correctly
   - Check responsive behavior
   - Validate alt text quality

#### Post-Generation Checklist
- [ ] 3-4 high-quality images generated and optimized
- [ ] All images have English alt text (minimum requirement)
- [ ] **MANDATORY**: At least one text/infographic image using `mcp__image-gen-mcp__generate_text_image`
- [ ] Hero image uses premium generation method
- [ ] Images properly sized and formatted (1312x736 for 16:9)
- [ ] Localized alt text for Spanish and Russian (when applicable)
- [ ] Images integrate naturally with content flow
- [ ] File names are descriptive and SEO-friendly
- [ ] All image files copied to correct public directory
- [ ] **SEO CHECK**: Text in images is readable and includes target keywords

### Example Implementation
See `/sites/blog/content/posts/en/introducing-overx-ai.md` for complete implementation example with:
- 4 diverse images (hero, infographic, 2 content)
- Full localization (en, es, ru)
- Proper aspect ratios and sizing
- Integrated captions and context