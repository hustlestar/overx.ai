import React from 'react';
interface PreloadResource {
    href: string;
    as: 'script' | 'style' | 'image' | 'font' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
}
interface PreloadLinkProps {
    resources: PreloadResource[];
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
export declare const PreloadLink: React.FC<PreloadLinkProps>;
interface PrefetchLinkProps {
    urls: string[];
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
export declare const PrefetchLink: React.FC<PrefetchLinkProps>;
interface PreconnectLinkProps {
    origins: string[];
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
export declare const PreconnectLink: React.FC<PreconnectLinkProps>;
export {};
//# sourceMappingURL=PreloadLink.d.ts.map