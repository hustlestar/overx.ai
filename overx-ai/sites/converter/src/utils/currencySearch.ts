// Currency search data with country names in multiple languages
export const CURRENCY_SEARCH_DATA: Record<string, {
  en: string[]
  es: string[]
  ru: string[]
}> = {
  USD: {
    en: ['United States', 'America', 'USA', 'US', 'Dollar', 'American Dollar'],
    es: ['Estados Unidos', 'América', 'EEUU', 'Dólar', 'Dólar Americano', 'Dólar Estadounidense'],
    ru: ['Соединенные Штаты', 'Америка', 'США', 'Доллар', 'Американский доллар']
  },
  EUR: {
    en: ['Euro', 'Europe', 'European Union', 'EU', 'Eurozone'],
    es: ['Euro', 'Europa', 'Unión Europea', 'UE', 'Zona Euro'],
    ru: ['Евро', 'Европа', 'Европейский союз', 'ЕС', 'Еврозона']
  },
  GBP: {
    en: ['British Pound', 'United Kingdom', 'UK', 'Great Britain', 'England', 'Sterling', 'Pound Sterling'],
    es: ['Libra Esterlina', 'Reino Unido', 'RU', 'Gran Bretaña', 'Inglaterra', 'Libra'],
    ru: ['Британский фунт', 'Великобритания', 'Англия', 'Фунт стерлингов', 'Фунт']
  },
  JPY: {
    en: ['Japanese Yen', 'Japan', 'Yen'],
    es: ['Yen Japonés', 'Japón', 'Yen'],
    ru: ['Японская иена', 'Япония', 'Иена']
  },
  CHF: {
    en: ['Swiss Franc', 'Switzerland', 'Swiss', 'Franc'],
    es: ['Franco Suizo', 'Suiza', 'Franco'],
    ru: ['Швейцарский франк', 'Швейцария', 'Франк']
  },
  CAD: {
    en: ['Canadian Dollar', 'Canada', 'Loonie'],
    es: ['Dólar Canadiense', 'Canadá'],
    ru: ['Канадский доллар', 'Канада']
  },
  AUD: {
    en: ['Australian Dollar', 'Australia', 'Aussie Dollar', 'Aussie'],
    es: ['Dólar Australiano', 'Australia'],
    ru: ['Австралийский доллар', 'Австралия']
  },
  NZD: {
    en: ['New Zealand Dollar', 'New Zealand', 'Kiwi Dollar', 'Kiwi'],
    es: ['Dólar Neozelandés', 'Nueva Zelanda', 'Nueva Zelandia'],
    ru: ['Новозеландский доллар', 'Новая Зеландия']
  },
  CNY: {
    en: ['Chinese Yuan', 'China', 'Yuan', 'Renminbi', 'RMB'],
    es: ['Yuan Chino', 'China', 'Yuan', 'Renminbi'],
    ru: ['Китайский юань', 'Китай', 'Юань', 'Женьминьби']
  },
  HKD: {
    en: ['Hong Kong Dollar', 'Hong Kong'],
    es: ['Dólar de Hong Kong', 'Hong Kong'],
    ru: ['Гонконгский доллар', 'Гонконг']
  },
  SGD: {
    en: ['Singapore Dollar', 'Singapore'],
    es: ['Dólar de Singapur', 'Singapur'],
    ru: ['Сингапурский доллар', 'Сингапур']
  },
  SEK: {
    en: ['Swedish Krona', 'Sweden', 'Krona'],
    es: ['Corona Sueca', 'Suecia', 'Corona'],
    ru: ['Шведская крона', 'Швеция', 'Крона']
  },
  NOK: {
    en: ['Norwegian Krone', 'Norway', 'Krone'],
    es: ['Corona Noruega', 'Noruega', 'Corona'],
    ru: ['Норвежская крона', 'Норвегия', 'Крона']
  },
  DKK: {
    en: ['Danish Krone', 'Denmark', 'Krone'],
    es: ['Corona Danesa', 'Dinamarca', 'Corona'],
    ru: ['Датская крона', 'Дания', 'Крона']
  },
  PLN: {
    en: ['Polish Zloty', 'Poland', 'Zloty'],
    es: ['Zloty Polaco', 'Polonia', 'Zloty'],
    ru: ['Польский злотый', 'Польша', 'Злотый']
  },
  CZK: {
    en: ['Czech Koruna', 'Czech Republic', 'Czechia', 'Koruna'],
    es: ['Corona Checa', 'República Checa', 'Chequia', 'Corona'],
    ru: ['Чешская крона', 'Чехия', 'Чешская Республика', 'Крона']
  },
  HUF: {
    en: ['Hungarian Forint', 'Hungary', 'Forint'],
    es: ['Forinto Húngaro', 'Hungría', 'Forinto'],
    ru: ['Венгерский форинт', 'Венгрия', 'Форинт']
  },
  RON: {
    en: ['Romanian Leu', 'Romania', 'Leu'],
    es: ['Leu Rumano', 'Rumania', 'Rumanía', 'Leu'],
    ru: ['Румынский лей', 'Румыния', 'Лей']
  },
  BGN: {
    en: ['Bulgarian Lev', 'Bulgaria', 'Lev'],
    es: ['Lev Búlgaro', 'Bulgaria', 'Lev'],
    ru: ['Болгарский лев', 'Болгария', 'Лев']
  },
  HRK: {
    en: ['Croatian Kuna', 'Croatia', 'Kuna'],
    es: ['Kuna Croata', 'Croacia', 'Kuna'],
    ru: ['Хорватская куна', 'Хорватия', 'Куна']
  },
  RUB: {
    en: ['Russian Ruble', 'Russia', 'Ruble', 'Rouble'],
    es: ['Rublo Ruso', 'Rusia', 'Rublo'],
    ru: ['Российский рубль', 'Россия', 'Рубль']
  },
  TRY: {
    en: ['Turkish Lira', 'Turkey', 'Lira'],
    es: ['Lira Turca', 'Turquía', 'Lira'],
    ru: ['Турецкая лира', 'Турция', 'Лира']
  },
  KRW: {
    en: ['South Korean Won', 'South Korea', 'Korea', 'Won'],
    es: ['Won Surcoreano', 'Corea del Sur', 'Corea', 'Won'],
    ru: ['Южнокорейская вона', 'Южная Корея', 'Корея', 'Вона']
  },
  INR: {
    en: ['Indian Rupee', 'India', 'Rupee'],
    es: ['Rupia India', 'India', 'Rupia'],
    ru: ['Индийская рупия', 'Индия', 'Рупия']
  },
  BRL: {
    en: ['Brazilian Real', 'Brazil', 'Real'],
    es: ['Real Brasileño', 'Brasil', 'Real'],
    ru: ['Бразильский реал', 'Бразилия', 'Реал']
  },
  MXN: {
    en: ['Mexican Peso', 'Mexico', 'Peso'],
    es: ['Peso Mexicano', 'México', 'Peso'],
    ru: ['Мексиканское песо', 'Мексика', 'Песо']
  },
  ZAR: {
    en: ['South African Rand', 'South Africa', 'Rand'],
    es: ['Rand Sudafricano', 'Sudáfrica', 'Rand'],
    ru: ['Южноафриканский рэнд', 'ЮАР', 'Южная Африка', 'Рэнд']
  },
  THB: {
    en: ['Thai Baht', 'Thailand', 'Baht'],
    es: ['Baht Tailandés', 'Tailandia', 'Baht'],
    ru: ['Тайский бат', 'Таиланд', 'Бат']
  },
  MYR: {
    en: ['Malaysian Ringgit', 'Malaysia', 'Ringgit'],
    es: ['Ringgit Malayo', 'Malasia', 'Ringgit'],
    ru: ['Малайзийский ринггит', 'Малайзия', 'Ринггит']
  },
  PHP: {
    en: ['Philippine Peso', 'Philippines', 'Peso'],
    es: ['Peso Filipino', 'Filipinas', 'Peso'],
    ru: ['Филиппинское песо', 'Филиппины', 'Песо']
  },
  IDR: {
    en: ['Indonesian Rupiah', 'Indonesia', 'Rupiah'],
    es: ['Rupia Indonesia', 'Indonesia', 'Rupia'],
    ru: ['Индонезийская рупия', 'Индонезия', 'Рупия']
  },
  ILS: {
    en: ['Israeli Shekel', 'Israel', 'Shekel', 'New Shekel'],
    es: ['Shekel Israelí', 'Israel', 'Shekel', 'Nuevo Shekel'],
    ru: ['Израильский шекель', 'Израиль', 'Шекель', 'Новый шекель']
  },
  AED: {
    en: ['UAE Dirham', 'United Arab Emirates', 'Emirates', 'Dubai', 'Abu Dhabi', 'Dirham'],
    es: ['Dirham de EAU', 'Emiratos Árabes Unidos', 'Emiratos', 'Dubai', 'Abu Dhabi', 'Dirham'],
    ru: ['Дирхам ОАЭ', 'Объединенные Арабские Эмираты', 'ОАЭ', 'Дубай', 'Абу-Даби', 'Дирхам']
  },
  SAR: {
    en: ['Saudi Riyal', 'Saudi Arabia', 'Riyal'],
    es: ['Riyal Saudí', 'Arabia Saudita', 'Riyal'],
    ru: ['Саудовский риял', 'Саудовская Аравия', 'Риял']
  },
  UAH: {
    en: ['Ukrainian Hryvnia', 'Ukraine', 'Hryvnia', 'Hryvna'],
    es: ['Grivna Ucraniana', 'Ucrania', 'Grivna'],
    ru: ['Украинская гривна', 'Украина', 'Гривна']
  },
  BYN: {
    en: ['Belarusian Ruble', 'Belarus', 'Ruble'],
    es: ['Rublo Bielorruso', 'Bielorrusia', 'Rublo'],
    ru: ['Белорусский рубль', 'Беларусь', 'Белоруссия', 'Рубль']
  },
  ARS: {
    en: ['Argentine Peso', 'Argentina', 'Peso'],
    es: ['Peso Argentino', 'Argentina', 'Peso'],
    ru: ['Аргентинское песо', 'Аргентина', 'Песо']
  },
  CLP: {
    en: ['Chilean Peso', 'Chile', 'Peso'],
    es: ['Peso Chileno', 'Chile', 'Peso'],
    ru: ['Чилийское песо', 'Чили', 'Песо']
  },
  COP: {
    en: ['Colombian Peso', 'Colombia', 'Peso'],
    es: ['Peso Colombiano', 'Colombia', 'Peso'],
    ru: ['Колумбийское песо', 'Колумбия', 'Песо']
  },
  PEN: {
    en: ['Peruvian Sol', 'Peru', 'Sol', 'Nuevo Sol'],
    es: ['Sol Peruano', 'Perú', 'Sol', 'Nuevo Sol'],
    ru: ['Перуанский соль', 'Перу', 'Соль', 'Новый соль']
  },
  GEL: {
    en: ['Georgian Lari', 'Georgia', 'Lari'],
    es: ['Lari Georgiano', 'Georgia', 'Lari'],
    ru: ['Грузинский лари', 'Грузия', 'Лари']
  },
  AMD: {
    en: ['Armenian Dram', 'Armenia', 'Dram'],
    es: ['Dram Armenio', 'Armenia', 'Dram'],
    ru: ['Армянский драм', 'Армения', 'Драм']
  },
  AZN: {
    en: ['Azerbaijani Manat', 'Azerbaijan', 'Manat'],
    es: ['Manat Azerbaiyano', 'Azerbaiyán', 'Manat'],
    ru: ['Азербайджанский манат', 'Азербайджан', 'Манат']
  },
  KZT: {
    en: ['Kazakhstani Tenge', 'Kazakhstan', 'Tenge'],
    es: ['Tenge Kazajo', 'Kazajistán', 'Kazajstán', 'Tenge'],
    ru: ['Казахстанский тенге', 'Казахстан', 'Тенге']
  },
  UZS: {
    en: ['Uzbekistani Som', 'Uzbekistan', 'Som', 'Sum'],
    es: ['Som Uzbeko', 'Uzbekistán', 'Som', 'Sum'],
    ru: ['Узбекский сум', 'Узбекистан', 'Сум']
  },
  TJS: {
    en: ['Tajikistani Somoni', 'Tajikistan', 'Somoni'],
    es: ['Somoni Tayiko', 'Tayikistán', 'Somoni'],
    ru: ['Таджикский сомони', 'Таджикистан', 'Сомони']
  },
  KGS: {
    en: ['Kyrgyzstani Som', 'Kyrgyzstan', 'Som'],
    es: ['Som Kirguís', 'Kirguistán', 'Som'],
    ru: ['Киргизский сом', 'Киргизия', 'Кыргызстан', 'Сом']
  },
  TMT: {
    en: ['Turkmenistani Manat', 'Turkmenistan', 'Manat'],
    es: ['Manat Turcomano', 'Turkmenistán', 'Manat'],
    ru: ['Туркменский манат', 'Туркменистан', 'Туркмения', 'Манат']
  },
  MDL: {
    en: ['Moldovan Leu', 'Moldova', 'Leu'],
    es: ['Leu Moldavo', 'Moldavia', 'Leu'],
    ru: ['Молдавский лей', 'Молдова', 'Молдавия', 'Лей']
  },
  ALL: {
    en: ['Albanian Lek', 'Albania', 'Lek'],
    es: ['Lek Albanés', 'Albania', 'Lek'],
    ru: ['Албанский лек', 'Албания', 'Лек']
  },
  BAM: {
    en: ['Bosnia-Herzegovina Mark', 'Bosnia and Herzegovina', 'Bosnia', 'Herzegovina', 'Convertible Mark', 'Mark'],
    es: ['Marco Bosnioherzegovino', 'Bosnia y Herzegovina', 'Bosnia', 'Herzegovina', 'Marco Convertible', 'Marco'],
    ru: ['Боснийская марка', 'Босния и Герцеговина', 'Босния', 'Герцеговина', 'Конвертируемая марка', 'Марка']
  },
  MKD: {
    en: ['Macedonian Denar', 'Macedonia', 'North Macedonia', 'Denar'],
    es: ['Denar Macedonio', 'Macedonia', 'Macedonia del Norte', 'Denar'],
    ru: ['Македонский денар', 'Македония', 'Северная Македония', 'Денар']
  },
  RSD: {
    en: ['Serbian Dinar', 'Serbia', 'Dinar'],
    es: ['Dinar Serbio', 'Serbia', 'Dinar'],
    ru: ['Сербский динар', 'Сербия', 'Динар']
  },
  ISK: {
    en: ['Icelandic Krona', 'Iceland', 'Krona', 'Króna'],
    es: ['Corona Islandesa', 'Islandia', 'Corona', 'Króna'],
    ru: ['Исландская крона', 'Исландия', 'Крона']
  },
  TWD: {
    en: ['Taiwan Dollar', 'Taiwan', 'New Taiwan Dollar', 'NT Dollar'],
    es: ['Dólar Taiwanés', 'Taiwán', 'Taiwan', 'Nuevo Dólar Taiwanés'],
    ru: ['Тайваньский доллар', 'Тайвань', 'Новый тайваньский доллар']
  },
  VND: {
    en: ['Vietnamese Dong', 'Vietnam', 'Dong'],
    es: ['Dong Vietnamita', 'Vietnam', 'Dong'],
    ru: ['Вьетнамский донг', 'Вьетнам', 'Донг']
  },
  PKR: {
    en: ['Pakistani Rupee', 'Pakistan', 'Rupee'],
    es: ['Rupia Pakistaní', 'Pakistán', 'Paquistán', 'Rupia'],
    ru: ['Пакистанская рупия', 'Пакистан', 'Рупия']
  },
  BDT: {
    en: ['Bangladeshi Taka', 'Bangladesh', 'Taka'],
    es: ['Taka Bangladesí', 'Bangladesh', 'Bangladés', 'Taka'],
    ru: ['Бангладешская така', 'Бангладеш', 'Така']
  },
  LKR: {
    en: ['Sri Lankan Rupee', 'Sri Lanka', 'Ceylon', 'Rupee'],
    es: ['Rupia de Sri Lanka', 'Sri Lanka', 'Ceilán', 'Rupia'],
    ru: ['Шри-ланкийская рупия', 'Шри-Ланка', 'Цейлон', 'Рупия']
  },
  NPR: {
    en: ['Nepalese Rupee', 'Nepal', 'Rupee'],
    es: ['Rupia Nepalí', 'Nepal', 'Rupia'],
    ru: ['Непальская рупия', 'Непал', 'Рупия']
  }
}

// Function to search currencies across all languages
export function searchCurrencies(searchTerm: string): string[] {
  const normalizedSearch = searchTerm.toLowerCase().trim()
  if (!normalizedSearch) return []

  const matchedCurrencies = new Set<string>()

  Object.entries(CURRENCY_SEARCH_DATA).forEach(([currencyCode, searchData]) => {
    // Check currency code
    if (currencyCode.toLowerCase().includes(normalizedSearch)) {
      matchedCurrencies.add(currencyCode)
      return
    }

    // Check all language variants (en, es, ru)
    Object.entries(searchData).forEach(([lang, terms]) => {
      const hasMatch = terms.some(term => 
        term.toLowerCase().includes(normalizedSearch)
      )
      if (hasMatch) {
        matchedCurrencies.add(currencyCode)
      }
    })
  })

  return Array.from(matchedCurrencies)
}

// Get all searchable terms for a currency in current locale
export function getCurrencySearchTerms(currencyCode: string, locale: string = 'en'): string[] {
  const data = CURRENCY_SEARCH_DATA[currencyCode]
  if (!data) return [currencyCode]
  
  const langKey = locale as keyof typeof data
  return [currencyCode, ...(data[langKey] || data.en || [])]
}