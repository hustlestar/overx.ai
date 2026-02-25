import { NextApiRequest, NextApiResponse } from 'next'
import { blogPostsMetadata } from '@/content/blog/metadata'

const SITE_URL = 'https://words.overx.ai'
const LOCALES = ['en', 'es', 'ru']

function buildUrl(path: string, locale: string): string {
  const localePath = locale === 'en' ? '' : `/${locale}`
  return `${SITE_URL}${localePath}${path}`
}

function buildHreflang(path: string): string {
  return `
    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(path, 'en')}"/>
    ${LOCALES.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${buildUrl(path, l)}"/>`).join('\n    ')}`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use metadata from blogLoader system (excludes test-post, all real content)
  const posts = blogPostsMetadata.filter(post => post.slug !== 'test-post')

  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/features', changefreq: 'weekly', priority: '0.8' },
    { path: '/pricing', changefreq: 'monthly', priority: '0.7' },
    { path: '/about', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticPages.flatMap(page =>
    LOCALES.map(locale => `
  <url>
    <loc>${buildUrl(page.path, locale)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${buildHreflang(page.path)}
  </url>`)
  ).join('')}
  ${posts.flatMap(post =>
    LOCALES.map(locale => `
  <url>
    <loc>${buildUrl(`/blog/${post.slug}`, locale)}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${buildHreflang(`/blog/${post.slug}`)}
  </url>`)
  ).join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.status(200).send(sitemap)
}
