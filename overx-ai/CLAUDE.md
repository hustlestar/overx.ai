# OverX.ai Project Documentation

## Project Structure

This is a monorepo containing multiple Next.js applications for the OverX.ai ecosystem:

- **sites/main**: Main marketing site (overx.ai)
- **sites/converter**: Currency converter app (rates.overx.ai) 
- **sites/words**: Word learning app (words.overx.ai)
- **sites/blog**: Blog platform (blog.overx.ai)
- **shared**: Shared components and utilities

## Vercel Deployment Configuration ⚠️ CRITICAL

Each site needs to be deployed as a **separate Vercel project** with specific configurations:

### ⚠️ IMPORTANT: NO ROOT vercel.json
**Never create a vercel.json file at the repository root** - it will override ALL project settings and cause sites to display wrong content.

### Converter Site (rates.overx.ai) ✅ WORKING
Configure in Vercel Dashboard:
- **Root Directory**: Leave empty (builds from monorepo root)
- **Build Command**: Override with `npm install && npm run build:converter`
- **Output Directory**: Override with `sites/converter/.next`
- **Framework Preset**: Next.js

### Main Site (overx.ai) ✅ WORKING
Configure in Vercel Dashboard:
- **Root Directory**: Leave empty (builds from monorepo root)
- **Build Command**: Override with `npm install && cd sites/main && npm run build`
- **Output Directory**: Override with `sites/main/.next`
- **Framework Preset**: Next.js

### Words Site (words.overx.ai)
Configure in Vercel Dashboard:
- **Root Directory**: `sites/words`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Framework Preset**: Next.js

### Blog (blog.overx.ai)
Configure in Vercel Dashboard:
- **Root Directory**: `sites/blog`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Framework Preset**: Next.js

## Vercel Build Troubleshooting

### Common Issues and Fixes

1. **Wrong site showing on domain**
   - Check for and remove any `vercel.json` at repository root
   - Verify each Vercel project has correct settings in dashboard

2. **Module not found errors during build**
   - Move dependencies from `devDependencies` to `dependencies`
   - Vercel doesn't install devDependencies in production builds

3. **Shared package build failures**
   - Ensure `@types/node` and other type definitions are in production dependencies
   - The shared package needs all build dependencies as regular dependencies

4. **React Query DevTools errors in production**
   ```typescript
   // Use conditional imports for dev-only tools
   let ReactQueryDevtools: any = () => null
   if (process.env.NODE_ENV === 'development') {
     ReactQueryDevtools = require('@tanstack/react-query-devtools').ReactQueryDevtools
   }
   ```

## Cross-Platform Emoji Display (Twemoji Solution)

### Problem
Windows doesn't support flag emojis natively, showing two-letter country codes instead. This affects the currency converter's flag display.

### Solution: Direct Twemoji SVG URLs
Instead of runtime DOM manipulation (which causes flashing), generate Twemoji CDN URLs directly:

```typescript
// Convert emoji to Twemoji URL
function emojiToCodepoints(emoji: string): string {
  const codepoints: string[] = []
  for (let i = 0; i < emoji.length; i++) {
    const code = emoji.codePointAt(i)
    if (code) {
      // Skip variation selectors and zero-width joiners
      if (code !== 0xfe0f && code !== 0x200d) {
        codepoints.push(code.toString(16))
      }
      // Handle surrogate pairs
      if (code > 0xffff) i++
    }
  }
  return codepoints.join('-')
}

// Use Next.js Image component with Twemoji CDN
const codepoints = emojiToCodepoints(flagEmoji)
const imageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`

<Image
  src={imageUrl}
  alt={`${currencyCode} flag`}
  width={20}
  height={20}
  unoptimized // SVGs don't need optimization
/>
```

### Configuration Required
Add Twemoji CDN to Next.js allowed image domains:

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.jsdelivr.net'], // Allow Twemoji CDN
  }
}
```

### Benefits
- No flash of unstyled content (FOUC)
- Consistent emoji display across all platforms
- No runtime DOM manipulation
- Lightweight SVG images
- Automatic fallback to native emoji on error

### Package Dependencies
```json
{
  "dependencies": {
    "twemoji": "^14.0.2"  // Only for type definitions, not runtime
  }
}
```

## Build Scripts

Root package.json scripts:
```json
{
  "scripts": {
    "build:main": "cd sites/main && npm run build",
    "build:converter": "cd sites/converter && npm run build",
    "build:words": "cd sites/words && npm run build",
    "build:blog": "cd sites/blog && npm run build"
  }
}
```

## Development Commands

```bash
# Install all dependencies
npm install

# Run converter site locally
cd sites/converter && npm run dev

# Build for production
npm run build:converter

# Type checking
cd sites/converter && npm run type-check

# Linting
cd sites/converter && npm run lint
```

## Important Notes

1. **Always run type checking and linting** before committing code
2. **Never commit secrets or API keys** to the repository
3. **Test builds locally** before pushing to ensure Vercel deployment success
4. **Keep dependencies updated** but test thoroughly after updates
5. **Use the shared package** for common components to maintain consistency

## Image Optimization with MCP Tools

### Overview
The project now includes MCP (Model Context Protocol) image optimization tools that can automatically optimize images for web deployment, create WebP variants, and generate responsive image sizes.

### Available Image Optimization Tools

#### 1. Optimize Single Image
Optimizes an existing image for web deployment with WebP conversion and responsive variants.

