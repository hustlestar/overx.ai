interface OpenGraphData {
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
interface TwitterCardData {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
}
interface AlternateLanguage {
    hrefLang: string;
    href: string;
}
interface StructuredData {
    '@context': 'https://schema.org';
    '@type': string;
    [key: string]: any;
}
interface SEOProps {
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
interface BreadcrumbItem {
    name: string;
    url?: string;
}

export type { AlternateLanguage as A, BreadcrumbItem as B, OpenGraphData as O, StructuredData as S, TwitterCardData as T, SEOProps as a };
