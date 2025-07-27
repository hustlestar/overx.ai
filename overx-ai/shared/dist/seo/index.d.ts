import React from 'react';
import { a as SEOProps, B as BreadcrumbItem } from '../types-wK6Gwk9L.js';
export { A as AlternateLanguage, O as OpenGraphData, S as StructuredData, T as TwitterCardData } from '../types-wK6Gwk9L.js';

interface BaseSEOWithHeadProps extends SEOProps {
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
declare const BaseSEO: React.FC<BaseSEOWithHeadProps>;

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
    separator?: string;
}
declare const Breadcrumbs: React.FC<BreadcrumbsProps>;

interface FAQItem {
    question: string;
    answer: string;
}
interface FAQProps {
    items: FAQItem[];
    className?: string;
}
declare const FAQ: React.FC<FAQProps>;

interface SmartLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    prefetch?: boolean;
    preload?: boolean;
    trackClick?: boolean;
    external?: boolean;
    rel?: string;
    LinkComponent?: React.ComponentType<any>;
    useRouter?: () => {
        pathname: string;
        prefetch: (url: string) => void;
    };
}
declare const SmartLink: React.FC<SmartLinkProps>;

export { BaseSEO, BreadcrumbItem, Breadcrumbs, FAQ, SEOProps, SmartLink };
