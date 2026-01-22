// SEO Components
export * from './components/SEO'

// Performance Components
export * from './components/Performance'

// UI Components
export * from './components/UI'

// Blog Components
export * from './components/Blog'

// Hooks
export { useTheme } from './hooks/useTheme'
export { useLanguageSync } from './hooks/useLanguageSync'
export { debugSyncStatus } from './hooks/debugSync'

// Schema utilities
export * from './lib/schema'

// SEO utilities
export { ContentOptimizer } from './lib/seo/contentOptimizer'
export { generateHrefLangAlternates } from './lib/seo/hreflang'

// Blog utilities
export * from './lib/blog'

// Content utilities
export { keywordMap, getKeywordsForPage } from './content/keywords/keywordMap'