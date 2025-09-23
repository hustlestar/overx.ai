import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BaseSEO, SmartLink } from '@overx-ai/shared'
import { Layout } from '../components/Layout'
import { getAllPosts, getFeaturedPosts, getCategories } from '../lib/blog'
import { generateBlogSchema } from '../lib/seo'
import { BlogPost, Category } from '../types/blog'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface BlogHomeProps {
  featuredPosts: BlogPost[]
  recentPosts: BlogPost[]
  categories: Category[]
  locale: string
}

export default function BlogHome({ featuredPosts, recentPosts, categories, locale }: BlogHomeProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 50])

  useEffect(() => {
    setMounted(true)
  }, [])

  const structuredData = [generateBlogSchema()]

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  }

  return (
    <>
      <BaseSEO
        title="Blog - OverX AI | AI Insights, Tutorials & Product Updates"
        description="Explore the latest insights on artificial intelligence, tutorials for our products, and updates from the OverX AI team."
        canonical="https://blog.overx.ai"
        openGraph={{
          title: 'OverX AI Blog - AI Insights & Innovation',
          description: 'Stay updated with the latest in AI technology and OverX AI products',
          url: 'https://blog.overx.ai',
          siteName: 'OverX AI Blog',
          locale: locale === 'es' ? 'es_ES' : locale === 'ru' ? 'ru_RU' : 'en_US'
        }}
        structuredData={structuredData}
      />

      <Layout>
        {/* Hero Section with Parallax */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0"
            style={{ y }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent"></div>
            {mounted && (
              <>
                <motion.div
                  className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </>
            )}
          </motion.div>

          <div className="relative z-10 text-center px-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200%',
                }}
              >
                OverX AI Blog
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta')}
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          {mounted && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </section>

        {/* Featured Posts with Stagger Animation */}
        {featuredPosts.length > 0 && (
          <motion.section
            id="featured"
            className="py-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                variants={fadeInUp}
              >
                {t('sections.featured')}
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    className="group"
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ y: -5 }}
                  >
                    <SmartLink href={`/post/${post.slug}`}>
                      <motion.div
                        className="relative h-56 mb-6 overflow-hidden rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 0.8 }}
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <motion.span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${post.category.color} text-white mb-2`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {post.category.name}
                          </motion.span>
                        </div>
                      </motion.div>
                      <motion.h3
                        className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors"
                        layoutId={`title-${post.slug}`}
                      >
                        {post.title}
                      </motion.h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </SmartLink>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Recent Posts with Reveal Animation */}
        <section className="py-16 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex justify-between items-center mb-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t('sections.recent')}</h2>
              <motion.div whileHover={{ x: 5 }}>
                <SmartLink
                  href="/archive"
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-2"
                >
                  <span>{t('sections.viewAll')}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </SmartLink>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {recentPosts.map((post, index) => {
                const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

                return (
                  <motion.article
                    ref={ref}
                    key={post.slug}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <SmartLink href={`/post/${post.slug}`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </motion.div>
                        <div>
                          <p className="font-medium text-sm">{post.author.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <motion.span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${post.category.color} text-white`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {post.category.name}
                        </motion.span>
                        <span className="text-xs text-gray-500">{post.readingTime}</span>
                      </div>
                    </SmartLink>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Categories with 3D Card Effect */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('sections.categories')}
            </motion.h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, rotateY: -30 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SmartLink
                    href={`/category/${category.slug}`}
                    className="block"
                  >
                    <motion.div
                      className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-black border border-white/10 overflow-hidden group"
                      whileHover={{
                        scale: 1.05,
                        rotateY: 5,
                        rotateX: 5,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                      />
                      <div className="relative z-10">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {category.description}
                        </p>
                      </div>
                    </motion.div>
                  </SmartLink>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter with Animated Background */}
        <section className="py-20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('newsletter.title')}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('newsletter.subtitle')}
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('newsletter.button')}
              </motion.button>
            </motion.form>
          </div>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const [featuredPosts, allPosts, translations] = await Promise.all([
    getFeaturedPosts(locale, 3),
    getAllPosts(locale),
    serverSideTranslations(locale, ['common'])
  ])

  const recentPosts = allPosts.slice(0, 6)
  const categories = Object.values(getCategories())

  return {
    props: {
      ...translations,
      featuredPosts,
      recentPosts,
      categories,
      locale
    },
    revalidate: 3600
  }
}