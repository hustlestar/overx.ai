export * from './types'
export * from './utils'

// Re-export commonly used functions for convenience
export {
  getPostsByCategory,
  getFeaturedPosts,
  getRecentPosts,
  getRelatedPosts,
  createBlogListPage,
  createBlogPostPage,
  generateBlogListSEO,
  generateBlogPostSEO,
  generateBlogSitemapEntries,
  searchPosts
} from './utils'