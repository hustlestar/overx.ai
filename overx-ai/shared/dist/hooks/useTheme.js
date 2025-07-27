"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
const react_1 = require("react");
// Storage key - same across all domains for consistent UX
const THEME_STORAGE_KEY = 'theme-storage';
function useTheme() {
    const [theme, setThemeState] = (0, react_1.useState)('dark');
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setMounted(true);
        // Load theme from localStorage
        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setThemeState(parsed.state.theme);
                // Apply theme class to document
                if (parsed.state.theme === 'light') {
                    document.documentElement.classList.add('light');
                }
                else {
                    document.documentElement.classList.remove('light');
                }
            }
            else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultTheme = prefersDark ? 'dark' : 'light';
                setThemeState(defaultTheme);
                // Save default to localStorage
                const storage = {
                    state: { theme: defaultTheme },
                    version: 0
                };
                localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storage));
                if (defaultTheme === 'light') {
                    document.documentElement.classList.add('light');
                }
            }
        }
        catch (error) {
            console.error('Failed to load theme:', error);
        }
    }, []);
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        // Update localStorage in zustand format for compatibility
        const storage = {
            state: { theme: newTheme },
            version: 0
        };
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storage));
        // Update document class
        if (newTheme === 'light') {
            document.documentElement.classList.add('light');
        }
        else {
            document.documentElement.classList.remove('light');
        }
    };
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    // Prevent flash during SSR
    if (!mounted) {
        return { theme: 'dark', toggleTheme, setTheme };
    }
    return { theme, toggleTheme, setTheme };
}
