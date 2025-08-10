export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface BlogImage {
  url: string
  alt: {
    en: string
    es?: string
    ru?: string
  }
  width: number
  height: number
  type?: 'hero' | 'content' | 'featured'
  caption?: {
    en: string
    es?: string
    ru?: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string // Legacy support
  images: BlogImage[] // New multi-image system
  date: string
  lastModified?: string
  author: Author
  category: Category
  tags: string[]
  locale: string
  readingTime: string
  featured?: boolean
  seo?: {
    metaDescription?: string
    metaKeywords?: string[]
    canonicalUrl?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string // For UI theming
}

export interface BlogMetadata {
  title: string
  description: string
  totalPosts: number
  categories: Category[]
  tags: string[]
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  postsPerPage: number
  totalPosts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}