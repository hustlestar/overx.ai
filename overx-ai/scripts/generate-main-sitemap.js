const { SitemapGenerator } = require('../shared/dist/lib/sitemap/generator')
const path = require('path')

async function generateMainSitemap() {
  console.log('🔍 Generating main site sitemap...')

  // Main site sitemap
  const mainGenerator = new SitemapGenerator({
    hostname: 'https://overx.ai',
    exclude: ['cv.tsx'], // Exclude CV from sitemap
    priority: {
      '^/$': 1.0,
      '^/products': 0.9,
      '^/about': 0.8,
      '^/contact': 0.7
    },
    changefreq: {
      '^/$': 'daily',
      '^/products': 'weekly',
      '^/blog': 'weekly'
    }
  })

  const mainPages = await mainGenerator.generateFromPages(
    path.join(__dirname, '../sites/main/src/pages'),
    ['en', 'es', 'ru'] // Include all locales
  )
  
  const mainSitemap = mainGenerator.generateXml(mainPages)
  await mainGenerator.writeToFile(
    mainSitemap, 
    path.join(__dirname, '../sites/main/public/sitemap.xml')
  )
  
  console.log('✅ Main site sitemap generated')

  // Generate sitemap index for main site
  const indexGenerator = new SitemapGenerator({
    hostname: 'https://overx.ai'
  })

  const sitemapIndex = indexGenerator.generateIndex([
    { loc: 'https://overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://rates.overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://words.overx.ai/sitemap.xml', lastmod: new Date().toISOString() }
  ])

  await indexGenerator.writeToFile(
    sitemapIndex,
    path.join(__dirname, '../sites/main/public/sitemap-index.xml')
  )

  console.log('✅ Sitemap index generated')
  console.log('🎉 Main site sitemap generated successfully!')
}

generateMainSitemap().catch(console.error)