"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconnectLink = exports.PrefetchLink = exports.PreloadLink = void 0;
const react_1 = __importDefault(require("react"));
const PreloadLink = ({ resources, HeadComponent }) => {
    const links = (react_1.default.createElement(react_1.default.Fragment, null, resources.map((resource, index) => (react_1.default.createElement("link", { key: index, rel: "preload", href: resource.href, as: resource.as, type: resource.type, crossOrigin: resource.crossOrigin })))));
    return HeadComponent ? react_1.default.createElement(HeadComponent, null, links) : links;
};
exports.PreloadLink = PreloadLink;
const PrefetchLink = ({ urls, HeadComponent }) => {
    const links = (react_1.default.createElement(react_1.default.Fragment, null, urls.map((url, index) => (react_1.default.createElement("link", { key: index, rel: "prefetch", href: url })))));
    return HeadComponent ? react_1.default.createElement(HeadComponent, null, links) : links;
};
exports.PrefetchLink = PrefetchLink;
const PreconnectLink = ({ origins, HeadComponent }) => {
    const links = (react_1.default.createElement(react_1.default.Fragment, null, origins.map((origin, index) => (react_1.default.createElement("link", { key: index, rel: "preconnect", href: origin })))));
    return HeadComponent ? react_1.default.createElement(HeadComponent, null, links) : links;
};
exports.PreconnectLink = PreconnectLink;
