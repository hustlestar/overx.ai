"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const Breadcrumbs = ({ items, className = '', separator = '›' }) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.url && { item: item.url })
        }))
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(structuredData) } }),
        react_1.default.createElement("nav", { "aria-label": "Breadcrumb", className: `breadcrumbs ${className}` },
            react_1.default.createElement("ol", { className: "flex items-center space-x-2" }, items.map((item, index) => (react_1.default.createElement("li", { key: index, className: "flex items-center" },
                index > 0 && (react_1.default.createElement("span", { className: "mx-2 text-gray-500", "aria-hidden": "true" }, separator)),
                item.url && index < items.length - 1 ? (react_1.default.createElement(link_1.default, { href: item.url, className: "text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors" }, item.name)) : (react_1.default.createElement("span", { className: "text-gray-900 dark:text-white", "aria-current": index === items.length - 1 ? 'page' : undefined }, item.name)))))))));
};
exports.Breadcrumbs = Breadcrumbs;
