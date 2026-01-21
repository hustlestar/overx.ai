const fs = require('fs')
const path = require('path')

// Import blog posts to get all slugs
const { getAllBlogPosts } = require('../sites/converter/.next/server/pages/api/rates/[...params].js')

async function generateConverterSitemap() {
  // Base URLs
  const staticUrls = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/blog', priority: 0.9, changefreq: 'weekly' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/sources', priority: 0.7, changefreq: 'monthly' },
    { path: '/apis', priority: 0.7, changefreq: 'monthly' },
    { path: '/settings', priority: 0.5, changefreq: 'monthly' },
    { path: '/simple', priority: 0.5, changefreq: 'monthly' }
  ]

  // Get all blog posts dynamically
  const blogPosts = [
    'why-transparent-exchange-rates-matter-international-business',
    'save-money-traveling-currency-converter-chrome-extension',
    'compare-currency-exchange-apis-2024-complete-guide',
    'real-time-currency-alerts-maximize-exchange-rates',
    'cryptocurrency-vs-traditional-currency-exchange-2024',
    'avoid-dynamic-currency-conversion-scams-complete-guide',
    'advanced-currency-math-complex-multi-currency-expressions',
    'complete-guide-currency-conversion-mathematical-expressions',
    'how-to-convert-currency-mathematical-expressions-tutorial'
  ]

  // Add blog post URLs for all locales
  const locales = ['en', 'es', 'ru']
  const blogUrls = []
  
  blogPosts.forEach(slug => {
    locales.forEach(locale => {
      const path = locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`
      blogUrls.push({
        path,
        priority: 0.8,
        changefreq: 'weekly'
      })
    })
  })

  // Combine all URLs
  const allUrls = [...staticUrls, ...blogUrls]

  // Generate XML
  const urlElements = allUrls.map(url => {
    return `  <url>
    <loc>https://rates.overx.ai${url.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  }).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`

  // Write to file
  const filePath = path.join(__dirname, '../sites/converter/public/sitemap.xml')
  fs.writeFileSync(filePath, sitemap, 'utf-8')
  
  console.log('✅ Converter sitemap generated with all blog posts')
}

module.exports = { generateConverterSitemap }

// Execute if run directly
if (require.main === module) {
  generateConverterSitemap()
}