import { NextApiRequest, NextApiResponse } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://overx.ai'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

const staticPages: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    loc: '/products',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: '/privacy',
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: '/terms',
    changefreq: 'yearly',
    priority: 0.3
  }
]

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => `
    <url>
      <loc>${SITE_URL}${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    </url>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = generateSitemapXml(staticPages)
  
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate')
  res.status(200).send(sitemap)
}