export interface BlogPostMetadata {
  slug: string
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  tags: string[]
  readingTime: number
  featured: boolean
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  title: {
    en: string
    es: string
    ru: string
  }
  excerpt: {
    en: string
    es: string
    ru: string
  }
  seo: {
    en: {
      metaTitle: string
      metaDescription: string
      keywords: string[]
    }
    es: {
      metaTitle: string
      metaDescription: string
      keywords: string[]
    }
    ru: {
      metaTitle: string
      metaDescription: string
      keywords: string[]
    }
  }
}

export const blogPostsMetadata: BlogPostMetadata[] = [
  {
    slug: 'test-post',
    publishedAt: '2024-01-01',
    author: {
      name: 'Test Author',
      role: 'Blog System Tester'
    },
    tags: ['test', 'blog-system'],
    readingTime: 2,
    featured: true,
    image: {
      url: '/images/blog/test-post.jpg',
      alt: 'Test post image',
      width: 1200,
      height: 630
    },
    title: {
      en: 'Test Post: Blog System Implementation',
      es: 'Publicación de Prueba: Implementación del Sistema de Blog',
      ru: 'Тестовая Публикация: Внедрение Системы Блога'
    },
    excerpt: {
      en: 'A test post to verify the blog system works correctly with all features.',
      es: 'Una publicación de prueba para verificar que el sistema de blog funcione correctamente con todas las características.',
      ru: 'Тестовая публикация для проверки правильной работы системы блога со всеми функциями.'
    },
    seo: {
      en: {
        metaTitle: 'Test Post: Blog System Implementation | World Word War Bot',
        metaDescription: 'Testing the new blog system implementation with multi-language support and SEO optimization.',
        keywords: ['test', 'blog system', 'implementation', 'multi-language']
      },
      es: {
        metaTitle: 'Publicación de Prueba: Implementación del Sistema de Blog | World Word War Bot',
        metaDescription: 'Probando la implementación del nuevo sistema de blog con soporte multilingüe y optimización SEO.',
        keywords: ['prueba', 'sistema de blog', 'implementación', 'multilingüe']
      },
      ru: {
        metaTitle: 'Тестовая Публикация: Внедрение Системы Блога | World Word War Bot',
        metaDescription: 'Тестирование внедрения новой системы блога с многоязычной поддержкой и SEO оптимизацией.',
        keywords: ['тест', 'система блога', 'внедрение', 'многоязычная']
      }
    }
  },
  {
    slug: 'mastering-spaced-repetition-vocabulary-learning',
    publishedAt: '2024-01-15',
    author: {
      name: 'Dr. Elena Rodriguez',
      role: 'Language Learning Expert',
      avatar: '/images/blog/authors/elena.jpg'
    },
    tags: ['spaced-repetition', 'vocabulary', 'learning-science', 'memory'],
    readingTime: 5,
    featured: true,
    image: {
      url: '/images/blog/spaced-repetition.jpg',
      alt: 'Spaced repetition learning curve visualization',
      width: 1200,
      height: 630
    },
    title: {
      en: 'Mastering Spaced Repetition: The Science Behind Effective Vocabulary Learning',
      es: 'Dominando la Repetición Espaciada: La Ciencia Detrás del Aprendizaje Efectivo de Vocabulario',
      ru: 'Освоение Интервального Повторения: Наука Эффективного Изучения Словарного Запаса'
    },
    excerpt: {
      en: 'Discover how spaced repetition algorithms can help you retain vocabulary 10x better than traditional methods.',
      es: 'Descubre cómo los algoritmos de repetición espaciada pueden ayudarte a retener vocabulario 10 veces mejor que los métodos tradicionales.',
      ru: 'Узнайте, как алгоритмы интервального повторения помогают запоминать словарный запас в 10 раз лучше традиционных методов.'
    },
    seo: {
      en: {
        metaTitle: 'Mastering Spaced Repetition for Vocabulary Learning | World Word War Bot',
        metaDescription: 'Learn the science behind spaced repetition and how it can improve your vocabulary retention by 200%. Expert tips and proven techniques.',
        keywords: ['spaced repetition', 'vocabulary learning', 'memory retention', 'language learning', 'AI education']
      },
      es: {
        metaTitle: 'Dominando la Repetición Espaciada para Aprender Vocabulario | World Word War Bot',
        metaDescription: 'Aprende la ciencia detrás de la repetición espaciada y cómo puede mejorar tu retención de vocabulario en un 200%. Consejos de expertos y técnicas probadas.',
        keywords: ['repetición espaciada', 'aprendizaje de vocabulario', 'retención de memoria', 'aprendizaje de idiomas', 'educación con IA']
      },
      ru: {
        metaTitle: 'Освоение Интервального Повторения для Изучения Словарного Запаса | World Word War Bot',
        metaDescription: 'Изучите науку интервального повторения и узнайте, как оно может улучшить запоминание словарного запаса на 200%. Экспертные советы и проверенные методы.',
        keywords: ['интервальное повторение', 'изучение словарного запаса', 'удержание памяти', 'изучение языков', 'ИИ образование']
      }
    }
  },
  {
    slug: 'telegram-bot-language-learning-revolution',
    publishedAt: '2024-02-01',
    author: {
      name: 'Alex Chen',
      role: 'Product Manager',
      avatar: '/images/blog/authors/alex.jpg'
    },
    tags: ['telegram', 'ai-learning', 'mobile-education', 'accessibility'],
    readingTime: 7,
    featured: true,
    image: {
      url: '/images/blog/telegram-learning.jpg',
      alt: 'Telegram bot interface for language learning',
      width: 1200,
      height: 630
    },
    title: {
      en: 'How Telegram Bots Are Revolutionizing Language Learning: A Complete Guide',
      es: 'Cómo los Bots de Telegram Están Revolucionando el Aprendizaje de Idiomas: Una Guía Completa',
      ru: 'Как Телеграм Боты Революционизируют Изучение Языков: Полное Руководство'
    },
    excerpt: {
      en: 'Explore why Telegram bots are becoming the preferred platform for AI-powered language learning and how they compare to traditional apps.',
      es: 'Explora por qué los bots de Telegram se están convirtiendo en la plataforma preferida para el aprendizaje de idiomas con IA y cómo se comparan con las aplicaciones tradicionales.',
      ru: 'Узнайте, почему Телеграм боты становятся предпочтительной платформой для изучения языков с ИИ и как они сравниваются с традиционными приложениями.'
    },
    seo: {
      en: {
        metaTitle: 'Telegram Bots for Language Learning: Complete 2024 Guide | World Word War Bot',
        metaDescription: 'Discover why Telegram bots are revolutionizing language learning. Compare features, benefits, and effectiveness vs traditional apps.',
        keywords: ['telegram bot', 'language learning', 'AI education', 'mobile learning', 'chatbot education']
      },
      es: {
        metaTitle: 'Bots de Telegram para Aprender Idiomas: Guía Completa 2024 | World Word War Bot',
        metaDescription: 'Descubre por qué los bots de Telegram están revolucionando el aprendizaje de idiomas. Compara características, beneficios y efectividad vs aplicaciones tradicionales.',
        keywords: ['bot telegram', 'aprendizaje de idiomas', 'educación con IA', 'aprendizaje móvil', 'educación chatbot']
      },
      ru: {
        metaTitle: 'Телеграм Боты для Изучения Языков: Полный Гид 2024 | World Word War Bot',
        metaDescription: 'Узнайте, почему Телеграм боты революционизируют изучение языков. Сравните функции, преимущества и эффективность с традиционными приложениями.',
        keywords: ['телеграм бот', 'изучение языков', 'ИИ образование', 'мобильное обучение', 'чатбот образование']
      }
    }
  },
  {
    slug: '13-languages-multilingual-learning-strategies',
    publishedAt: '2024-02-15',
    author: {
      name: 'Maria Santos',
      role: 'Polyglot & Language Coach',
      avatar: '/images/blog/authors/maria.jpg'
    },
    tags: ['multilingual', 'language-strategies', 'polyglot', 'learning-tips'],
    readingTime: 8,
    featured: false,
    image: {
      url: '/images/blog/multilingual-flags.jpg',
      alt: 'Flags representing 13 different languages',
      width: 1200,
      height: 630
    },
    title: {
      en: 'Learning 13 Languages Simultaneously: Proven Strategies for Multilingual Mastery',
      es: 'Aprendiendo 13 Idiomas Simultáneamente: Estrategias Probadas para el Dominio Multilingüe',
      ru: 'Изучение 13 Языков Одновременно: Проверенные Стратегии Многоязычного Мастерства'
    },
    excerpt: {
      en: 'Learn proven strategies from polyglots on how to effectively manage and master multiple languages without confusion or burnout.',
      es: 'Aprende estrategias probadas de políglotas sobre cómo manejar y dominar eficazmente múltiples idiomas sin confusión o agotamiento.',
      ru: 'Изучите проверенные стратегии полиглотов о том, как эффективно управлять и осваивать множество языков без путаницы или выгорания.'
    },
    seo: {
      en: {
        metaTitle: '13 Languages Simultaneously: Multilingual Learning Strategies | World Word War Bot',
        metaDescription: 'Master multiple languages with proven polyglot strategies. Learn how to study 13 languages effectively without confusion or burnout.',
        keywords: ['multilingual learning', 'polyglot strategies', 'multiple languages', 'language learning tips', 'simultaneous learning']
      },
      es: {
        metaTitle: '13 Idiomas Simultáneamente: Estrategias de Aprendizaje Multilingüe | World Word War Bot',
        metaDescription: 'Domina múltiples idiomas con estrategias probadas de políglotas. Aprende a estudiar 13 idiomas eficazmente sin confusión o agotamiento.',
        keywords: ['aprendizaje multilingüe', 'estrategias de poliglota', 'múltiples idiomas', 'consejos de aprendizaje de idiomas', 'aprendizaje simultáneo']
      },
      ru: {
        metaTitle: '13 Языков Одновременно: Стратегии Многоязычного Обучения | World Word War Bot',
        metaDescription: 'Освойте множество языков с проверенными стратегиями полиглотов. Узнайте, как эффективно изучать 13 языков без путаницы или выгорания.',
        keywords: ['многоязычное обучение', 'стратегии полиглотов', 'множественные языки', 'советы по изучению языков', 'одновременное изучение']
      }
    }
  },
  {
    slug: 'ai-powered-vocabulary-context-learning',
    publishedAt: '2024-03-01',
    author: {
      name: 'Dr. Sarah Kim',
      role: 'AI Researcher & Linguist',
      avatar: '/images/blog/authors/sarah.jpg'
    },
    tags: ['ai-learning', 'context', 'natural-language-processing', 'vocabulary'],
    readingTime: 6,
    featured: false,
    image: {
      url: '/images/blog/ai-context-learning.jpg',
      alt: 'AI brain processing language context',
      width: 1200,
      height: 630
    },
    title: {
      en: 'AI-Powered Context Learning: Why Examples Matter More Than Definitions',
      es: 'Aprendizaje de Contexto Impulsado por IA: Por Qué los Ejemplos Importan Más Que las Definiciones',
      ru: 'Контекстное Обучение с ИИ: Почему Примеры Важнее Определений'
    },
    excerpt: {
      en: 'Discover how AI-generated contextual examples accelerate vocabulary acquisition and why traditional definition-based learning falls short.',
      es: 'Descubre cómo los ejemplos contextuales generados por IA aceleran la adquisición de vocabulario y por qué el aprendizaje basado en definiciones tradicionales se queda corto.',
      ru: 'Узнайте, как контекстные примеры, созданные ИИ, ускоряют освоение словарного запаса и почему традиционное обучение на основе определений недостаточно.'
    },
    seo: {
      en: {
        metaTitle: 'AI-Powered Context Learning for Vocabulary | World Word War Bot',
        metaDescription: 'Learn why AI-generated contextual examples are more effective than definitions for vocabulary acquisition. Expert insights on modern language learning.',
        keywords: ['AI context learning', 'vocabulary acquisition', 'natural language processing', 'contextual examples', 'AI education']
      },
      es: {
        metaTitle: 'Aprendizaje de Contexto con IA para Vocabulario | World Word War Bot',
        metaDescription: 'Aprende por qué los ejemplos contextuales generados por IA son más efectivos que las definiciones para la adquisición de vocabulario. Perspectivas de expertos en aprendizaje moderno de idiomas.',
        keywords: ['aprendizaje de contexto con IA', 'adquisición de vocabulario', 'procesamiento de lenguaje natural', 'ejemplos contextuales', 'educación con IA']
      },
      ru: {
        metaTitle: 'Контекстное Обучение с ИИ для Словарного Запаса | World Word War Bot',
        metaDescription: 'Узнайте, почему контекстные примеры, созданные ИИ, более эффективны, чем определения для освоения словарного запаса. Экспертные взгляды на современное изучение языков.',
        keywords: ['контекстное обучение с ИИ', 'освоение словарного запаса', 'обработка естественного языка', 'контекстные примеры', 'ИИ образование']
      }
    }
  }
]