module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ru'],
    localeDetection: true,
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'ru'],
  ns: ['common', 'navigation', 'home'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['cookie', 'header', 'navigator', 'path', 'subdomain'],
    caches: ['cookie'],
  },
}