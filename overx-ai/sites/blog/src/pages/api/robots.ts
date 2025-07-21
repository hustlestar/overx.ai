import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `# OverX AI Blog Robots.txt
# https://blog.overx.ai

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://blog.overx.ai/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow search engines to index images
User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Social media bots - Allow for better sharing
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Slackbot
Allow: /`
  
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400')
  res.send(robots)
}