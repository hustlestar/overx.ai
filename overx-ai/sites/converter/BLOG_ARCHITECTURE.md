# Blog System Architecture Documentation

## Overview
The blog system supports both **legacy posts** (metadata + separate content) and **complete posts** (self-contained objects with full content).

## Critical Architecture Rules

### 🚨 **NEVER CREATE DUPLICATE SLUGS**
**This is the #1 cause of content display issues.**

- **Rule**: Each blog post slug must exist in ONLY ONE location
- **Legacy posts**: Metadata in `metadata.ts` + content in separate files
- **Complete posts**: Full objects in individual files
- **⚠️ NEVER put the same slug in both systems**

### Blog Post Types

#### 1. Legacy Posts (Existing System)
```typescript
// File: /content/blog/metadata.ts
export const blogMetadata: Omit<BlogPost, 'content'>[] = [
  {
    slug: 'example-legacy-post',
    // ... metadata only, no content
  }
]

// File: /content/blog/example-legacy-post.ts
export const content = {
  en: `# English content here`,
  es: `# Spanish content here`, 
  ru: `# Russian content here`
}
```

#### 2. Complete Posts (New System)
```typescript
// File: /content/blog/example-complete-post.ts
export const exampleCompletePost: BlogPost = {
  slug: 'example-complete-post',
  // ... full metadata AND content in one object
  content: {
    en: `# English content here`,
    es: `# Spanish content here`,
    ru: `# Russian content here`
  }
}
```

### Data Flow Architecture

```
metadata.ts → legacyPosts (metadata + contentMap)
             ↓
individual-files → newPosts (complete objects)
                   ↓
            blogPosts = [...legacyPosts, ...newPosts]
                   ↓
            getBlogPost(slug) → finds FIRST match
```

**⚠️ Critical**: `getBlogPost()` returns the **first match**. If a slug exists in both systems, the legacy post (with potentially empty content) will be returned first.

## Adding New Blog Posts

### Method 1: Complete Posts (Recommended)
1. Create individual file: `/content/blog/new-post-slug.ts`
2. Export complete `BlogPost` object with content
3. Import and add to `blogPosts` array in `posts.ts`
4. **DO NOT** add to `metadata.ts`

### Method 2: Legacy Posts (For Consistency)
1. Add metadata to `metadata.ts`
2. Create content file with matching slug
3. Add to `contentMap` in `posts.ts`
4. **DO NOT** create individual complete post file

## Multi-Image System

### Image Types
- **hero**: Main post image (1344×768), displayed automatically
- **featured**: Infographic/text image (1312×736), must be referenced in content
- **content**: Supporting images (various sizes), must be referenced in content

### Image Definition
```typescript
images: [
  {
    url: '/blog/hero-image.png',
    alt: { en: '...', es: '...', ru: '...' },
    width: 1344,
    height: 768,
    type: 'hero'
  },
  {
    url: '/blog/featured-image.png', 
    alt: { en: '...', es: '...', ru: '...' },
    width: 1312,
    height: 736,
    type: 'featured'
  }
]
```

### Image Usage in Content
```markdown
<!-- Reference images in markdown content -->
![Alt text](/blog/featured-image.png)

<!-- Or use BlogImage component reference -->
<BlogImage 
  src="/blog/featured-image.png"
  type="featured"
/>
```

**⚠️ Important**: Only the hero image displays automatically. Featured and content images must be referenced within the blog post content to appear.

## Common Issues & Solutions

### Issue 1: Empty Content Display
**Symptom**: Blog post loads but shows no content text
**Cause**: Duplicate slugs in both `metadata.ts` and individual files
**Solution**: Remove duplicate from `metadata.ts`, keep only in individual file

### Issue 2: Missing Images
**Symptom**: Only hero image shows, other images missing
**Cause**: Images defined in metadata but not referenced in content
**Solution**: Add image references in markdown content

### Issue 3: Build Errors
**Symptom**: TypeScript compilation fails
**Cause**: Import/export mismatches or missing content properties
**Solution**: Ensure all imports match exports, check `BlogPost` interface compliance

## File Structure
```
/content/blog/
├── metadata.ts              # Legacy posts metadata only
├── legacy-post-1.ts         # Legacy post content
├── legacy-post-2.ts         # Legacy post content  
├── complete-post-1.ts       # Complete post object
└── complete-post-2.ts       # Complete post object

/lib/blog/
├── types.ts                 # BlogPost interface
└── posts.ts                 # Central aggregation logic
```

## Testing Checklist

Before deploying blog changes:

1. **No Duplicate Slugs**: Verify each slug exists in only one system
2. **Content Display**: Test that all posts show full content in all languages
3. **Image Display**: Verify hero images show automatically
4. **Build Success**: Confirm `npm run build` completes without errors
5. **TypeScript**: Run `npx tsc --noEmit` to check types

## Debug Steps

When blog content doesn't display:

1. **Check for duplicates**:
   ```bash
   # Search for slug in metadata.ts
   grep -n "slug-name" /content/blog/metadata.ts
   
   # Search for slug in individual files  
   find /content/blog -name "*.ts" -exec grep -l "slug-name" {} \;
   ```

2. **Verify import/export**:
   ```bash
   # Check if individual file exports correctly
   grep -n "export.*slug-name" /content/blog/individual-file.ts
   
   # Check if posts.ts imports correctly
   grep -n "slug-name" /lib/blog/posts.ts
   ```

3. **Test content length**:
   ```javascript
   // Add temporary debug in getBlogPost()
   console.log('Content length:', post?.content?.en?.length || 0)
   ```

## Best Practices

1. **Use complete posts** for new content (easier to manage)
2. **Never mix systems** for the same slug
3. **Always test locally** before deploying
4. **Include all image references** in content markdown
5. **Maintain consistent naming** for slugs and exports
6. **Document changes** when modifying the blog system