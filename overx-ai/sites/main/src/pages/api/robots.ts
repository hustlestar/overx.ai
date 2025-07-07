import { NextApiRequest, NextApiResponse } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://overx.ai'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = `# robots.txt for ${SITE_URL}
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay for bots that support it
Crawl-delay: 1

# Specific bot rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: Slurp
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
  res.status(200).send(robotsTxt)
}