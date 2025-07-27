import { StructuredData } from '../../components/SEO/types';
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
export declare function createOrganizationSchema(config: OrganizationConfig): StructuredData;
export declare function createWebSiteSchema(config: {
    name: string;
    url: string;
    potentialAction?: boolean;
}): StructuredData;
export {};
//# sourceMappingURL=organization.d.ts.map