```typescript
mcp__image-gen-mcp__optimize_existing_image({
  image_path: "/path/to/image.png",
  create_webp: true,           // Creates WebP variant (default: true)
  create_responsive: true,     // Creates responsive sizes (default: false)
  max_width: 2048,             // Maximum width in pixels (optional)
  max_height: 2048             // Maximum height in pixels (optional)
})
```

**Features:**
- Automatically creates WebP version (typically 85-92% smaller)
- Generates responsive variants (320w, 640w, 1024w) when enabled
- Preserves original while creating optimized versions
- Returns detailed size reduction statistics

**Example Output:**
- Original: `image.png` (800KB)
- WebP: `image.webp` (70KB) - 91% reduction
- Responsive: `image_320w.png`, `image_640w.png`, `image_1024w.png`

#### 2. Batch Optimize Images
Optimizes all images in a directory for web deployment.

```typescript
mcp__image-gen-mcp__batch_optimize_images({
  directory: "/sites/converter/public/images",  // Target directory
  create_webp: true,                            // Create WebP variants
  create_responsive: false                      // Create responsive variants
})
```

**Features:**
- Processes all PNG, JPG, JPEG images in directory
- Skips already optimized files
- Provides batch statistics and individual results
- Ideal for optimizing entire image folders

### Image Optimization Best Practices

#### When to Use Image Optimization

1. **After Image Generation**: Always optimize AI-generated images before deployment
2. **Before Deployment**: Run batch optimization on public/images directories
3. **For Blog Posts**: Optimize hero images and content images for faster loading
4. **For Product Images**: Create responsive variants for different screen sizes

#### Optimization Workflow

```bash
# 1. Generate image using MCP
mcp__image-gen-mcp__generate_blog_image(...)

# 2. Optimize the generated image
mcp__image-gen-mcp__optimize_existing_image({
  image_path: "/path/to/generated-image.png",
  create_webp: true,
  create_responsive: true
})

# 3. Use optimized versions in code
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image_320w.png 320w, image_640w.png 640w, image_1024w.png 1024w">
  <img src="image.png" alt="Description">
</picture>
```

#### Batch Optimization for Deployment

```bash
# Optimize all images in a site before deployment
mcp__image-gen-mcp__batch_optimize_images({
  directory: "/sites/main/public/images",
  create_webp: true,
  create_responsive: false  # Set to true for hero images
})
```

### Performance Benefits

#### WebP Format Advantages
- **85-92% smaller** file sizes compared to PNG
- **Better quality** at smaller sizes than JPEG
- **Supported** by all modern browsers
- **Fallback** to original format for older browsers

#### Responsive Images Benefits
- **Faster mobile loading** with appropriate sizes
- **Bandwidth savings** for users
- **Better Core Web Vitals** scores
- **Improved SEO** from faster page loads

### Integration with Next.js

#### Using Optimized Images in Next.js

```tsx
import Image from 'next/image'

// For WebP with fallback
export function OptimizedImage({ src, alt }) {
  const webpSrc = src.replace(/\.(png|jpg)$/, '.webp')
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image 
        src={src} 
        alt={alt}
        width={1200}
        height={600}
        loading="lazy"
      />
    </picture>
  )
}

// For responsive images
export function ResponsiveImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      width={1200}
      height={600}
      responsive
    />
  )
}
```

### SEO Impact of Image Optimization

#### Core Web Vitals Improvements
- **LCP (Largest Contentful Paint)**: Faster hero image loading
- **CLS (Cumulative Layout Shift)**: Proper dimensions prevent shifts
- **FID (First Input Delay)**: Smaller images = faster interactivity

#### SEO Best Practices
1. **Always create WebP variants** for all images
2. **Use responsive images** for hero/banner images
3. **Optimize before deployment** to ensure fast initial loads
4. **Include proper alt text** for accessibility and SEO
5. **Use descriptive filenames** (e.g., `currency-converter-dashboard.webp`)

### Monitoring Image Performance

#### Check Optimization Results
```bash
# View size reductions
ls -lah sites/converter/public/images/posts/
# Original: image.png (800KB)
# Optimized: image.webp (70KB)
```

#### Lighthouse Metrics
- Run Lighthouse after optimization
- Target: 90+ Performance score
- Check "Properly size images" audit
- Verify "Serve images in next-gen formats" passes

### Common Image Optimization Commands

```bash
# Optimize single blog hero image
mcp__image-gen-mcp__optimize_existing_image({
  image_path: "/sites/blog/public/images/hero.png",
  create_webp: true,
  create_responsive: true,
  max_width: 1920
})

# Batch optimize all product images
mcp__image-gen-mcp__batch_optimize_images({
  directory: "/sites/main/public/images/products",
  create_webp: true
})

# Optimize converter site images
mcp__image-gen-mcp__batch_optimize_images({
  directory: "/sites/converter/public/images",
  create_webp: true,
  create_responsive: false
})
```

### Troubleshooting

#### Common Issues
1. **WebP not displaying**: Check browser support, add fallback
2. **Large file sizes**: Ensure max_width/max_height are set
3. **Missing variants**: Verify create_responsive is true
4. **Batch failures**: Check directory permissions

#### Verification Checklist
- [ ] WebP variants created for all images
- [ ] Responsive sizes available for hero images
- [ ] Original images preserved as fallback
- [ ] File sizes reduced by >80% for WebP
- [ ] Images display correctly in all browsers