import type { NextApiRequest, NextApiResponse } from 'next'

const SITE_URL = 'https://refresher.overx.ai'
const locales = ['en', 'ru', 'es']

const pages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${locales.map(locale => `<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${page.path}"/>`).join('\n    ')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.path}"/>
  </url>`
  )
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.status(200).send(sitemap)
}
