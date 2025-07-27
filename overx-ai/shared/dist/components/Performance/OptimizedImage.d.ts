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
export declare const OptimizedImage: React.FC<OptimizedImageProps>;
export {};
//# sourceMappingURL=OptimizedImage.d.ts.map