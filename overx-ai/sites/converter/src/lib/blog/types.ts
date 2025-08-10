export interface BlogPost {
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
    alt: Record<string, string>
    width: number
    height: number
  }
  // Localized content
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  seo: Record<string, {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }>
}

export interface BlogCategory {
  slug: string
  name: Record<string, string>
  description: Record<string, string>
}