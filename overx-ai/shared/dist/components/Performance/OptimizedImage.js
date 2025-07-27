"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizedImage = void 0;
const react_1 = __importDefault(require("react"));
const OptimizedImage = ({ src, alt, width, height, priority = false, eager = false, className = '', ImageComponent, ...rest }) => {
    const loading = priority || eager ? 'eager' : 'lazy';
    if (ImageComponent) {
        return (react_1.default.createElement(ImageComponent, { src: src, alt: alt, width: width, height: height, loading: loading, priority: priority, className: className, placeholder: "blur", quality: 85, ...rest }));
    }
    // Fallback to regular img tag
    return (react_1.default.createElement("img", { src: src, alt: alt, width: width, height: height, loading: loading, className: className, ...rest }));
};
exports.OptimizedImage = OptimizedImage;
