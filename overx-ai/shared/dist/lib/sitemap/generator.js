"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
class SitemapGenerator {
    constructor(config) {
        this.config = config;
    }
    async generateFromPages(pagesDir) {
        const pages = await (0, glob_1.glob)('**/*.{ts,tsx,js,jsx}', {
            cwd: pagesDir,
            ignore: [
                '**/api/**',
                '**/_*',
                '**/*.test.*',
                '**/*.spec.*',
                ...(this.config.exclude || [])
            ]
        });
        return pages.map(page => {
            const route = this.pageToRoute(page);
            return {
                loc: route,
                lastmod: new Date().toISOString(),
                changefreq: this.getChangefreq(route),
                priority: this.getPriority(route)
            };
        });
    }
    pageToRoute(page) {
        let route = page
            .replace(/\.(ts|tsx|js|jsx)$/, '')
            .replace(/\/index$/, '')
            .replace(/\[([^\]]+)\]/g, ':$1');
        if (route === 'index') {
            route = '';
        }
        return `/${route}`;
    }
    getPriority(route) {
        if (this.config.priority) {
            for (const [pattern, priority] of Object.entries(this.config.priority)) {
                if (route.match(pattern)) {
                    return priority;
                }
            }
        }
        // Default priorities
        if (route === '/')
            return 1.0;
        if (route.startsWith('/products'))
            return 0.9;
        if (route.startsWith('/blog'))
            return 0.8;
        if (route.startsWith('/about'))
            return 0.7;
        return 0.5;
    }
    getChangefreq(route) {
        if (this.config.changefreq) {
            for (const [pattern, freq] of Object.entries(this.config.changefreq)) {
                if (route.match(pattern)) {
                    return freq;
                }
            }
        }
        // Default frequencies
        if (route === '/')
            return 'daily';
        if (route.startsWith('/blog'))
            return 'weekly';
        if (route.startsWith('/products'))
            return 'weekly';
        return 'monthly';
    }
    generateXml(urls) {
        const urlElements = urls.map(url => {
            const alternateLinks = url.alternates
                ? url.alternates.map(alt => `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`).join('\n    ')
                : '';
            return `  <url>
    <loc>${this.config.hostname}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${alternateLinks}
  </url>`;
        }).join('\n');
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>`;
    }
    generateIndex(sitemaps) {
        const sitemapElements = sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n');
        return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
    }
    async writeToFile(content, filePath) {
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        fs_1.default.writeFileSync(filePath, content, 'utf-8');
    }
}
exports.SitemapGenerator = SitemapGenerator;
