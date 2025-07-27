import { StructuredData } from '../../components/SEO/types';
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
export declare function createArticleSchema(config: ArticleConfig): StructuredData;
export declare function createBlogPostingSchema(config: ArticleConfig & {
    blogUrl?: string;
}): StructuredData;
export {};
//# sourceMappingURL=article.d.ts.map