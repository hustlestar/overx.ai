"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleSchema = createArticleSchema;
exports.createBlogPostingSchema = createBlogPostingSchema;
function createArticleSchema(config) {
    const authors = Array.isArray(config.author) ? config.author : [config.author];
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.headline,
        description: config.description,
        image: config.image,
        datePublished: config.datePublished,
        dateModified: config.dateModified || config.datePublished,
        author: authors.map(author => ({
            '@type': 'Person',
            name: author.name,
            ...(author.url && { url: author.url }),
            ...(author.image && { image: author.image })
        })),
        publisher: {
            '@type': 'Organization',
            name: config.publisher.name,
            logo: {
                '@type': 'ImageObject',
                url: config.publisher.logo
            }
        }
    };
    if (config.mainEntityOfPage) {
        schema.mainEntityOfPage = {
            '@type': 'WebPage',
            '@id': config.mainEntityOfPage
        };
    }
    if (config.keywords) {
        schema.keywords = config.keywords.join(', ');
    }
    if (config.articleSection) {
        schema.articleSection = config.articleSection;
    }
    if (config.wordCount) {
        schema.wordCount = config.wordCount;
    }
    return schema;
}
function createBlogPostingSchema(config) {
    const schema = createArticleSchema(config);
    schema['@type'] = 'BlogPosting';
    if (config.blogUrl) {
        schema.isPartOf = {
            '@type': 'Blog',
            '@id': config.blogUrl
        };
    }
    return schema;
}
