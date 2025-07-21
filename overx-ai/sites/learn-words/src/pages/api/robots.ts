import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

# Sitemap
Sitemap: https://learn.overx.ai/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Popular bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Applebot
Allow: /

# Block bad bots
User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.status(200).send(robots)
}