import { BlogPost, Author } from '../types/blog'

export function generateBlogPostSchema(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
      image: post.author.avatar,
      sameAs: [
        post.author.social?.twitter ? `https://twitter.com/${post.author.social.twitter}` : null,
        post.author.social?.linkedin ? `https://linkedin.com/in/${post.author.social.linkedin}` : null,
        post.author.social?.github ? `https://github.com/${post.author.social.github}` : null,
      ].filter(Boolean)
    },
    publisher: {
      '@type': 'Organization',
      name: 'OverX AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.overx.ai/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: post.tags.join(', '),
    articleSection: post.category.name,
    inLanguage: post.locale,
    url: url
  }
}

export function generateAuthorSchema(author: Author, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    image: author.avatar,
    url: url,
    sameAs: [
      author.social?.twitter ? `https://twitter.com/${author.social.twitter}` : null,
      author.social?.linkedin ? `https://linkedin.com/in/${author.social.linkedin}` : null,
      author.social?.github ? `https://github.com/${author.social.github}` : null,
    ].filter(Boolean)
  }
}

export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'OverX AI Blog',
    description: 'Insights, tutorials, and updates about AI technology and OverX AI products',
    url: 'https://blog.overx.ai',
    publisher: {
      '@type': 'Organization',
      name: 'OverX AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.overx.ai/logo.png'
      }
    },
    inLanguage: ['en', 'es', 'ru']
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url })
    }))
  }
}