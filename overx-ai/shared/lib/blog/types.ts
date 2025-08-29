export interface BlogPostMetadata {
  slug: string
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  tags: string[]
  readingTime: number
  featured: boolean
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  title: Record<string, string> // Multi-language support
  excerpt: Record<string, string> // Multi-language support
  seo: Record<string, {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }>
}

export interface BlogPostContent {
  [locale: string]: string // Multi-language content
}

export interface BlogPost extends BlogPostMetadata {
  content: BlogPostContent
}

export interface BlogConfig {
  domain: string
  basePath: string // e.g., '/blog' or '/articles'
  supportedLocales: string[]
  defaultLocale: string
  postsPerPage: number
  trailingSlash?: boolean // Whether URLs should end with trailing slash
  categories: Record<string, {
    slug: string
    name: Record<string, string> // Multi-language category names
    description?: Record<string, string>
  }>
}

export interface BlogCategory {
  slug: string
  name: Record<string, string>
  description?: Record<string, string>
  postCount: number
}

export interface BlogListPage {
  posts: BlogPostMetadata[]
  categories: BlogCategory[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface BlogPostPage {
  post: BlogPost
  relatedPosts: BlogPostMetadata[]
  categories: BlogCategory[]
}

// SEO-related types
export interface BlogSEO {
  title: string
  description: string
  canonical: string
  openGraph: {
    type: 'article' | 'website'
    title: string
    description: string
    url: string
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
  twitter?: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    image?: string
  }
  structuredData?: any
}