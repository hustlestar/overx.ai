import { StructuredData } from '../../components/SEO/types'

interface Author {
  name: string
  url?: string
  image?: string
}

interface ArticleConfig {
  headline: string
  description: string
  image: string | string[]
  datePublished: string
  dateModified?: string
  author: Author | Author[]
  publisher: {
    name: string
    logo: string
  }
  mainEntityOfPage?: string
  keywords?: string[]
  articleSection?: string
  wordCount?: number
}

export function createArticleSchema(config: ArticleConfig): StructuredData {
  const authors = Array.isArray(config.author) ? config.author : [config.author]
  
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.headline,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: authors.map(author => ({
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
      ...(author.image && { image: author.image })
    })),
    publisher: {
      '@type': 'Organization',
      name: config.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: config.publisher.logo
      }
    }
  }

  if (config.mainEntityOfPage) {
    schema.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': config.mainEntityOfPage
    }
  }

  if (config.keywords) {
    schema.keywords = config.keywords.join(', ')
  }

  if (config.articleSection) {
    schema.articleSection = config.articleSection
  }

  if (config.wordCount) {
    schema.wordCount = config.wordCount
  }

  return schema
}

export function createBlogPostingSchema(config: ArticleConfig & {
  blogUrl?: string
}): StructuredData {
  const schema = createArticleSchema(config)
  schema['@type'] = 'BlogPosting'
  
  if (config.blogUrl) {
    schema.isPartOf = {
      '@type': 'Blog',
      '@id': config.blogUrl
    }
  }

  return schema
}