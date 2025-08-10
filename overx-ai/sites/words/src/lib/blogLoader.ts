import { BlogPost, BlogPostMetadata } from '@overx-ai/shared'
import { blogPostsMetadata } from '../content/blog/metadata'
import { wordsBlogConfig } from './blogConfig'

// Dynamic imports for blog content
const contentModules = {
  'test-post': () => import('../content/blog/test-post')
}

/**
 * Get all blog post metadata
 */
export function getAllBlogPosts(): BlogPostMetadata[] {
  return blogPostsMetadata.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const metadata = blogPostsMetadata.find(post => post.slug === slug)
  if (!metadata) return null
  
  const contentLoader = contentModules[slug as keyof typeof contentModules]
  if (!contentLoader) return null
  
  try {
    const contentModule = await contentLoader()
    return {
      ...metadata,
      content: contentModule.blogContent
    }
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error)
    return null
  }
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPostMetadata[] {
  return blogPostsMetadata.filter(post => post.tags.includes(category))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit?: number): BlogPostMetadata[] {
  const featured = blogPostsMetadata.filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get recent blog posts
 */
export function getRecentBlogPosts(limit: number = 5): BlogPostMetadata[] {
  return blogPostsMetadata
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Get all blog post slugs for static path generation
 */
export function getAllBlogPostSlugs(): string[] {
  return blogPostsMetadata.map(post => post.slug)
}

/**
 * Get all blog categories with post counts
 */
export function getBlogCategories() {
  const categoryMap = new Map<string, number>()
  
  blogPostsMetadata.forEach(post => {
    post.tags.forEach(tag => {
      categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(categoryMap.entries())
    .filter(([category]) => wordsBlogConfig.categories[category])
    .map(([category, count]) => ({
      slug: wordsBlogConfig.categories[category].slug,
      name: wordsBlogConfig.categories[category].name,
      description: wordsBlogConfig.categories[category].description,
      postCount: count
    }))
    .sort((a, b) => b.postCount - a.postCount)
}