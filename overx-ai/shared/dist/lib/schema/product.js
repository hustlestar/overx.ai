"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = createProductSchema;
exports.createSoftwareApplicationSchema = createSoftwareApplicationSchema;
function createProductSchema(config) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: config.name,
        description: config.description,
        image: config.image,
        brand: {
            '@type': 'Brand',
            name: config.brand
        }
    };
    if (config.sku) {
        schema.sku = config.sku;
    }
    if (config.mpn) {
        schema.mpn = config.mpn;
    }
    if (config.offers) {
        const offers = Array.isArray(config.offers) ? config.offers : [config.offers];
        schema.offers = offers.map(offer => ({
            '@type': 'Offer',
            ...offer
        }));
    }
    if (config.aggregateRating) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ...config.aggregateRating
        };
    }
    if (config.review) {
        schema.review = config.review.map(review => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: review.author
            },
            reviewRating: {
                '@type': 'Rating',
                ...review.reviewRating
            },
            ...(review.reviewBody && { reviewBody: review.reviewBody }),
            ...(review.datePublished && { datePublished: review.datePublished })
        }));
    }
    return schema;
}
function createSoftwareApplicationSchema(config) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: config.name,
        description: config.description,
        image: config.image,
        applicationCategory: config.applicationCategory,
        offers: config.offers,
        aggregateRating: config.aggregateRating,
        review: config.review
    };
    if (config.operatingSystem) {
        schema.operatingSystem = config.operatingSystem;
    }
    if (config.applicationSubCategory) {
        schema.applicationSubCategory = config.applicationSubCategory;
    }
    if (config.permissions) {
        schema.permissions = config.permissions.join(', ');
    }
    if (config.screenshot) {
        schema.screenshot = config.screenshot;
    }
    return schema;
}
