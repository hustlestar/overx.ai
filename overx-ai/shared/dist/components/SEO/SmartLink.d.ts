import React from 'react';
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
export declare const SmartLink: React.FC<SmartLinkProps>;
export {};
//# sourceMappingURL=SmartLink.d.ts.map