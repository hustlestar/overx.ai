import React from 'react';
import { SEOProps } from './types';
interface BaseSEOWithHeadProps extends SEOProps {
    HeadComponent?: React.ComponentType<{
        children: React.ReactNode;
    }>;
}
export declare const BaseSEO: React.FC<BaseSEOWithHeadProps>;
export {};
//# sourceMappingURL=BaseSEO.d.ts.map