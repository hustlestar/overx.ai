export { BaseSEO, Breadcrumbs, FAQ, SmartLink } from './seo/index.mjs';
export { A as AlternateLanguage, B as BreadcrumbItem, O as OpenGraphData, a as SEOProps, S as StructuredData, T as TwitterCardData } from './types-wK6Gwk9L.mjs';
export { LazyLoad, OptimizedImage, PreconnectLink, PrefetchLink, PreloadLink } from './performance/index.mjs';
export { createArticleSchema, createBlogPostingSchema, createOrganizationSchema, createProductSchema, createSoftwareApplicationSchema, createWebSiteSchema } from './lib/schema/index.mjs';
import 'react';

interface OptimizationResult {
    score: number;
    suggestions: string[];
    issues: string[];
}
interface KeywordAnalysis {
    density: number;
    occurrences: number;
    prominence: number;
}
declare class ContentOptimizer {
    analyzeTitle(title: string, targetKeyword?: string): OptimizationResult;
    analyzeMetaDescription(description: string, targetKeyword?: string): OptimizationResult;
    analyzeContent(content: string, targetKeyword: string, secondaryKeywords?: string[]): {
        keywordAnalysis: KeywordAnalysis;
        readability: {
            score: number;
            level: string;
        };
        contentLength: {
            words: number;
            recommendation: string;
        };
        suggestions: string[];
    };
    analyzeHeadings(headings: Array<{
        level: number;
        text: string;
    }>, targetKeyword?: string): OptimizationResult;
    private countKeywordOccurrences;
    private estimateAvgSyllables;
    private getReadabilityLevel;
}

declare const keywordMap: {
    main: {
        primary: string[];
        secondary: string[];
        longtail: string[];
    };
    products: {
        'product-a': {
            primary: string[];
            features: string[];
            longtail: string[];
        };
        'product-b': {
            primary: string[];
            features: string[];
            longtail: string[];
        };
        'product-c': {
            primary: string[];
            features: string[];
            longtail: string[];
        };
    };
    blog: {
        categories: {
            'ai-trends': string[];
            'use-cases': string[];
            tutorials: string[];
            industry: string[];
        };
    };
};
declare function getKeywordsForPage(page: string): {
    primary: string[];
    secondary: string[];
    longtail: string[];
};

export { ContentOptimizer, getKeywordsForPage, keywordMap };
