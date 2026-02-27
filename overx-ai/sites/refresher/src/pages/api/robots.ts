import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://refresher.overx.ai/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.status(200).send(robots)
}
