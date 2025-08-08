interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: Array<{
        hreflang: string;
        href: string;
    }>;
}
interface SitemapConfig {
    hostname: string;
    exclude?: string[];
    include?: string[];
    priority?: {
        [pattern: string]: number;
    };
    changefreq?: {
        [pattern: string]: SitemapUrl['changefreq'];
    };
}
export declare class SitemapGenerator {
    private config;
    constructor(config: SitemapConfig);
    generateFromPages(pagesDir: string, locales?: string[]): Promise<SitemapUrl[]>;
    private pageToRoute;
    private getPriority;
    private getChangefreq;
    generateXml(urls: SitemapUrl[]): string;
    generateIndex(sitemaps: Array<{
        loc: string;
        lastmod?: string;
    }>): string;
    writeToFile(content: string, filePath: string): Promise<void>;
}
export {};
//# sourceMappingURL=generator.d.ts.map