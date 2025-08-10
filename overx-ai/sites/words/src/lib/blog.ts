import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface PostData {
  slug: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  readTime: string
  image?: string | null
  content?: string
  contentHtml?: string
}

export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    const files = fs.readdirSync(postsDirectory)
    return files.filter(file => file.endsWith('.md'))
  } catch (error) {
    return []
  }
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Return null if essential fields are missing
    if (!data.title || !data.date) {
      return null
    }

    return {
      slug: realSlug,
      content: content || '',
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'World Word War Bot',
      category: data.category || 'General',
      excerpt: data.excerpt || content?.substring(0, 150) + '...' || '',
      readTime: data.readTime || '5 min read',
      image: data.image || null
    }
  } catch (error) {
    return null
  }
}

export async function getPostDataWithHtml(slug: string): Promise<PostData | null> {
  const post = getPostBySlug(slug)
  if (!post || !post.content) return null

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  
  post.contentHtml = processedContent.toString()
  return post
}

export function getAllPosts(): PostData[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostData => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  
  return posts
}

export function getPostsByCategory(category: string): PostData[] {
  return getAllPosts().filter(post => post.category === category)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}