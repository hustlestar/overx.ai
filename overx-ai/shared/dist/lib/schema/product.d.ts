import { StructuredData } from '../../components/SEO/types';
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
export declare function createProductSchema(config: ProductConfig): StructuredData;
interface SoftwareApplicationConfig extends Omit<ProductConfig, 'sku' | 'mpn'> {
    applicationCategory: string;
    operatingSystem?: string;
    applicationSubCategory?: string;
    permissions?: string[];
    screenshot?: string | string[];
}
export declare function createSoftwareApplicationSchema(config: SoftwareApplicationConfig): StructuredData;
export {};
//# sourceMappingURL=product.d.ts.map