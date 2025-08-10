import { BlogPost } from '@/lib/blog/types'

/**
 * LEGACY BLOG POSTS METADATA
 * 
 * CRITICAL: Only add posts here that use separate content files!
 * Complete posts (with inline content) should NOT be added here.
 * 
 * Adding a slug here that also exists as a complete post will cause
 * empty content display due to duplicate slug resolution.
 * 
 * Current legacy posts: 6 total (with separate content files)
 * Complete posts: 3 total (in individual files with full content)
 */
export const blogMetadata: Omit<BlogPost, 'content'>[] = [
  {
    slug: 'why-transparent-exchange-rates-matter-international-business',
    publishedAt: '2024-01-15T10:00:00Z',
    author: {
      name: 'Alex Chen',
      role: 'Financial Technology Expert',
    },
    tags: ['exchange-rates', 'international-business', 'transparency', 'finance'],
    readingTime: 8,
    featured: true,
    image: {
      url: '/blog/transparent-rates-hero.webp',
      alt: {
        en: 'Professional business infographic showing transparent exchange rates with currency symbols and rate transparency graph',
        es: 'Infografía empresarial profesional mostrando tipos de cambio transparentes con símbolos de divisas y gráfico de transparencia de tasas',
        ru: 'Профессиональная бизнес-инфографика, показывающая прозрачные обменные курсы с символами валют и графиком прозрачности курсов'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Why Transparent Exchange Rates Matter for International Business in 2024',
      es: 'Por Qué los Tipos de Cambio Transparentes Son Cruciales para los Negocios Internacionales en 2024',
      ru: 'Почему Прозрачные Курсы Валют Важны для Международного Бизнеса в 2024 году',
    },
    excerpt: {
      en: 'Hidden margins in currency conversion cost businesses billions annually. Learn how transparent exchange rates from multiple sources can save your company 2-5% on every international transaction.',
      es: 'Los márgenes ocultos en la conversión de divisas cuestan a las empresas miles de millones anualmente. Aprenda cómo los tipos de cambio transparentes de múltiples fuentes pueden ahorrar a su empresa entre 2-5% en cada transacción internacional.',
      ru: 'Скрытые наценки при конвертации валют обходятся бизнесу в миллиарды ежегодно. Узнайте, как прозрачные курсы валют из нескольких источников могут сэкономить вашей компании 2-5% на каждой международной транзакции.',
    },
    seo: {
      en: {
        metaTitle: 'Why Transparent Exchange Rates Matter for Business | Exchange Rates Pro Blog',
        metaDescription: 'Learn how hidden margins in currency conversion cost businesses billions. Transparent rates from multiple sources can save 2-5% on every transaction.',
        keywords: ['transparent exchange rates', 'currency conversion costs', 'international business', 'forex transparency', 'exchange rate margins', 'exchange rates pro', 'foreign exchange savings', 'business currency conversion']
      },
      es: {
        metaTitle: 'Por Qué los Tipos de Cambio Transparentes Importan | Exchange Rates Pro Blog',
        metaDescription: 'Aprenda cómo los márgenes ocultos en conversión de divisas cuestan miles de millones. Los tipos transparentes pueden ahorrar 2-5% en cada transacción.',
        keywords: ['tipos cambio transparentes', 'costos conversión divisas', 'negocios internacionales', 'transparencia forex', 'márgenes tipo cambio', 'exchange rates pro', 'ahorro cambio divisas', 'conversión divisas empresarial']
      },
      ru: {
        metaTitle: 'Почему Прозрачные Курсы Валют Важны для Бизнеса | Exchange Rates Pro Блог',
        metaDescription: 'Узнайте, как скрытые наценки при конвертации валют обходятся бизнесу в миллиарды. Прозрачные курсы из нескольких источников могут сэкономить 2-5% на каждой транзакции.',
        keywords: ['прозрачные курсы валют', 'затраты конвертация валют', 'международный бизнес', 'прозрачность форекс', 'маржа курсов валют', 'exchange rates pro', 'экономия обмен валют', 'конвертация валют бизнес']
      }
    }
  },
  {
    slug: 'save-money-traveling-currency-converter-chrome-extension',
    publishedAt: '2024-01-20T10:00:00Z',
    author: {
      name: 'Sarah Mitchell',
      role: 'Travel Finance Writer',
    },
    tags: ['travel', 'chrome-extension', 'money-saving', 'currency-tips'],
    readingTime: 6,
    featured: true,
    image: {
      url: '/blog/travel-money-tips.webp',
      alt: {
        en: 'Travel-themed infographic with "Save Money While Traveling" and "5 Smart Ways" text, featuring passport, world map, and currency symbols',
        es: 'Infografía de viajes con texto "Ahorra Dinero Viajando" y "5 Formas Inteligentes", con pasaporte, mapa mundial y símbolos de divisas',
        ru: 'Туристическая инфографика с текстом "Экономьте Деньги в Путешествиях" и "5 Умных Способов", с паспортом, картой мира и символами валют'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Save Money While Traveling: 5 Ways Our Chrome Extension Helps',
      es: 'Ahorra Dinero Viajando: 5 Formas en que Nuestra Extensión Chrome Ayuda',
      ru: 'Экономьте Деньги в Путешествиях: 5 Способов с Нашим Расширением Chrome',
    },
    excerpt: {
      en: 'Discover how Exchange Rates Pro helps travelers save 3-7% on every transaction abroad. From avoiding DCC scams to finding the best ATM rates.',
      es: 'Descubra cómo Exchange Rates Pro ayuda a los viajeros a ahorrar 3-7% en cada transacción en el extranjero. Desde evitar estafas DCC hasta encontrar las mejores tarifas de cajeros.',
      ru: 'Узнайте, как Exchange Rates Pro помогает путешественникам экономить 3-7% на каждой транзакции за границей. От избежания DCC-мошенничества до поиска лучших курсов в банкоматах.',
    },
    seo: {
      en: {
        metaTitle: 'Save Money Traveling: Chrome Extension Guide | Exchange Rates Pro',
        metaDescription: 'Learn 5 proven ways to save 3-7% on every transaction abroad with Exchange Rates Pro. Real examples and insider tips from frequent travelers.',
        keywords: ['save money traveling', 'currency converter chrome', 'avoid exchange fees', 'travel money tips', 'DCC scams', 'airport exchange rates', 'ATM fees abroad', 'best travel cards']
      },
      es: {
        metaTitle: 'Ahorra Dinero Viajando: Guía Extensión Chrome | Exchange Rates Pro',
        metaDescription: 'Aprenda 5 formas probadas de ahorrar 3-7% en cada transacción en el extranjero con Exchange Rates Pro. Ejemplos reales y consejos.',
        keywords: ['ahorrar dinero viajando', 'convertidor divisas chrome', 'evitar comisiones cambio', 'consejos dinero viaje', 'estafas DCC', 'tipos cambio aeropuerto', 'comisiones cajeros', 'mejores tarjetas viaje']
      },
      ru: {
        metaTitle: 'Экономьте в Путешествиях: Гид по Расширению Chrome | Exchange Rates Pro',
        metaDescription: 'Узнайте 5 проверенных способов экономить 3-7% на каждой транзакции за границей с Exchange Rates Pro. Реальные примеры и советы.',
        keywords: ['экономия денег путешествия', 'конвертер валют chrome', 'избежать комиссий обмена', 'советы валюта путешествия', 'мошенничество DCC', 'курсы обмена аэропорт', 'комиссии банкоматов', 'лучшие карты путешествий']
      }
    }
  },
  {
    slug: 'compare-currency-exchange-apis-2024-complete-guide',
    publishedAt: '2024-01-25T10:00:00Z',
    author: {
      name: 'David Kumar',
      role: 'Senior API Developer',
    },
    tags: ['api', 'development', 'comparison', 'technical-guide'],
    readingTime: 12,
    featured: false,
    image: {
      url: '/blog/api-comparison-guide.webp',
      alt: {
        en: 'Technical comparison chart titled "Currency Exchange APIs 2024" with API names, comparison metrics, code elements, and performance indicators',
        es: 'Gráfico de comparación técnica titulado "APIs de Cambio de Divisas 2024" con nombres de APIs, métricas de comparación, elementos de código e indicadores de rendimiento',
        ru: 'Техническая сравнительная диаграмма под названием "API Обмена Валют 2024" с названиями API, метриками сравнения, элементами кода и индикаторами производительности'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Compare Currency Exchange APIs 2024: Developer\'s Complete Guide',
      es: 'Comparar APIs de Cambio de Divisas 2024: Guía Completa para Desarrolladores',
      ru: 'Сравнение API Обмена Валют 2024: Полное Руководство Разработчика',
    },
    excerpt: {
      en: 'In-depth comparison of 12+ currency exchange APIs. Compare pricing, features, accuracy, and reliability to choose the best API for your project.',
      es: 'Comparación detallada de más de 12 APIs de cambio de divisas. Compare precios, características, precisión y confiabilidad para elegir la mejor API para su proyecto.',
      ru: 'Подробное сравнение 12+ API обмена валют. Сравните цены, функции, точность и надежность, чтобы выбрать лучший API для вашего проекта.',
    },
    seo: {
      en: {
        metaTitle: 'Compare Currency Exchange APIs 2024: Complete Guide | Exchange Rates Pro',
        metaDescription: 'In-depth comparison of 12+ currency exchange APIs. Compare pricing, features, accuracy, and reliability to choose the best API for your project.',
        keywords: ['currency exchange api', 'forex api comparison', 'exchange rate api', 'currency converter api', 'best currency api 2024', 'api pricing comparison', 'developer currency guide', 'multi-api strategy']
      },
      es: {
        metaTitle: 'Comparar APIs de Cambio de Divisas 2024: Guía Completa | Exchange Rates Pro',
        metaDescription: 'Comparación detallada de más de 12 APIs de cambio de divisas. Compare precios, características, precisión y confiabilidad.',
        keywords: ['api cambio divisas', 'comparación api forex', 'api tipos cambio', 'api convertidor divisas', 'mejor api divisas 2024', 'comparación precios api', 'guía desarrollador divisas', 'estrategia multi-api']
      },
      ru: {
        metaTitle: 'Сравнение API Обмена Валют 2024: Полное Руководство | Exchange Rates Pro',
        metaDescription: 'Подробное сравнение 12+ API обмена валют. Сравните цены, функции, точность и надежность для вашего проекта.',
        keywords: ['api обмена валют', 'сравнение api форекс', 'api курсов валют', 'api конвертер валют', 'лучший api валют 2024', 'сравнение цен api', 'руководство разработчика валюты', 'мульти-api стратегия']
      }
    }
  },
  {
    slug: 'real-time-currency-alerts-maximize-exchange-rates',
    publishedAt: '2024-02-01T10:00:00Z',
    author: {
      name: 'Emily Rodriguez',
      role: 'Financial Markets Analyst',
    },
    tags: ['currency-alerts', 'real-time', 'trading', 'money-saving'],
    readingTime: 7,
    featured: false,
    image: {
      url: '/blog/currency-alerts-dashboard.webp',
      alt: {
        en: 'Real-time alert dashboard showing "Currency Alerts" and "Maximize Exchange Rates" text with notification bells, rate charts, and mobile alerts',
        es: 'Panel de alertas en tiempo real mostrando texto "Alertas de Divisas" y "Maximizar Tipos de Cambio" con campanas de notificación, gráficos de tasas y alertas móviles',
        ru: 'Панель оповещений в реальном времени, показывающая текст "Валютные Оповещения" и "Максимизировать Обменные Курсы" с колокольчиками уведомлений, графиками курсов и мобильными оповещениями'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Real-Time Currency Alerts: How to Maximize Your Exchange Rates',
      es: 'Alertas de Divisas en Tiempo Real: Cómo Maximizar tus Tipos de Cambio',
      ru: 'Уведомления о Курсах Валют в Реальном Времени: Как Максимизировать Обменные Курсы',
    },
    excerpt: {
      en: 'Learn how to use real-time currency alerts to catch the best exchange rates. Save up to 4% by timing your conversions with market movements.',
      es: 'Aprenda a usar alertas de divisas en tiempo real para obtener los mejores tipos de cambio. Ahorre hasta un 4% sincronizando sus conversiones con movimientos del mercado.',
      ru: 'Узнайте, как использовать уведомления о курсах валют в реальном времени для получения лучших обменных курсов. Экономьте до 4%, синхронизируя конверсии с движениями рынка.',
    },
    seo: {
      en: {
        metaTitle: 'Real-Time Currency Alerts: Maximize Exchange Rates | Exchange Rates Pro',
        metaDescription: 'Learn how to use real-time currency alerts to catch the best exchange rates. Save up to 4% by timing your conversions with market movements.',
        keywords: ['currency alerts', 'real-time exchange rates', 'forex alerts', 'best exchange timing', 'currency rate notifications', 'save money exchange', 'market timing', 'exchange rate strategy']
      },
      es: {
        metaTitle: 'Alertas de Divisas en Tiempo Real: Maximiza Tipos de Cambio | Exchange Rates Pro',
        metaDescription: 'Aprenda a usar alertas de divisas en tiempo real para obtener los mejores tipos de cambio. Ahorre hasta 4% con movimientos del mercado.',
        keywords: ['alertas divisas', 'tipos cambio tiempo real', 'alertas forex', 'mejor momento cambio', 'notificaciones tipos cambio', 'ahorrar dinero cambio', 'timing mercado', 'estrategia tipo cambio']
      },
      ru: {
        metaTitle: 'Уведомления о Курсах Валют: Максимизируйте Обменные Курсы | Exchange Rates Pro',
        metaDescription: 'Узнайте, как использовать уведомления о курсах валют для получения лучших обменных курсов. Экономьте до 4% с движениями рынка.',
        keywords: ['уведомления валюты', 'курсы реальное время', 'форекс алерты', 'лучшее время обмена', 'уведомления курсы', 'экономить обмен', 'тайминг рынка', 'стратегия обмена']
      }
    }
  },
  {
    slug: 'cryptocurrency-vs-traditional-currency-exchange-2024',
    publishedAt: '2024-02-05T10:00:00Z',
    author: {
      name: 'Michael Zhang',
      role: 'Cryptocurrency & Forex Expert',
    },
    tags: ['cryptocurrency', 'forex', 'comparison', 'digital-currency'],
    readingTime: 10,
    featured: true,
    image: {
      url: '/blog/crypto-vs-forex.webp',
      alt: {
        en: 'Split comparison showing "Cryptocurrency vs Traditional Currency" with Bitcoin and crypto symbols on one side, traditional banking on the other',
        es: 'Comparación dividida mostrando "Criptomonedas vs Moneda Tradicional" con Bitcoin y símbolos cripto en un lado, banca tradicional en el otro',
        ru: 'Разделенное сравнение, показывающее "Криптовалюта vs Традиционная Валюта" с Биткоином и крипто символами с одной стороны, традиционным банкингом с другой'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Cryptocurrency vs Traditional Currency Exchange: What\'s Best in 2024?',
      es: 'Criptomonedas vs Cambio de Divisas Tradicional: ¿Qué es Mejor en 2024?',
      ru: 'Криптовалюта vs Традиционный Обмен Валют: Что Лучше в 2024?',
    },
    excerpt: {
      en: 'Compare cryptocurrency and traditional forex for international transfers. Analyze costs, speed, security, and regulations to make the best choice for your needs.',
      es: 'Compare criptomonedas y forex tradicional para transferencias internacionales. Analice costos, velocidad, seguridad y regulaciones para tomar la mejor decisión.',
      ru: 'Сравните криптовалюту и традиционный форекс для международных переводов. Анализ затрат, скорости, безопасности и регулирования для лучшего выбора.',
    },
    seo: {
      en: {
        metaTitle: 'Crypto vs Traditional Currency Exchange 2024: Complete Comparison | Exchange Rates Pro',
        metaDescription: 'Compare cryptocurrency and traditional forex for international transfers. Analyze costs, speed, security, and regulations to make the best choice.',
        keywords: ['cryptocurrency exchange', 'crypto vs forex', 'bitcoin currency exchange', 'digital currency transfer', 'international money transfer', 'crypto conversion rates', 'blockchain payments', 'forex vs crypto 2024']
      },
      es: {
        metaTitle: 'Cripto vs Cambio de Divisas Tradicional 2024: Comparación | Exchange Rates Pro',
        metaDescription: 'Compare criptomonedas y forex tradicional para transferencias internacionales. Analice costos, velocidad, seguridad y regulaciones.',
        keywords: ['intercambio criptomonedas', 'cripto vs forex', 'bitcoin cambio divisas', 'transferencia moneda digital', 'transferencia dinero internacional', 'tasas conversión cripto', 'pagos blockchain', 'forex vs cripto 2024']
      },
      ru: {
        metaTitle: 'Крипто vs Традиционный Обмен Валют 2024: Сравнение | Exchange Rates Pro',
        metaDescription: 'Сравните криптовалюту и традиционный форекс для международных переводов. Анализ затрат, скорости, безопасности и регулирования.',
        keywords: ['обмен криптовалюты', 'крипто vs форекс', 'биткоин обмен валют', 'перевод цифровой валюты', 'международный денежный перевод', 'курсы конверсии крипто', 'блокчейн платежи', 'форекс vs крипто 2024']
      }
    }
  },
  {
    slug: 'avoid-dynamic-currency-conversion-scams-complete-guide',
    publishedAt: '2024-02-10T10:00:00Z',
    author: {
      name: 'Lisa Thompson',
      role: 'Consumer Finance Advocate',
    },
    tags: ['dcc-scams', 'travel-tips', 'consumer-protection', 'money-saving'],
    readingTime: 9,
    featured: false,
    image: {
      url: '/blog/dcc-scam-warning.webp',
      alt: {
        en: 'Warning-style infographic with "Avoid DCC Scams" and "Dynamic Currency Conversion" text, showing warning signs, credit card terminals, and protective shields',
        es: 'Infografía de advertencia con texto "Evitar Estafas DCC" y "Conversión Dinámica de Divisas", mostrando señales de advertencia, terminales de tarjetas de crédito y escudos protectores',
        ru: 'Предупреждающая инфографика с текстом "Избегайте Мошенничества DCC" и "Динамическая Конверсия Валют", показывающая предупреждающие знаки, терминалы кредитных карт и защитные щиты'
      },
      width: 1312,
      height: 736,
    },
    title: {
      en: 'Avoid Dynamic Currency Conversion Scams: Complete Protection Guide',
      es: 'Evita las Estafas de Conversión Dinámica de Divisas: Guía de Protección',
      ru: 'Избегайте Мошенничества с Динамической Конверсией Валют: Полное Руководство',
    },
    excerpt: {
      en: 'Dynamic Currency Conversion (DCC) costs travelers millions yearly. Learn how to spot and avoid these scams, saving 3-12% on every international transaction.',
      es: 'La Conversión Dinámica de Divisas (DCC) cuesta a los viajeros millones anualmente. Aprenda a detectar y evitar estas estafas, ahorrando 3-12% en cada transacción.',
      ru: 'Динамическая конверсия валют (DCC) обходится путешественникам в миллионы ежегодно. Узнайте, как распознать и избежать этих махинаций, экономя 3-12% на каждой транзакции.',
    },
    seo: {
      en: {
        metaTitle: 'Avoid Dynamic Currency Conversion (DCC) Scams: Complete Guide | Exchange Rates Pro',
        metaDescription: 'DCC costs travelers millions yearly. Learn how to spot and avoid these scams, saving 3-12% on every international transaction. Expert tips included.',
        keywords: ['dynamic currency conversion', 'DCC scams', 'avoid currency scams', 'travel money scams', 'international transaction fees', 'credit card abroad', 'ATM scams', 'tourist traps currency']
      },
      es: {
        metaTitle: 'Evita Estafas de Conversión Dinámica (DCC): Guía Completa | Exchange Rates Pro',
        metaDescription: 'DCC cuesta a viajeros millones anualmente. Aprenda a detectar y evitar estas estafas, ahorrando 3-12% en cada transacción internacional.',
        keywords: ['conversión dinámica divisas', 'estafas DCC', 'evitar estafas divisas', 'estafas dinero viaje', 'comisiones transacción internacional', 'tarjeta crédito extranjero', 'estafas cajeros', 'trampas turistas divisas']
      },
      ru: {
        metaTitle: 'Избегайте Мошенничества DCC: Полное Руководство | Exchange Rates Pro',
        metaDescription: 'DCC обходится путешественникам в миллионы. Узнайте, как распознать и избежать махинаций, экономя 3-12% на международных транзакциях.',
        keywords: ['динамическая конверсия валют', 'мошенничество DCC', 'избежать валютных махинаций', 'мошенничество деньги путешествия', 'комиссии международные транзакции', 'кредитная карта заграницей', 'мошенничество банкоматы', 'туристические ловушки валюта']
      }
    }
  }
]