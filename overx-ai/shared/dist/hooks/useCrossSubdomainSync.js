"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCrossSubdomainSync = useCrossSubdomainSync;
const react_1 = require("react");
const router_1 = require("next/router");
const useTheme_1 = require("./useTheme");
// Cross-subdomain sync for theme and language
function useCrossSubdomainSync() {
    const { theme, setTheme } = (0, useTheme_1.useTheme)();
    const router = (0, router_1.useRouter)();
    const { locale } = router;
    // Sync to cookies (works across subdomains)
    (0, react_1.useEffect)(() => {
        // Set cookies that work across all subdomains
        document.cookie = `overx-theme=${theme}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`;
        document.cookie = `overx-locale=${locale}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`;
    }, [theme, locale]);
    // Read cookies on mount to sync initial state
    (0, react_1.useEffect)(() => {
        var _a;
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        // Sync theme from cookie
        const cookieTheme = cookies['overx-theme'];
        if (cookieTheme && cookieTheme !== theme) {
            setTheme(cookieTheme);
        }
        // Sync locale from cookie
        const cookieLocale = cookies['overx-locale'];
        if (cookieLocale && cookieLocale !== locale && ((_a = router.locales) === null || _a === void 0 ? void 0 : _a.includes(cookieLocale))) {
            // Change locale without full page reload
            router.push(router.pathname, router.asPath, { locale: cookieLocale });
        }
    }, []);
    // BroadcastChannel for same-origin sync (between tabs)
    (0, react_1.useEffect)(() => {
        if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('overx-sync');
            // Listen for changes from other tabs
            channel.onmessage = (event) => {
                var _a;
                const data = event.data;
                if (data.theme !== theme) {
                    setTheme(data.theme);
                }
                if (data.locale !== locale && ((_a = router.locales) === null || _a === void 0 ? void 0 : _a.includes(data.locale))) {
                    router.push(router.pathname, router.asPath, { locale: data.locale });
                }
            };
            // Broadcast current state
            const broadcastState = () => {
                channel.postMessage({ theme, locale });
            };
            // Send current state on mount and changes
            broadcastState();
            return () => {
                channel.close();
            };
        }
    }, [theme, locale, setTheme, router]);
    // Storage event for cross-tab sync (fallback)
    (0, react_1.useEffect)(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'theme-storage' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed.state.theme !== theme) {
                        setTheme(parsed.state.theme);
                    }
                }
                catch (error) {
                    console.error('Failed to parse theme storage:', error);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [theme, setTheme]);
}
