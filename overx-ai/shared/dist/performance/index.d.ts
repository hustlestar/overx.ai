import React from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    eager?: boolean;
    className?: string;
    ImageComponent?: React.ComponentType<any>;
    [key: string]: any;
}
declare const OptimizedImage: React.FC<OptimizedImageProps>;

interface LazyLoadProps {
    children: React.ReactNode;
    offset?: number;
    placeholder?: React.ReactNode;
    className?: string;
    once?: boolean;
}
declare const LazyLoad: React.FC<LazyLoadProps>;

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
declare const PreloadLink: React.FC<PreloadLinkProps>;
interface PrefetchLinkProps {
    urls: string[];
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
declare const PrefetchLink: React.FC<PrefetchLinkProps>;
interface PreconnectLinkProps {
    origins: string[];
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
declare const PreconnectLink: React.FC<PreconnectLinkProps>;

export { LazyLoad, OptimizedImage, PreconnectLink, PrefetchLink, PreloadLink };
