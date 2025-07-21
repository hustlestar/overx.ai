import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts, getCategories } from '../../lib/blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://blog.overx.ai'
  const locales = ['en', 'es', 'ru']
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`
  
  // Homepage for each locale
  for (const locale of locales) {
    sitemap += `
  <url>
    <loc>${baseUrl}${locale === 'en' ? '' : `/${locale}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>`
    
    // Add alternate language links
    for (const altLocale of locales) {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altLocale === 'en' ? '' : `/${altLocale}`}"/>`
    }
    
    sitemap += `
  </url>`
  }
  
  // Category pages
  const categories = Object.values(getCategories())
  for (const category of categories) {
    for (const locale of locales) {
      sitemap += `
  <url>
    <loc>${baseUrl}${locale === 'en' ? '' : `/${locale}`}/category/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`
      
      // Add alternate language links
      for (const altLocale of locales) {
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altLocale === 'en' ? '' : `/${altLocale}`}/category/${category.slug}"/>`
      }
      
      sitemap += `
  </url>`
    }
  }
  
  // Blog posts
  for (const locale of locales) {
    const posts = await getAllPosts(locale)
    
    for (const post of posts) {
      sitemap += `
  <url>
    <loc>${baseUrl}${locale === 'en' ? '' : `/${locale}`}/post/${post.slug}</loc>
    <lastmod>${post.lastModified || post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`
      
      // Check if the same post exists in other languages
      for (const altLocale of locales) {
        if (altLocale !== locale) {
          const altPost = await getPostBySlug(post.slug, altLocale)
          if (altPost) {
            sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altLocale === 'en' ? '' : `/${altLocale}`}/post/${post.slug}"/>`
          }
        }
      }
      
      sitemap += `
  </url>`
    }
  }
  
  // Static pages
  const staticPages = [
    { path: '/archive', priority: 0.6 },
    { path: '/authors', priority: 0.5 }
  ]
  
  for (const page of staticPages) {
    for (const locale of locales) {
      sitemap += `
  <url>
    <loc>${baseUrl}${locale === 'en' ? '' : `/${locale}`}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>`
      
      // Add alternate language links
      for (const altLocale of locales) {
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altLocale === 'en' ? '' : `/${altLocale}`}${page.path}"/>`
      }
      
      sitemap += `
  </url>`
    }
  }
  
  sitemap += `
</urlset>`
  
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=600')
  res.write(sitemap)
  res.end()
}

// Import this function at the top
import { getPostBySlug } from '../../lib/blog'