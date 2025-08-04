import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const mimeTypes: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: pathSegments } = req.query
  const requestedPath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments || ''
  
  // Security: prevent directory traversal
  if (requestedPath.includes('..')) {
    return res.status(400).json({ error: 'Invalid path' })
  }
  
  // Construct the file path
  const filePath = path.join(process.cwd(), '../../../shared/public/favicon', requestedPath)
  const ext = path.extname(filePath)
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }
  
  // Set appropriate content type
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  res.setHeader('Content-Type', contentType)
  
  // Cache for 1 year
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  
  // Read and send the file
  const fileContent = fs.readFileSync(filePath)
  res.send(fileContent)
}