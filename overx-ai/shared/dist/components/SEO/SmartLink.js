"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartLink = void 0;
const react_1 = __importDefault(require("react"));
const SmartLink = ({ href, children, className = '', prefetch = true, preload = false, trackClick = true, external = false, rel, LinkComponent, useRouter }) => {
    const isExternal = external || href.startsWith('http');
    const router = useRouter === null || useRouter === void 0 ? void 0 : useRouter();
    const isActive = (router === null || router === void 0 ? void 0 : router.pathname) === href;
    const handleClick = (e) => {
        if (trackClick && typeof window !== 'undefined' && 'gtag' in window) {
            window.gtag('event', 'click', {
                event_category: 'Internal Link',
                event_label: href,
                transport_type: 'beacon'
            });
        }
        if (preload && !isExternal && router) {
            router.prefetch(href);
        }
    };
    const relValue = rel || (isExternal ? 'noopener noreferrer' : undefined);
    if (isExternal) {
        return (react_1.default.createElement("a", { href: href, className: className, onClick: handleClick, target: "_blank", rel: relValue, "aria-current": isActive ? 'page' : undefined }, children));
    }
    // Use provided Link component or fallback to regular anchor
    if (LinkComponent) {
        const linkProps = {
            href,
            className,
            onClick: handleClick,
            rel: relValue,
            'aria-current': isActive ? 'page' : undefined
        };
        return (react_1.default.createElement(LinkComponent, { ...linkProps }, children));
    }
    // Fallback to regular anchor tag
    return (react_1.default.createElement("a", { href: href, className: className, onClick: handleClick, rel: relValue, "aria-current": isActive ? 'page' : undefined }, children));
};
exports.SmartLink = SmartLink;
