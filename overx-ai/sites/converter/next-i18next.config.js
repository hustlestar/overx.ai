module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ru'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}