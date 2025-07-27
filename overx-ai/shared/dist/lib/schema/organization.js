"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganizationSchema = createOrganizationSchema;
exports.createWebSiteSchema = createWebSiteSchema;
function createOrganizationSchema(config) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: config.name,
        url: config.url,
        logo: config.logo
    };
    if (config.sameAs) {
        schema.sameAs = config.sameAs;
    }
    if (config.contactPoint) {
        schema.contactPoint = {
            '@type': 'ContactPoint',
            ...config.contactPoint
        };
    }
    if (config.address) {
        schema.address = {
            '@type': 'PostalAddress',
            ...config.address
        };
    }
    return schema;
}
function createWebSiteSchema(config) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: config.name,
        url: config.url
    };
    if (config.potentialAction) {
        schema.potentialAction = {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${config.url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        };
    }
    return schema;
}
