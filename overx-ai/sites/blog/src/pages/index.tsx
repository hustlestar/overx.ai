import { GetStaticProps } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { SmartLink } from '../components/NextSEO'
import { useEffect, useState } from 'react'
import type { BlogPost } from '../types/blog'

interface HomePageProps {
  featuredPosts: BlogPost[]
  recentPosts: BlogPost[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
}

export default function HomePage({ featuredPosts, recentPosts }: HomePageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Layout>
      {/* Latest Post + Preview Posts Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Latest Post Card - Left Half */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 1,
                type: "spring" as const,
                stiffness: 60,
                damping: 20
              }}
              whileHover={{
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              {featuredPosts[0] && (
                <article className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 light:from-white/80 light:to-gray-50/60 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-2xl overflow-hidden hover:border-gray-700 light:hover:border-gray-300 transition-all duration-500 h-full">
                  {/* Hero Image */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <Image
                      src={featuredPosts[0].coverImage}
                      alt={featuredPosts[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />

                  <div className="relative p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full">
                        Latest Post
                      </span>
                      <span className="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full">
                        {featuredPosts[0].category.name}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
                      {featuredPosts[0].title}
                    </h2>

                    <p className="text-gray-400 light:text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPosts[0].excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                        <div>
                          <p className="text-sm font-medium">{featuredPosts[0].author.name}</p>
                          <p className="text-xs text-gray-500 light:text-gray-600">
                            {new Date(featuredPosts[0].date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })} • {featuredPosts[0].readingTime}
                          </p>
                        </div>
                      </div>

                      <SmartLink
                        href={`/post/${featuredPosts[0].slug}`}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 light:from-blue-100 light:to-purple-100 border border-blue-600/30 light:border-blue-300 rounded-full text-blue-400 light:text-blue-600 hover:border-blue-500/50 light:hover:border-blue-400 transition-all"
                      >
                        Read Article
                      </SmartLink>
                    </div>
                  </div>
                </article>
              )}
            </motion.div>

            {/* Three Horizontal Preview Posts - Right Half */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring" as const,
                stiffness: 60,
                damping: 20
              }}
            >
              {featuredPosts.slice(1).concat(recentPosts).slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="group bg-gradient-to-r from-gray-900/30 to-gray-900/10 light:from-white/50 light:to-gray-50/30 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-xl p-6 hover:border-gray-700 light:hover:border-gray-300 transition-all duration-300"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.15,
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{
                    x: 8,
                    scale: 1.02,
                    rotateY: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full">
                          {post.category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 light:text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 light:text-gray-600">{post.readingTime}</span>
                        <SmartLink
                          href={`/post/${post.slug}`}
                          className="text-cyan-400 hover:text-cyan-300 light:text-cyan-600 light:hover:text-cyan-500 text-sm font-medium flex items-center gap-1"
                        >
                          Read
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </SmartLink>
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Section with Animated Gradient */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
          {mounted && (
            <>
              <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </>
          )}
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            type: "spring" as const,
            stiffness: 50,
            damping: 20,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              type: "spring" as const,
              stiffness: 80,
              damping: 15
            }}
          >
            <span className="animated-gradient-text">
              OverX AI
            </span>
            <motion.span
              className="block text-3xl md:text-4xl mt-2 text-gray-400 light:text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Blog
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 light:text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              type: "spring" as const,
              stiffness: 100
            }}
          >
            Exploring the frontiers of artificial intelligence and sharing insights
            on building the future of productivity
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
              type: "spring" as const,
              stiffness: 120
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <SmartLink
                href="#featured"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Explore More Articles
              </SmartLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Other Previous Posts Section */}
      <section id="featured" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring" as const,
              stiffness: 80,
              damping: 20
            }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 text-center"
              initial={{ opacity: 0, rotateX: -20 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                More Articles
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-400 light:text-gray-600 text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Explore our archive of insights on AI technology, development, and innovation
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={item}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 light:from-white/80 light:to-gray-50/60 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-2xl overflow-hidden hover:border-gray-700 light:hover:border-gray-300 transition-all duration-500"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateY: 3,
                  transition: { duration: 0.3, type: "spring" as const, stiffness: 200 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />

                {/* Card content */}
                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full">
                      {post.category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 light:text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-gray-500 light:text-gray-600">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <SmartLink
                      href={`/post/${post.slug}`}
                      className="text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-500 text-sm font-medium flex items-center gap-1 group/link"
                    >
                      Read
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </SmartLink>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 light:from-blue-100/60 light:via-purple-100/60 light:to-pink-100/60 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-3xl p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring" as const,
            stiffness: 80,
            damping: 20
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full filter blur-2xl"
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.h2
            className="text-3xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, rotateX: -20 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Stay Updated with AI Insights
          </motion.h2>
          <motion.p
            className="text-gray-400 light:text-gray-600 mb-8 max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get the latest articles on AI, productivity, and technology delivered to your inbox.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <SmartLink
                href="/subscribe"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Subscribe
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
              </SmartLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  )
}

// Stub data for immediate display
const getStubPosts = (locale: string) => {
  const posts = [
    {
      slug: 'introducing-overx-ai',
      title: locale === 'es' ? 'Presentando OverX AI: Construyendo el Futuro de la Productividad' :
             locale === 'ru' ? 'Представляем OverX AI: Строим Будущее Продуктивности' :
             'Introducing OverX AI: Building the Future of Productivity',
      excerpt: locale === 'es' ? 'Descubre cómo OverX AI está revolucionando la productividad a través de la automatización inteligente.' :
               locale === 'ru' ? 'Узнайте, как OverX AI революционизирует продуктивность через интеллектуальную автоматизацию.' :
               'Discover how OverX AI is revolutionizing productivity through intelligent automation.',
      coverImage: '/images/posts/ai-workspace-productivity.png',
      date: '2024-01-15T09:00:00.000Z',
      author: { id: 'jack-ma', name: 'Jack Ma', bio: 'Founder & CEO of OverX AI', avatar: '/images/authors/jack.jpg' },
      category: { id: 'ai-insights', name: locale === 'es' ? 'Insights de IA' : locale === 'ru' ? 'AI Инсайты' : 'AI Insights', slug: 'ai-insights', color: '#3B82F6' },
      tags: ['AI', 'Productivity', 'Automation'],
      readingTime: locale === 'es' ? '5 min de lectura' : locale === 'ru' ? '5 мин чтения' : '5 min read',
      featured: true,
      locale,
      content: '',
      lastModified: '2024-01-15T09:00:00.000Z',
      images: [],
      seo: {}
    },
    {
      slug: 'ai-productivity-revolution',
      title: locale === 'es' ? 'La Revolución de la Productividad IA: Cómo las Herramientas Inteligentes Transforman tu Día' :
             locale === 'ru' ? 'Революция ИИ Продуктивности: Как Умные Инструменты Трансформируют Ваш День' :
             'The AI Productivity Revolution: How Smart Tools Transform Your Workday',
      excerpt: locale === 'es' ? 'Explora cómo la inteligencia artificial está redefiniendo la productividad con flujos automatizados.' :
               locale === 'ru' ? 'Исследуйте, как искусственный интеллект переопределяет продуктивность с автоматизированными процессами.' :
               'Explore how artificial intelligence is reshaping productivity with automated workflows.',
      coverImage: '/images/posts/ml-engineering-collaboration.png',
      date: '2024-01-20T10:00:00.000Z',
      author: { id: 'jack-ma', name: 'Jack Ma', bio: 'Founder & CEO of OverX AI', avatar: '/images/authors/jack.jpg' },
      category: { id: 'tutorials', name: locale === 'es' ? 'Tutoriales' : locale === 'ru' ? 'Учебники' : 'Tutorials', slug: 'tutorials', color: '#10B981' },
      tags: ['Productivity', 'Automation', 'AI'],
      readingTime: locale === 'es' ? '8 min de lectura' : locale === 'ru' ? '8 мин чтения' : '8 min read',
      featured: true,
      locale,
      content: '',
      lastModified: '2024-01-20T10:00:00.000Z',
      images: [],
      seo: {}
    },
    {
      slug: 'telegram-bots-future',
      title: locale === 'es' ? 'Construyendo Bots de Telegram Más Inteligentes: El Futuro de la IA Conversacional' :
             locale === 'ru' ? 'Создание Умных Telegram-ботов: Будущее Разговорного ИИ' :
             'Building Smarter Telegram Bots: The Future of Conversational AI',
      excerpt: locale === 'es' ? 'Descubre cómo los bots avanzados de Telegram están revolucionando la interacción con IA.' :
               locale === 'ru' ? 'Узнайте, как продвинутые Telegram-боты революционизируют взаимодействие с ИИ.' :
               'Discover how advanced Telegram bots are revolutionizing AI interaction.',
      coverImage: '/images/posts/ai-chatbot-interface.png',
      date: '2024-01-25T14:00:00.000Z',
      author: { id: 'jack-ma', name: 'Jack Ma', bio: 'Founder & CEO of OverX AI', avatar: '/images/authors/jack.jpg' },
      category: { id: 'product-updates', name: locale === 'es' ? 'Actualizaciones' : locale === 'ru' ? 'Обновления' : 'Product Updates', slug: 'product-updates', color: '#8B5CF6' },
      tags: ['Telegram', 'Bots', 'AI'],
      readingTime: locale === 'es' ? '6 min de lectura' : locale === 'ru' ? '6 мин чтения' : '6 min read',
      featured: false,
      locale,
      content: '',
      lastModified: '2024-01-25T14:00:00.000Z',
      images: [],
      seo: {}
    }
  ]

  return posts
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  const posts = getStubPosts(locale ?? 'en')
  const featuredPosts = posts.filter(post => post.featured)
  const recentPosts = posts.filter(post => !post.featured)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      featuredPosts,
      recentPosts,
    },
  }
}