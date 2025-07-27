import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { params } = req.query
  const path = Array.isArray(params) ? params.join('/') : params
  
  try {
    const response = await axios({
      method: req.method,
      url: `https://api.overx.ai/api/v1/rates/${path}`,
      params: req.query,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    res.status(response.status).json(response.data)
  } catch (error: any) {
    console.error('API proxy error:', error.message)
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Internal server error'
    })
  }
}