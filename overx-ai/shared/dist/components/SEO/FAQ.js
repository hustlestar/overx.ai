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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
const react_1 = __importStar(require("react"));
const FAQ = ({ items, className = '' }) => {
    const [openItems, setOpenItems] = (0, react_1.useState)([]);
    const toggleItem = (index) => {
        setOpenItems(prev => prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]);
    };
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(structuredData) } }),
        react_1.default.createElement("div", { className: `faq ${className}` },
            react_1.default.createElement("div", { className: "space-y-4" }, items.map((item, index) => (react_1.default.createElement("div", { key: index, className: "border border-gray-200 rounded-lg overflow-hidden" },
                react_1.default.createElement("button", { className: "w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors", onClick: () => toggleItem(index), "aria-expanded": openItems.includes(index), "aria-controls": `faq-answer-${index}` },
                    react_1.default.createElement("h3", { className: "text-lg font-medium text-gray-900" }, item.question),
                    react_1.default.createElement("svg", { className: `w-5 h-5 text-gray-500 transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1.default.createElement("path", { d: "M19 9l-7 7-7-7" }))),
                react_1.default.createElement("div", { id: `faq-answer-${index}`, className: `px-6 pb-4 ${openItems.includes(index) ? 'block' : 'hidden'}` },
                    react_1.default.createElement("p", { className: "text-gray-700" }, item.answer)))))))));
};
exports.FAQ = FAQ;
