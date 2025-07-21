import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get IP from headers (works with Vercel and other proxies)
  const forwarded = req.headers['x-forwarded-for']
  const ip = typeof forwarded === 'string' 
    ? forwarded.split(',')[0].trim() 
    : req.socket.remoteAddress

  try {
    // Use a free IP geolocation service
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`)
    const geoData = await geoResponse.json()

    if (geoData.status === 'success') {
      res.status(200).json({
        country: geoData.countryCode,
        region: geoData.region,
        city: geoData.city,
        timezone: geoData.timezone
      })
    } else {
      // Fallback to browser timezone detection
      res.status(200).json({
        country: null,
        region: null,
        city: null,
        timezone: null
      })
    }
  } catch (error) {
    // Return null values on error
    res.status(200).json({
      country: null,
      region: null,
      city: null,
      timezone: null
    })
  }
}