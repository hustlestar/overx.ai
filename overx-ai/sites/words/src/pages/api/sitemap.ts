import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://words.overx.ai'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts()
  
  const staticPages = [
    '',
    '/features',
    '/pricing',
    '/blog'
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(page => {
      return `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`
    })
    .join('')}
  ${posts
    .map(post => {
      return `
    <url>
      <loc>${SITE_URL}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.date).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`
    })
    .join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.status(200).send(sitemap)
}