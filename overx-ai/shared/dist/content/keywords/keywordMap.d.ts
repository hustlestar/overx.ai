export declare const keywordMap: {
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
export declare function getKeywordsForPage(page: string): {
    primary: string[];
    secondary: string[];
    longtail: string[];
};
//# sourceMappingURL=keywordMap.d.ts.map