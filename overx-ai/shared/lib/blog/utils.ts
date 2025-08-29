import { BlogPost, BlogPostMetadata, BlogConfig, BlogCategory, BlogListPage, BlogPostPage, BlogSEO } from './types'
import { createBlogPostingSchema, createBreadcrumbListSchema } from '../schema'

/**
 * Get posts by category
 */
export function getPostsByCategory(posts: BlogPostMetadata[], category: string): BlogPostMetadata[] {
  return posts.filter(post => post.tags.includes(category))
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(posts: BlogPostMetadata[], limit?: number): BlogPostMetadata[] {
  const featured = posts.filter(post => post.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get recent posts
 */
export function getRecentPosts(posts: BlogPostMetadata[], limit: number = 5): BlogPostMetadata[] {
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Get related posts based on shared tags
 */
export function getRelatedPosts(
  currentPost: BlogPostMetadata,
  allPosts: BlogPostMetadata[],
  limit: number = 3
): BlogPostMetadata[] {
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug)
  
  // Calculate relevance score based on shared tags
  const postsWithScore = otherPosts.map(post => ({
    ...post,
    relevanceScore: post.tags.filter(tag => currentPost.tags.includes(tag)).length
  }))
  
  // Sort by relevance score (descending) and then by date (descending)
  postsWithScore.sort((a, b) => {
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
  
  return postsWithScore.slice(0, limit)
}

/**
 * Generate categories from posts
 */
export function generateCategoriesFromPosts(
  posts: BlogPostMetadata[],
  config: BlogConfig
): BlogCategory[] {
  const tagCounts = new Map<string, number>()
  
  // Count posts per tag
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  // Convert to categories
  const categories: BlogCategory[] = []
  
  for (const [tag, count] of tagCounts.entries()) {
    const categoryConfig = config.categories[tag]
    if (categoryConfig) {
      categories.push({
        slug: categoryConfig.slug,
        name: categoryConfig.name,
        description: categoryConfig.description,
        postCount: count
      })
    }
  }
  
  // Sort by post count (descending)
  return categories.sort((a, b) => b.postCount - a.postCount)
}

/**
 * Paginate posts
 */
export function paginatePosts(
  posts: BlogPostMetadata[],
  page: number,
  postsPerPage: number
): {
  posts: BlogPostMetadata[]
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
} {
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = posts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(posts.length / postsPerPage)
  
  return {
    posts: paginatedPosts,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  }
}

/**
 * Create blog list page data
 */
export function createBlogListPage(
  posts: BlogPostMetadata[],
  config: BlogConfig,
  page: number = 1,
  category?: string
): BlogListPage {
  // Filter by category if specified
  let filteredPosts = category ? getPostsByCategory(posts, category) : posts
  
  // Sort by publish date (newest first)
  filteredPosts = filteredPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  
  const pagination = paginatePosts(filteredPosts, page, config.postsPerPage)
  const categories = generateCategoriesFromPosts(posts, config)
  
  return {
    posts: pagination.posts,
    categories,
    totalPosts: filteredPosts.length,
    totalPages: pagination.totalPages,
    currentPage: page,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage
  }
}

/**
 * Create blog post page data
 */
export function createBlogPostPage(
  post: BlogPost,
  allPosts: BlogPostMetadata[],
  config: BlogConfig
): BlogPostPage {
  const relatedPosts = getRelatedPosts(post, allPosts)
  const categories = generateCategoriesFromPosts(allPosts, config)
  
  return {
    post,
    relatedPosts,
    categories
  }
}

/**
 * Generate SEO data for blog list page
 */
export function generateBlogListSEO(
  config: BlogConfig,
  locale: string,
  page: number = 1,
  category?: string
): BlogSEO {
  const baseUrl = `https://${config.domain}`
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const trailingSlash = config.trailingSlash ? '/' : ''
  const blogUrl = `${baseUrl}${localePrefix}${config.basePath}${trailingSlash}`
  
  let title = 'Blog'
  let description = 'Latest articles and insights'
  let url = blogUrl
  
  if (category && config.categories[category]) {
    const categoryConfig = config.categories[category]
    title = categoryConfig.name[locale] || categoryConfig.name[config.defaultLocale] || title
    description = categoryConfig.description?.[locale] || categoryConfig.description?.[config.defaultLocale] || description
    url = `${blogUrl}/category/${categoryConfig.slug}`
  }
  
  if (page > 1) {
    title += ` - Page ${page}`
    url += `/page/${page}`
  }
  
  return {
    title: `${title} | ${config.domain}`,
    description,
    canonical: url,
    openGraph: {
      type: 'website',
      title,
      description,
      url
    }
  }
}

/**
 * Generate SEO data for blog post
 */
export function generateBlogPostSEO(
  post: BlogPost,
  config: BlogConfig,
  locale: string
): BlogSEO {
  const baseUrl = `https://${config.domain}`
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const trailingSlash = config.trailingSlash ? '/' : ''
  const postUrl = `${baseUrl}${localePrefix}${config.basePath}/${post.slug}${trailingSlash}`
  
  const seoData = post.seo[locale] || post.seo[config.defaultLocale]
  const title = post.title[locale] || post.title[config.defaultLocale]
  const excerpt = post.excerpt[locale] || post.excerpt[config.defaultLocale]
  
  // Generate structured data
  const structuredData = [
    createBlogPostingSchema({
      headline: title,
      description: excerpt,
      image: `${baseUrl}${post.image.url}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        name: post.author.name,
        url: post.author.avatar ? `${baseUrl}${post.author.avatar}` : undefined
      },
      publisher: {
        name: config.domain,
        logo: `${baseUrl}/favicon.svg`
      },
      keywords: seoData?.keywords || [],
      blogUrl: `${baseUrl}${localePrefix}${config.basePath}`,
      mainEntityOfPage: postUrl
    }),
    createBreadcrumbListSchema([
      { name: 'Home', url: `${baseUrl}${localePrefix}` },
      { name: 'Blog', url: `${baseUrl}${localePrefix}${config.basePath}` },
      { name: title, url: postUrl }
    ])
  ]
  
  return {
    title: seoData?.metaTitle || `${title} | ${config.domain}`,
    description: seoData?.metaDescription || excerpt,
    canonical: postUrl,
    openGraph: {
      type: 'article',
      title,
      description: excerpt,
      url: postUrl,
      images: [{
        url: `${baseUrl}${post.image.url}`,
        width: post.image.width,
        height: post.image.height,
        alt: post.image.alt
      }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      image: `${baseUrl}${post.image.url}`
    },
    structuredData
  }
}

/**
 * Generate blog sitemap entries
 */
export function generateBlogSitemapEntries(
  posts: BlogPostMetadata[],
  config: BlogConfig,
  locales: string[] = config.supportedLocales
): Array<{
  url: string
  lastmod: string
  changefreq: 'weekly' | 'monthly'
  priority: number
}> {
  const baseUrl = `https://${config.domain}`
  const entries: Array<{
    url: string
    lastmod: string
    changefreq: 'weekly' | 'monthly'
    priority: number
  }> = []
  
  // Blog index pages
  locales.forEach(locale => {
    const blogPath = locale === config.defaultLocale 
      ? config.basePath 
      : `/${locale}${config.basePath}`
    
    entries.push({
      url: `${baseUrl}${blogPath}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    })
  })
  
  // Individual blog posts
  posts.forEach(post => {
    locales.forEach(locale => {
      const postPath = locale === config.defaultLocale
        ? `${config.basePath}/${post.slug}`
        : `/${locale}${config.basePath}/${post.slug}`
      
      entries.push({
        url: `${baseUrl}${postPath}`,
        lastmod: post.updatedAt || post.publishedAt,
        changefreq: 'monthly',
        priority: 0.6
      })
    })
  })
  
  return entries
}

/**
 * Search posts by query
 */
export function searchPosts(
  posts: BlogPostMetadata[],
  query: string,
  locale: string,
  defaultLocale: string
): BlogPostMetadata[] {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return []
  
  return posts.filter(post => {
    const title = (post.title[locale] || post.title[defaultLocale] || '').toLowerCase()
    const excerpt = (post.excerpt[locale] || post.excerpt[defaultLocale] || '').toLowerCase()
    const tags = post.tags.join(' ').toLowerCase()
    const author = post.author.name.toLowerCase()
    
    return (
      title.includes(searchTerm) ||
      excerpt.includes(searchTerm) ||
      tags.includes(searchTerm) ||
      author.includes(searchTerm)
    )
  })
}