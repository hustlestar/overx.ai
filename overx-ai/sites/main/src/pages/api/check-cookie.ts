import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.cookies
  const cookieHeader = req.headers.cookie
  
  res.status(200).json({
    cookies,
    cookieHeader,
    'overx-locale': cookies['overx-locale'] || 'not found'
  })
}