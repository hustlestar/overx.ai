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
        // Clean up any existing classes on mount
        document.documentElement.classList.remove('light', 'dark');
        // Load theme from localStorage
        const loadTheme = () => {
            try {
                const stored = localStorage.getItem(THEME_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setThemeState(parsed.state.theme);
                    // Apply theme class to document
                    document.documentElement.classList.remove('light', 'dark');
                    if (parsed.state.theme === 'dark') {
                        document.documentElement.classList.add('dark');
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
                    document.documentElement.classList.remove('light', 'dark');
                    if (defaultTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    }
                }
            }
            catch (error) {
                console.error('Failed to load theme:', error);
            }
        };
        loadTheme();
        // Listen for storage changes (from other tabs/windows)
        const handleStorageChange = (e) => {
            if (e.key === THEME_STORAGE_KEY) {
                loadTheme();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        // Listen for theme changes in the same tab
        const handleThemeChange = (e) => {
            setThemeState(e.detail);
        };
        window.addEventListener('theme-change', handleThemeChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('theme-change', handleThemeChange);
        };
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
        document.documentElement.classList.remove('light', 'dark');
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        // Dispatch custom event for immediate updates in the same tab
        window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
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
