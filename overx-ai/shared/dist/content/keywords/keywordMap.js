"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordMap = void 0;
exports.getKeywordsForPage = getKeywordsForPage;
exports.keywordMap = {
    main: {
        primary: ['AI solutions', 'artificial intelligence platform', 'business automation'],
        secondary: ['machine learning', 'enterprise AI', 'workflow automation', 'predictive analytics'],
        longtail: [
            'AI solutions for business',
            'enterprise artificial intelligence platform',
            'automated workflow management system',
            'AI-powered business intelligence'
        ]
    },
    products: {
        'product-a': {
            primary: ['NLP platform', 'natural language processing', 'text analytics'],
            features: ['sentiment analysis', 'entity extraction', 'language detection', 'text classification'],
            longtail: [
                'enterprise NLP platform',
                'natural language processing for business',
                'automated text analysis software'
            ]
        },
        'product-b': {
            primary: ['process automation', 'RPA', 'workflow automation'],
            features: ['task automation', 'business process management', 'robotic process automation'],
            longtail: [
                'intelligent process automation platform',
                'enterprise RPA solutions',
                'automated workflow management'
            ]
        },
        'product-c': {
            primary: ['predictive analytics', 'forecasting platform', 'data analytics'],
            features: ['time series analysis', 'demand forecasting', 'predictive modeling', 'data visualization'],
            longtail: [
                'AI predictive analytics platform',
                'business forecasting software',
                'enterprise data analytics solution'
            ]
        }
    },
    blog: {
        categories: {
            'ai-trends': ['AI trends', 'artificial intelligence news', 'machine learning updates'],
            'use-cases': ['AI use cases', 'business automation examples', 'success stories'],
            'tutorials': ['AI tutorials', 'how to guides', 'implementation tips'],
            'industry': ['industry insights', 'sector analysis', 'market trends']
        }
    }
};
function getKeywordsForPage(page) {
    // Extract keywords based on page path
    const path = page.toLowerCase();
    if (path === '/' || path === '') {
        return exports.keywordMap.main;
    }
    if (path.includes('product-a')) {
        const product = exports.keywordMap.products['product-a'];
        return {
            primary: product.primary,
            secondary: product.features,
            longtail: product.longtail
        };
    }
    if (path.includes('product-b')) {
        const product = exports.keywordMap.products['product-b'];
        return {
            primary: product.primary,
            secondary: product.features,
            longtail: product.longtail
        };
    }
    if (path.includes('product-c')) {
        const product = exports.keywordMap.products['product-c'];
        return {
            primary: product.primary,
            secondary: product.features,
            longtail: product.longtail
        };
    }
    // Default fallback
    return {
        primary: exports.keywordMap.main.primary,
        secondary: exports.keywordMap.main.secondary,
        longtail: exports.keywordMap.main.longtail
    };
}
