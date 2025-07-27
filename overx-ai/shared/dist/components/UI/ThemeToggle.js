"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = ThemeToggle;
const react_1 = __importDefault(require("react"));
const useTheme_1 = require("../../hooks/useTheme");
function ThemeToggle() {
    const { theme, toggleTheme } = (0, useTheme_1.useTheme)();
    return (react_1.default.createElement("button", { onClick: toggleTheme, className: "p-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 light:bg-gray-100 light:border-gray-200 light:hover:bg-gray-200", "aria-label": theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode' }, theme === 'dark' ? (react_1.default.createElement("svg", { className: "w-5 h-5 text-gray-300 light:text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }))) : (react_1.default.createElement("svg", { className: "w-5 h-5 text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" })))));
}
