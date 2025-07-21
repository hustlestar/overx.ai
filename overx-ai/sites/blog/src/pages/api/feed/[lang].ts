import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '../../../lib/blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query
  const locale = lang as string || 'en'
  
  // Validate locale
  if (!['en', 'es', 'ru'].includes(locale)) {
    return res.status(404).json({ error: 'Invalid language' })
  }
  
  const posts = await getAllPosts(locale)
  const baseUrl = 'https://blog.overx.ai'
  
  const languageNames = {
    en: 'English',
    es: 'Español',
    ru: 'Русский'
  }
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OverX AI Blog - ${languageNames[locale as keyof typeof languageNames]}</title>
    <description>Insights, tutorials, and updates from the forefront of AI innovation</description>
    <link>${baseUrl}${locale === 'en' ? '' : `/${locale}`}</link>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed/${locale}" rel="self" type="application/rss+xml"/>
    <generator>OverX AI Blog</generator>
    <copyright>© 2024 OverX AI. All rights reserved.</copyright>`
  
  // Add posts
  for (const post of posts.slice(0, 20)) { // Limit to 20 most recent posts
    const postUrl = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/post/${post.slug}`
    
    rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category.name}]]></category>`
    
    // Add tags
    for (const tag of post.tags) {
      rss += `
      <category><![CDATA[${tag}]]></category>`
    }
    
    // Add full content
    rss += `
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`
  }
  
  rss += `
  </channel>
</rss>`
  
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=600')
  res.write(rss)
  res.end()
}