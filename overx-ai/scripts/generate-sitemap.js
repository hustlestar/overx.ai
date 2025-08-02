const { SitemapGenerator } = require('../shared/dist/lib/sitemap/generator')
const { generateConverterSitemap } = require('./generate-converter-sitemap')
const path = require('path')

async function generateSitemaps() {
  console.log('🔍 Generating sitemaps...')

  // Main site sitemap
  const mainGenerator = new SitemapGenerator({
    hostname: 'https://overx.ai',
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
    path.join(__dirname, '../sites/main/src/pages')
  )
  
  const mainSitemap = mainGenerator.generateXml(mainPages)
  await mainGenerator.writeToFile(
    mainSitemap, 
    path.join(__dirname, '../sites/main/public/sitemap.xml')
  )
  
  console.log('✅ Main site sitemap generated')

  // Blog sitemap
  const blogGenerator = new SitemapGenerator({
    hostname: 'https://blog.overx.ai',
    changefreq: {
      '^/$': 'daily',
      '^/[0-9]{4}/': 'monthly'
    }
  })

  const blogPages = await blogGenerator.generateFromPages(
    path.join(__dirname, '../sites/blog/src/pages')
  )
  
  const blogSitemap = blogGenerator.generateXml(blogPages)
  await blogGenerator.writeToFile(
    blogSitemap,
    path.join(__dirname, '../sites/blog/public/sitemap.xml')
  )
  
  console.log('✅ Blog sitemap generated')

  // Converter sitemap with dynamic blog routes
  await generateConverterSitemap()
  console.log('✅ Converter site sitemap generated')

  // Generate sitemap index
  const indexGenerator = new SitemapGenerator({
    hostname: 'https://overx.ai'
  })

  const sitemapIndex = indexGenerator.generateIndex([
    { loc: 'https://overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://blog.overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://converter.overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://producta.overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://productb.overx.ai/sitemap.xml', lastmod: new Date().toISOString() },
    { loc: 'https://productc.overx.ai/sitemap.xml', lastmod: new Date().toISOString() }
  ])

  await indexGenerator.writeToFile(
    sitemapIndex,
    path.join(__dirname, '../sites/main/public/sitemap-index.xml')
  )

  console.log('✅ Sitemap index generated')
  console.log('🎉 All sitemaps generated successfully!')
}

generateSitemaps().catch(console.error)