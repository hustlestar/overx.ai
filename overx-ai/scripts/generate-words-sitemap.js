#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Import blog metadata (we'll need to handle this as CommonJS)
const metadataPath = path.join(__dirname, '../sites/words/src/content/blog/metadata.ts')

// Read and parse the TypeScript file
const metadataContent = fs.readFileSync(metadataPath, 'utf8')

// Extract blog post slugs from the metadata
const slugMatches = metadataContent.match(/slug:\s*['"]([^'"]+)['"]/g)
const blogPostSlugs = slugMatches ? slugMatches.map(match => match.match(/['"]([^'"]+)['"]/)[1]) : []

// Categories from blogConfig
const categories = [
  'spaced-repetition',
  'vocabulary',
  'learning-science',
  'memory',
  'telegram',
  'ai-learning',
  'mobile-education',
  'accessibility',
  'multilingual',
  'language-strategies',
  'polyglot',
  'learning-tips',
  'context',
  'natural-language-processing'
]

const locales = ['en', 'es', 'ru']
const baseUrl = 'https://words.overx.ai'
const currentDate = new Date().toISOString()

// Static pages
const staticPages = [
  { path: '/', changefreq: 'daily', priority: '1' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.5' },
  { path: '/features', changefreq: 'weekly', priority: '0.5' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' }
]

// Build sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`

// Add static pages
staticPages.forEach(page => {
  sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${locales.map(locale =>
      `<xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}${locale === 'en' ? '' : `/${locale}`}${page.path}"/>`
    ).join('\n    ')}
  </url>\n`
})

// Add blog posts for all locales
blogPostSlugs.forEach(slug => {
  locales.forEach(locale => {
    const path = locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`
    sitemap += `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${locales.map(l => {
      const altPath = l === 'en' ? `/blog/${slug}` : `/${l}/blog/${slug}`
      return `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}${altPath}"/>`
    }).join('\n    ')}
  </url>\n`
  })
})

// Add category pages for all locales
categories.forEach(category => {
  locales.forEach(locale => {
    const path = locale === 'en' ? `/blog/category/${category}` : `/${locale}/blog/category/${category}`
    sitemap += `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    ${locales.map(l => {
      const altPath = l === 'en' ? `/blog/category/${category}` : `/${l}/blog/category/${category}`
      return `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}${altPath}"/>`
    }).join('\n    ')}
  </url>\n`
  })
})

sitemap += `</urlset>`

// Write sitemap
const sitemapPath = path.join(__dirname, '../sites/words/public/sitemap.xml')
fs.writeFileSync(sitemapPath, sitemap)

console.log('✅ Words sitemap generated successfully!')
console.log(`   - ${staticPages.length} static pages`)
console.log(`   - ${blogPostSlugs.length * locales.length} blog post URLs`)
console.log(`   - ${categories.length * locales.length} category URLs`)
console.log(`   - Total: ${staticPages.length + (blogPostSlugs.length * locales.length) + (categories.length * locales.length)} URLs`)
