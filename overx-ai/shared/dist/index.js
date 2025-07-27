"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeywordsForPage = exports.keywordMap = exports.ContentOptimizer = exports.useTheme = void 0;
// SEO Components
__exportStar(require("./components/SEO"), exports);
// Performance Components
__exportStar(require("./components/Performance"), exports);
// UI Components
__exportStar(require("./components/UI"), exports);
// Hooks
var useTheme_1 = require("./hooks/useTheme");
Object.defineProperty(exports, "useTheme", { enumerable: true, get: function () { return useTheme_1.useTheme; } });
// Schema utilities
__exportStar(require("./lib/schema"), exports);
// SEO utilities
var contentOptimizer_1 = require("./lib/seo/contentOptimizer");
Object.defineProperty(exports, "ContentOptimizer", { enumerable: true, get: function () { return contentOptimizer_1.ContentOptimizer; } });
// Content utilities
var keywordMap_1 = require("./content/keywords/keywordMap");
Object.defineProperty(exports, "keywordMap", { enumerable: true, get: function () { return keywordMap_1.keywordMap; } });
Object.defineProperty(exports, "getKeywordsForPage", { enumerable: true, get: function () { return keywordMap_1.getKeywordsForPage; } });
