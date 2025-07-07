import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: Array<{
    hreflang: string
    href: string
  }>
}

interface SitemapConfig {
  hostname: string
  exclude?: string[]
  include?: string[]
  priority?: {
    [pattern: string]: number
  }
  changefreq?: {
    [pattern: string]: SitemapUrl['changefreq']
  }
}

export class SitemapGenerator {
  private config: SitemapConfig

  constructor(config: SitemapConfig) {
    this.config = config
  }

  async generateFromPages(pagesDir: string): Promise<SitemapUrl[]> {
    const pages = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: pagesDir,
      ignore: [
        '**/api/**',
        '**/_*',
        '**/*.test.*',
        '**/*.spec.*',
        ...(this.config.exclude || [])
      ]
    })

    return pages.map(page => {
      const route = this.pageToRoute(page)
      return {
        loc: route,
        lastmod: new Date().toISOString(),
        changefreq: this.getChangefreq(route),
        priority: this.getPriority(route)
      }
    })
  }

  private pageToRoute(page: string): string {
    let route = page
      .replace(/\.(ts|tsx|js|jsx)$/, '')
      .replace(/\/index$/, '')
      .replace(/\[([^\]]+)\]/g, ':$1')

    if (route === 'index') {
      route = ''
    }

    return `/${route}`
  }

  private getPriority(route: string): number {
    if (this.config.priority) {
      for (const [pattern, priority] of Object.entries(this.config.priority)) {
        if (route.match(pattern)) {
          return priority
        }
      }
    }

    // Default priorities
    if (route === '/') return 1.0
    if (route.startsWith('/products')) return 0.9
    if (route.startsWith('/blog')) return 0.8
    if (route.startsWith('/about')) return 0.7
    return 0.5
  }

  private getChangefreq(route: string): SitemapUrl['changefreq'] {
    if (this.config.changefreq) {
      for (const [pattern, freq] of Object.entries(this.config.changefreq)) {
        if (route.match(pattern)) {
          return freq
        }
      }
    }

    // Default frequencies
    if (route === '/') return 'daily'
    if (route.startsWith('/blog')) return 'weekly'
    if (route.startsWith('/products')) return 'weekly'
    return 'monthly'
  }

  generateXml(urls: SitemapUrl[]): string {
    const urlElements = urls.map(url => {
      const alternateLinks = url.alternates
        ? url.alternates.map(alt => 
            `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
          ).join('\n    ')
        : ''

      return `  <url>
    <loc>${this.config.hostname}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${alternateLinks}
  </url>`
    }).join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>`
  }

  generateIndex(sitemaps: Array<{ loc: string; lastmod?: string }>): string {
    const sitemapElements = sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`
  }

  async writeToFile(content: string, filePath: string): Promise<void> {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, content, 'utf-8')
  }
}