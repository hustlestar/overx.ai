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
  image?: string
  content?: string
  contentHtml?: string
}

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory)
  } catch (error) {
    return []
  }
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      content,
      ...(data as Omit<PostData, 'slug' | 'content'>)
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