import { BlogConfig } from '@overx-ai/shared'

export const wordsBlogConfig: BlogConfig = {
  domain: 'words.overx.ai',
  basePath: '/blog',
  supportedLocales: ['en', 'es', 'ru'],
  defaultLocale: 'en',
  postsPerPage: 6,
  trailingSlash: true,
  categories: {
    'spaced-repetition': {
      slug: 'spaced-repetition',
      name: {
        en: 'Spaced Repetition',
        es: 'Repetición Espaciada',
        ru: 'Интервальное Повторение'
      },
      description: {
        en: 'Learn about the science of spaced repetition and memory retention',
        es: 'Aprende sobre la ciencia de la repetición espaciada y la retención de memoria',
        ru: 'Узнайте о науке интервального повторения и удержания памяти'
      }
    },
    'vocabulary': {
      slug: 'vocabulary',
      name: {
        en: 'Vocabulary Learning',
        es: 'Aprendizaje de Vocabulario',
        ru: 'Изучение Словарного Запаса'
      },
      description: {
        en: 'Tips and strategies for effective vocabulary acquisition',
        es: 'Consejos y estrategias para la adquisición efectiva de vocabulario',
        ru: 'Советы и стратегии эффективного освоения словарного запаса'
      }
    },
    'learning-science': {
      slug: 'learning-science',
      name: {
        en: 'Learning Science',
        es: 'Ciencia del Aprendizaje',
        ru: 'Наука Обучения'
      },
      description: {
        en: 'Scientific research and insights about language learning',
        es: 'Investigación científica e insights sobre el aprendizaje de idiomas',
        ru: 'Научные исследования и понимание изучения языков'
      }
    },
    'memory': {
      slug: 'memory',
      name: {
        en: 'Memory & Retention',
        es: 'Memoria y Retención',
        ru: 'Память и Удержание'
      },
      description: {
        en: 'Understanding how memory works in language learning',
        es: 'Entendiendo cómo funciona la memoria en el aprendizaje de idiomas',
        ru: 'Понимание работы памяти в изучении языков'
      }
    },
    'telegram': {
      slug: 'telegram',
      name: {
        en: 'Telegram Learning',
        es: 'Aprendizaje en Telegram',
        ru: 'Обучение в Telegram'
      },
      description: {
        en: 'How to maximize language learning through Telegram bots',
        es: 'Cómo maximizar el aprendizaje de idiomas a través de bots de Telegram',
        ru: 'Как максимизировать изучение языков через Telegram ботов'
      }
    },
    'ai-learning': {
      slug: 'ai-learning',
      name: {
        en: 'AI-Powered Learning',
        es: 'Aprendizaje con IA',
        ru: 'Обучение с ИИ'
      },
      description: {
        en: 'The future of language learning with artificial intelligence',
        es: 'El futuro del aprendizaje de idiomas con inteligencia artificial',
        ru: 'Будущее изучения языков с искусственным интеллектом'
      }
    },
    'mobile-education': {
      slug: 'mobile-education',
      name: {
        en: 'Mobile Education',
        es: 'Educación Móvil',
        ru: 'Мобильное Образование'
      },
      description: {
        en: 'Learning languages on the go with mobile technology',
        es: 'Aprendiendo idiomas sobre la marcha con tecnología móvil',
        ru: 'Изучение языков в движении с мобильными технологиями'
      }
    },
    'accessibility': {
      slug: 'accessibility',
      name: {
        en: 'Accessibility',
        es: 'Accesibilidad',
        ru: 'Доступность'
      },
      description: {
        en: 'Making language learning accessible to everyone',
        es: 'Haciendo el aprendizaje de idiomas accesible para todos',
        ru: 'Делаем изучение языков доступным для всех'
      }
    },
    'multilingual': {
      slug: 'multilingual',
      name: {
        en: 'Multilingual',
        es: 'Multilingüe',
        ru: 'Многоязычный'
      },
      description: {
        en: 'Strategies for learning multiple languages simultaneously',
        es: 'Estrategias para aprender múltiples idiomas simultáneamente',
        ru: 'Стратегии изучения нескольких языков одновременно'
      }
    },
    'language-strategies': {
      slug: 'language-strategies',
      name: {
        en: 'Language Strategies',
        es: 'Estrategias de Idiomas',
        ru: 'Языковые Стратегии'
      },
      description: {
        en: 'Proven methods and techniques for language mastery',
        es: 'Métodos y técnicas probadas para el dominio de idiomas',
        ru: 'Проверенные методы и техники овладения языками'
      }
    },
    'polyglot': {
      slug: 'polyglot',
      name: {
        en: 'Polyglot Tips',
        es: 'Consejos de Políglota',
        ru: 'Советы Полиглотов'
      },
      description: {
        en: 'Insights from people who speak multiple languages',
        es: 'Perspectivas de personas que hablan múltiples idiomas',
        ru: 'Понимание от людей, говорящих на нескольких языках'
      }
    },
    'learning-tips': {
      slug: 'learning-tips',
      name: {
        en: 'Learning Tips',
        es: 'Consejos de Aprendizaje',
        ru: 'Советы по Обучению'
      },
      description: {
        en: 'Practical advice for more effective language learning',
        es: 'Consejos prácticos para un aprendizaje de idiomas más efectivo',
        ru: 'Практические советы для более эффективного изучения языков'
      }
    },
    'context': {
      slug: 'context',
      name: {
        en: 'Context Learning',
        es: 'Aprendizaje Contextual',
        ru: 'Контекстное Обучение'
      },
      description: {
        en: 'The importance of context in language acquisition',
        es: 'La importancia del contexto en la adquisición de idiomas',
        ru: 'Важность контекста в освоении языков'
      }
    },
    'natural-language-processing': {
      slug: 'natural-language-processing',
      name: {
        en: 'Natural Language Processing',
        es: 'Procesamiento de Lenguaje Natural',
        ru: 'Обработка Естественного Языка'
      },
      description: {
        en: 'How NLP technology enhances language learning',
        es: 'Cómo la tecnología NLP mejora el aprendizaje de idiomas',
        ru: 'Как технология NLP улучшает изучение языков'
      }
    }
  }
}