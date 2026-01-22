import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'
import { BlogPost, Author, Category } from '../types/blog'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const authorsPath = path.join(process.cwd(), 'content/authors/authors.json')
const categoriesPath = path.join(process.cwd(), 'content/categories/categories.json')

// Cache for authors and categories
let authorsCache: Record<string, Author> | null = null
let categoriesCache: Record<string, Category> | null = null

export function getAuthors(): Record<string, Author> {
  if (authorsCache) return authorsCache
  
  const fileContents = fs.readFileSync(authorsPath, 'utf8')
  const data = JSON.parse(fileContents)
  
  authorsCache = data.authors.reduce((acc: Record<string, Author>, author: Author) => {
    acc[author.id] = author
    return acc
  }, {})
  
  return authorsCache
}

export function getCategories(): Record<string, Category> {
  if (categoriesCache) return categoriesCache
  
  const fileContents = fs.readFileSync(categoriesPath, 'utf8')
  const data = JSON.parse(fileContents)
  
  categoriesCache = data.categories.reduce((acc: Record<string, Category>, category: Category) => {
    acc[category.id] = category
    return acc
  }, {})
  
  return categoriesCache
}

export function getPostSlugs(locale: string = 'en'): string[] {
  const localePath = path.join(postsDirectory, locale)
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(localePath)) {
    fs.mkdirSync(localePath, { recursive: true })
    return []
  }
  
  return fs.readdirSync(localePath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, locale, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()
    
    // Get author and category data
    const authors = getAuthors()
    const categories = getCategories()
    
    const author = authors[data.author] || authors['overx-team']
    const category = categories[data.category] || categories['ai-insights']
    
    // Calculate reading time
    const stats = readingTime(content)
    
    return {
      slug: realSlug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      content: contentHtml,
      coverImage: data.coverImage || '/images/default-cover.jpg',
      images: data.images || [],
      date: data.date || new Date().toISOString(),
      lastModified: data.lastModified || data.date || new Date().toISOString(),
      author,
      category,
      tags: data.tags || [],
      locale,
      readingTime: stats.text,
      featured: data.featured || false,
      seo: data.seo || {}
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(locale: string = 'en'): Promise<BlogPost[]> {
  const slugs = getPostSlugs(locale)
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug, locale))
  )
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getPostsByCategory(categorySlug: string, locale: string = 'en'): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter(post => post.category.slug === categorySlug)
}

export async function getPostsByTag(tag: string, locale: string = 'en'): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter(post => post.tags.includes(tag))
}

export async function getPostsByAuthor(authorId: string, locale: string = 'en'): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter(post => post.author.id === authorId)
}

export async function getFeaturedPosts(locale: string = 'en', limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale)
  return allPosts
    .filter(post => post.featured)
    .slice(0, limit)
}

export async function getRelatedPosts(
  currentPost: BlogPost,
  locale: string = 'en',
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale)
  
  // Score posts based on shared tags and same category
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0
      
      // Same category gets 2 points
      if (post.category.id === currentPost.category.id) {
        score += 2
      }
      
      // Each shared tag gets 1 point
      post.tags.forEach(tag => {
        if (currentPost.tags.includes(tag)) {
          score += 1
        }
      })
      
      return { post, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
  
  return scoredPosts.slice(0, limit).map(item => item.post)
}

export function getAllTags(locale: string = 'en'): string[] {
  const posts = getPostSlugs(locale).map(slug => {
    const fullPath = path.join(postsDirectory, locale, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return data.tags || []
  })

  const allTags = posts.flat()
  return Array.from(new Set(allTags)).sort()
}

export function getAllCategorySlugs(): string[] {
  const categories = getCategories()
  return Object.values(categories).map(category => category.slug)
}

export function getCategoryBySlug(slug: string): Category | null {
  const categories = getCategories()
  return Object.values(categories).find(category => category.slug === slug) || null
}
