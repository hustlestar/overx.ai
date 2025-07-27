"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSEO = void 0;
const react_1 = __importDefault(require("react"));
const BaseSEO = ({ title, description, canonical, openGraph, twitter, structuredData, alternates, noindex = false, nofollow = false, additionalMetaTags = [], HeadComponent }) => {
    const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;
    const metaTags = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("title", null, title),
        react_1.default.createElement("meta", { name: "description", content: description }),
        react_1.default.createElement("meta", { name: "robots", content: robotsContent }),
        canonical && react_1.default.createElement("link", { rel: "canonical", href: canonical }),
        openGraph && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("meta", { property: "og:type", content: openGraph.type || 'website' }),
            react_1.default.createElement("meta", { property: "og:title", content: openGraph.title || title }),
            react_1.default.createElement("meta", { property: "og:description", content: openGraph.description || description }),
            openGraph.url && react_1.default.createElement("meta", { property: "og:url", content: openGraph.url }),
            openGraph.siteName && react_1.default.createElement("meta", { property: "og:site_name", content: openGraph.siteName }),
            openGraph.locale && react_1.default.createElement("meta", { property: "og:locale", content: openGraph.locale }),
            openGraph.image && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("meta", { property: "og:image", content: openGraph.image.url }),
                openGraph.image.width && (react_1.default.createElement("meta", { property: "og:image:width", content: String(openGraph.image.width) })),
                openGraph.image.height && (react_1.default.createElement("meta", { property: "og:image:height", content: String(openGraph.image.height) })),
                openGraph.image.alt && (react_1.default.createElement("meta", { property: "og:image:alt", content: openGraph.image.alt })))))),
        twitter && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("meta", { name: "twitter:card", content: twitter.card || 'summary' }),
            twitter.site && react_1.default.createElement("meta", { name: "twitter:site", content: twitter.site }),
            twitter.creator && react_1.default.createElement("meta", { name: "twitter:creator", content: twitter.creator }),
            twitter.title && react_1.default.createElement("meta", { name: "twitter:title", content: twitter.title }),
            twitter.description && react_1.default.createElement("meta", { name: "twitter:description", content: twitter.description }),
            twitter.image && react_1.default.createElement("meta", { name: "twitter:image", content: twitter.image }),
            twitter.imageAlt && react_1.default.createElement("meta", { name: "twitter:image:alt", content: twitter.imageAlt }))), alternates === null || alternates === void 0 ? void 0 :
        alternates.map((alternate) => (react_1.default.createElement("link", { key: alternate.hrefLang, rel: "alternate", hrefLang: alternate.hrefLang, href: alternate.href }))),
        additionalMetaTags.map((tag, index) => (react_1.default.createElement("meta", { key: index, ...tag }))), structuredData === null || structuredData === void 0 ? void 0 :
        structuredData.map((data, index) => (react_1.default.createElement("script", { key: index, type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(data) } })))));
    if (HeadComponent) {
        return react_1.default.createElement(HeadComponent, null, metaTags);
    }
    // Return meta tags without wrapper for SSR
    return metaTags;
};
exports.BaseSEO = BaseSEO;
