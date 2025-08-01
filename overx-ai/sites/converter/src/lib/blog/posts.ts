import { BlogPost } from './types'
import { blogMetadata } from '@/content/blog/metadata'

// Import content for each blog post
import { content as transparentRatesContent } from '@/content/blog/why-transparent-exchange-rates-matter-international-business'
import { content as saveTravelingContent } from '@/content/blog/save-money-traveling-currency-converter-chrome-extension'
import { content as compareApisContent } from '@/content/blog/compare-currency-exchange-apis-2024-complete-guide'
import { content as currencyAlertsContent } from '@/content/blog/real-time-currency-alerts-maximize-exchange-rates'
import { content as cryptoVsTraditionalContent } from '@/content/blog/cryptocurrency-vs-traditional-currency-exchange-2024'
import { content as avoidDccContent } from '@/content/blog/avoid-dynamic-currency-conversion-scams-complete-guide'

// Map content to metadata
const contentMap: Record<string, typeof transparentRatesContent> = {
  'why-transparent-exchange-rates-matter-international-business': transparentRatesContent,
  'save-money-traveling-currency-converter-chrome-extension': saveTravelingContent,
  'compare-currency-exchange-apis-2024-complete-guide': compareApisContent,
  'real-time-currency-alerts-maximize-exchange-rates': currencyAlertsContent,
  'cryptocurrency-vs-traditional-currency-exchange-2024': cryptoVsTraditionalContent,
  'avoid-dynamic-currency-conversion-scams-complete-guide': avoidDccContent,
}

// Combine metadata with content
export const blogPosts: BlogPost[] = blogMetadata.map(post => ({
  ...post,
  content: contentMap[post.slug] || { en: '', es: '', ru: '' }
}))

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Get related posts based on tags
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPost(currentSlug)
  if (!currentPost) return []
  
  const relatedPosts = blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      post,
      score: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
  
  // If not enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = blogPosts
      .filter(post => 
        post.slug !== currentSlug && 
        !relatedPosts.find(p => p.slug === post.slug)
      )
      .slice(0, limit - relatedPosts.length)
    
    relatedPosts.push(...recentPosts)
  }
  
  return relatedPosts
}