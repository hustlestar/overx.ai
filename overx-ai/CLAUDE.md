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
**Never create a vercel.json file at the repository root** - it will override individual project settings and cause sites to display wrong content.

### Converter Site (rates.overx.ai) ✅ WORKING
Configure in Vercel Dashboard:
- **Root Directory**: Leave empty (build from monorepo root)
- **Build Command**: `npm install && npm run build:converter`
- **Output Directory**: `sites/converter/.next`
- **Install Command**: `npm install`
- **Framework Preset**: Next.js

### Main Site (overx.ai) 
Configure in Vercel Dashboard:
- **Root Directory**: `sites/main`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
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