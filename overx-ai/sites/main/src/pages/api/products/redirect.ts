import { NextApiRequest, NextApiResponse } from 'next'

// Product mapping with Chrome Web Store URLs and other product links
const PRODUCT_URLS: Record<string, string> = {
  // Chrome Extensions
  'exchange-rates': 'https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa',
  'currency-converter': 'https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa',
  'exchange_rates': 'https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa',

  'site-blocker': 'https://chromewebstore.google.com/detail/block-website-self-contro/obfpjaknohmdgkhambgdkfhnijccdhfa',
  'block-website': 'https://chromewebstore.google.com/detail/block-website-self-contro/obfpjaknohmdgkhambgdkfhnijccdhfa',
  'site_blocker': 'https://chromewebstore.google.com/detail/block-website-self-contro/obfpjaknohmdgkhambgdkfhnijccdhfa',

  'breathing-exercises': 'https://chromewebstore.google.com/detail/breathing-exercises-medit/fghajdnplonfdpoeagigdpnfcfojlhbg',
  'breathing_exercises': 'https://chromewebstore.google.com/detail/breathing-exercises-medit/fghajdnplonfdpoeagigdpnfcfojlhbg',

  // Telegram Bots
  'learn-words': 'https://words.overx.ai',
  'language-focus': 'https://t.me/language_focus_bot',
  'lang_focus_tg_bot': 'https://t.me/language_focus_bot',
  'claude-code-bot': 'https://t.me/claude_code_bot',
  'privet-bot': 'https://t.me/privet_bot',
  'meme-buy-bot': 'https://t.me/meme_buy_bot',
  'consult-by': 'https://t.me/consult_by_bot',
  'your-lawyer': 'https://t.me/your_lawyer_bot',
  'your-learner': 'https://t.me/your_learner_bot',

  // Web Apps
  'instagram-saver': 'https://overx.ai/products#productivity',
  'reel-saver': 'https://overx.ai/products#productivity',
}

// Helper to extract product from UTM content
function extractProductFromContent(content: string): string | null {
  // Normalize the content (lowercase, keep underscores and hyphens)
  const normalizedContent = content.toLowerCase()

  // Direct match
  if (PRODUCT_URLS[normalizedContent]) {
    return normalizedContent
  }

  // Try with underscores replaced by hyphens
  const withHyphens = normalizedContent.replace(/_/g, '-')
  if (PRODUCT_URLS[withHyphens]) {
    return withHyphens
  }

  // Check for partial matches
  for (const product in PRODUCT_URLS) {
    if (normalizedContent.includes(product) || product.includes(normalizedContent)) {
      return product
    }
  }

  return null
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get the host from the request headers to preserve www/non-www
  const host = req.headers.host || 'overx.ai'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  // Extract all parameters
  const {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    product: directProduct,
  } = req.query

  // Log the request for debugging
  console.log('Product redirect request:', {
    host,
    baseUrl,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    directProduct,
  })

  // Determine the product to redirect to
  let productKey: string | null = null

  // Priority 1: Direct product parameter
  if (directProduct && typeof directProduct === 'string') {
    productKey = extractProductFromContent(directProduct)
  }

  // Priority 2: Extract from utm_content
  if (!productKey && utm_content && typeof utm_content === 'string') {
    productKey = extractProductFromContent(utm_content)
  }

  // Get the target URL
  const targetUrl = productKey ? PRODUCT_URLS[productKey] : null

  // Prepare analytics event data
  const analyticsData = {
    event: 'product_redirect',
    event_category: 'engagement',
    event_label: productKey || 'not_found',
    utm_source: utm_source as string,
    utm_medium: utm_medium as string,
    utm_campaign: utm_campaign as string,
    utm_content: utm_content as string,
    target_url: targetUrl || 'products_page',
  }

  // If no product found, redirect to products page
  if (!targetUrl) {
    const queryParams = new URLSearchParams()
    if (utm_source) queryParams.append('utm_source', utm_source as string)
    if (utm_medium) queryParams.append('utm_medium', utm_medium as string)
    if (utm_campaign) queryParams.append('utm_campaign', utm_campaign as string)
    if (utm_content) queryParams.append('utm_content', utm_content as string)

    const redirectUrl = `${baseUrl}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`

    // Log analytics event (server-side)
    console.log('Product redirect failed:', analyticsData)

    // Use HTTP 302 redirect
    res.redirect(302, redirectUrl)
    return
  }

  // For Chrome Web Store links, append UTM parameters
  let finalUrl = targetUrl
  if (targetUrl.includes('chromewebstore.google.com')) {
    const separator = targetUrl.includes('?') ? '&' : '?'
    const utmParams = new URLSearchParams()

    // Add UTM params if not already present
    if (!targetUrl.includes('utm_source') && utm_source) {
      utmParams.append('utm_source', utm_source as string)
    }
    if (!targetUrl.includes('utm_medium') && utm_medium) {
      utmParams.append('utm_medium', utm_medium as string)
    }
    if (!targetUrl.includes('utm_campaign') && utm_campaign) {
      utmParams.append('utm_campaign', utm_campaign as string)
    }

    if (utmParams.toString()) {
      finalUrl = `${targetUrl}${separator}${utmParams.toString()}`
    }
  }

  // Log successful redirect for analytics (server-side)
  console.log('Product redirect successful:', {
    ...analyticsData,
    final_url: finalUrl
  })

  // Use HTTP 302 redirect
  res.redirect(302, finalUrl)
}