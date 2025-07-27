import { S as StructuredData } from '../../types-wK6Gwk9L.mjs';

interface OrganizationConfig {
    name: string;
    url: string;
    logo: string;
    sameAs?: string[];
    contactPoint?: {
        telephone: string;
        contactType: string;
        areaServed?: string | string[];
        availableLanguage?: string | string[];
    };
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
}
declare function createOrganizationSchema(config: OrganizationConfig): StructuredData;
declare function createWebSiteSchema(config: {
    name: string;
    url: string;
    potentialAction?: boolean;
}): StructuredData;

interface Author {
    name: string;
    url?: string;
    image?: string;
}
interface ArticleConfig {
    headline: string;
    description: string;
    image: string | string[];
    datePublished: string;
    dateModified?: string;
    author: Author | Author[];
    publisher: {
        name: string;
        logo: string;
    };
    mainEntityOfPage?: string;
    keywords?: string[];
    articleSection?: string;
    wordCount?: number;
}
declare function createArticleSchema(config: ArticleConfig): StructuredData;
declare function createBlogPostingSchema(config: ArticleConfig & {
    blogUrl?: string;
}): StructuredData;

interface Offer {
    price: string;
    priceCurrency: string;
    availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock' | 'https://schema.org/PreOrder';
    priceValidUntil?: string;
    url?: string;
}
interface Review {
    author: string;
    reviewRating: {
        ratingValue: number;
        bestRating?: number;
    };
    reviewBody?: string;
    datePublished?: string;
}
interface ProductConfig {
    name: string;
    description: string;
    image: string | string[];
    brand: string;
    sku?: string;
    mpn?: string;
    offers?: Offer | Offer[];
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
    };
    review?: Review[];
}
declare function createProductSchema(config: ProductConfig): StructuredData;
interface SoftwareApplicationConfig extends Omit<ProductConfig, 'sku' | 'mpn'> {
    applicationCategory: string;
    operatingSystem?: string;
    applicationSubCategory?: string;
    permissions?: string[];
    screenshot?: string | string[];
}
declare function createSoftwareApplicationSchema(config: SoftwareApplicationConfig): StructuredData;

export { createArticleSchema, createBlogPostingSchema, createOrganizationSchema, createProductSchema, createSoftwareApplicationSchema, createWebSiteSchema };
