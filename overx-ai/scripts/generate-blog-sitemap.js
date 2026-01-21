const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const BASE_URL = 'https://blog.overx.ai'
const LOCALES = ['en', 'es', 'ru']
const POSTS_DIRECTORY = path.join(__dirname, '../sites/blog/content/posts')
const CATEGORIES_PATH = path.join(__dirname, '../sites/blog/content/categories/categories.json')
const OUTPUT_PATH = path.join(__dirname, '../sites/blog/public/sitemap.xml')

/**
 * Get all post slugs for a specific locale
 * @param {string} locale - The locale (en, es, ru)
 * @returns {string[]} Array of post slugs
 */
function getPostSlugs(locale) {
  const localePath = path.join(POSTS_DIRECTORY, locale)

  if (!fs.existsSync(localePath)) {
    console.log(`  Warning: No posts directory for locale "${locale}"`)
    return []
  }

  return fs.readdirSync(localePath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

/**
 * Get post metadata (frontmatter) for a specific post
 * @param {string} slug - The post slug
 * @param {string} locale - The locale
 * @returns {object|null} Post metadata or null if not found
 */
function getPostMetadata(slug, locale) {
  const fullPath = path.join(POSTS_DIRECTORY, locale, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug,
      date: data.date || new Date().toISOString(),
      lastModified: data.lastModified || data.date || new Date().toISOString()
    }
  } catch (error) {
    console.error(`  Error reading post ${slug} (${locale}):`, error.message)
    return null
  }
}

/**
 * Check if a post exists in a specific locale
 * @param {string} slug - The post slug
 * @param {string} locale - The locale
 * @returns {boolean}
 */
function postExistsInLocale(slug, locale) {
  const fullPath = path.join(POSTS_DIRECTORY, locale, `${slug}.md`)
  return fs.existsSync(fullPath)
}

/**
 * Generate URL for a specific locale
 * @param {string} pathStr - The path (e.g., /post/my-post)
 * @param {string} locale - The locale
 * @returns {string} Full URL
 */
function generateUrl(pathStr, locale) {
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  return `${BASE_URL}${localePrefix}${pathStr}`
}

/**
 * Generate hreflang alternate links for a URL
 * @param {string} pathStr - The path
 * @param {string[]} availableLocales - Locales where this content exists
 * @returns {string} XML string of xhtml:link elements
 */
function generateAlternateLinks(pathStr, availableLocales) {
  return availableLocales
    .map(locale => {
      const url = generateUrl(pathStr, locale)
      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${url}"/>`
    })
    .join('\n')
}

/**
 * Generate the full sitemap XML
 * @returns {Promise<string>} The sitemap XML content
 */
async function generateSitemapXml() {
  const now = new Date().toISOString()
  const urlEntries = []

  // 1. Homepage for each locale
  console.log('  Adding homepage URLs...')
  for (const locale of LOCALES) {
    const alternates = generateAlternateLinks('', LOCALES)
    urlEntries.push(`  <url>
    <loc>${generateUrl('', locale)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>`)
  }

  // 2. Collect all unique post slugs across all locales
  console.log('  Scanning posts in all locales...')
  const allSlugs = new Set()
  for (const locale of LOCALES) {
    const slugs = getPostSlugs(locale)
    slugs.forEach(slug => allSlugs.add(slug))
    console.log(`    Found ${slugs.length} posts in "${locale}" locale`)
  }

  console.log(`  Total unique posts: ${allSlugs.size}`)

  // 3. Generate URLs for each post in each locale where it exists
  console.log('  Generating post URLs...')
  for (const slug of allSlugs) {
    for (const locale of LOCALES) {
      const metadata = getPostMetadata(slug, locale)

      if (!metadata) {
        continue // Skip if post doesn't exist in this locale
      }

      // Find all locales where this post exists
      const availableLocales = LOCALES.filter(l => postExistsInLocale(slug, l))
      const alternates = generateAlternateLinks(`/post/${slug}`, availableLocales)

      urlEntries.push(`  <url>
    <loc>${generateUrl(`/post/${slug}`, locale)}</loc>
    <lastmod>${metadata.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${alternates}
  </url>`)
    }
  }

  // 4. Category pages
  console.log('  Adding category page URLs...')
  if (fs.existsSync(CATEGORIES_PATH)) {
    try {
      const categoriesData = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf8'))
      const categories = categoriesData.categories || []
      console.log(`    Found ${categories.length} categories`)

      for (const category of categories) {
        for (const locale of LOCALES) {
          const categoryPath = `/category/${category.slug}`
          const alternates = generateAlternateLinks(categoryPath, LOCALES)
          urlEntries.push(`  <url>
    <loc>${generateUrl(categoryPath, locale)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
${alternates}
  </url>`)
        }
      }
    } catch (error) {
      console.error('  Error reading categories:', error.message)
    }
  } else {
    console.log('  Warning: Categories file not found')
  }

  // 5. Static pages (archive, authors, etc.)
  console.log('  Adding static page URLs...')
  const staticPages = [
    { path: '/archive', priority: 0.6, changefreq: 'weekly' },
    { path: '/authors', priority: 0.5, changefreq: 'monthly' }
  ]

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      const alternates = generateAlternateLinks(page.path, LOCALES)
      urlEntries.push(`  <url>
    <loc>${generateUrl(page.path, locale)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`)
    }
  }

  // 6. Build final XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`

  return sitemap
}

/**
 * Main function to generate and write the sitemap
 */
async function generateBlogSitemap() {
  console.log('Generating blog sitemap...')
  console.log(`  Posts directory: ${POSTS_DIRECTORY}`)
  console.log(`  Output path: ${OUTPUT_PATH}`)

  // Check if posts directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    console.error(`Error: Posts directory not found: ${POSTS_DIRECTORY}`)
    process.exit(1)
  }

  try {
    const sitemap = await generateSitemapXml()

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write sitemap
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf-8')

    // Count URLs
    const urlCount = (sitemap.match(/<url>/g) || []).length

    console.log(`Blog sitemap generated successfully!`)
    console.log(`  Total URLs: ${urlCount}`)
    console.log(`  Output: ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

// Export for use as module
module.exports = { generateBlogSitemap }

// Run directly if executed as script
if (require.main === module) {
  generateBlogSitemap()
}
