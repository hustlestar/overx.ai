export interface OpenGraphData {
    type: 'website' | 'article' | 'product' | 'blog';
    title: string;
    description: string;
    image?: {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
    };
    siteName?: string;
    locale?: string;
    url?: string;
}
export interface TwitterCardData {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
}
export interface AlternateLanguage {
    hrefLang: string;
    href: string;
}
export interface StructuredData {
    '@context': 'https://schema.org';
    '@type': string;
    [key: string]: any;
}
export interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    openGraph?: Partial<OpenGraphData>;
    twitter?: Partial<TwitterCardData>;
    structuredData?: StructuredData[];
    alternates?: AlternateLanguage[];
    noindex?: boolean;
    nofollow?: boolean;
    additionalMetaTags?: Array<{
        name?: string;
        property?: string;
        content: string;
    }>;
}
export interface BreadcrumbItem {
    name: string;
    url?: string;
}
//# sourceMappingURL=types.d.ts.map