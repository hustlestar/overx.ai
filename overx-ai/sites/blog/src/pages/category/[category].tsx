import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { BaseSEO, SmartLink, Breadcrumbs } from '@overx-ai/shared'
import { Layout } from '../../components/Layout'
import { getAllCategorySlugs, getCategoryBySlug, getPostsByCategory } from '../../lib/blog'
import { generateBreadcrumbSchema } from '../../lib/seo'
import type { BlogPost, Category } from '../../types/blog'

interface CategoryPageProps {
  category: Category
  posts: BlogPost[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12
    }
  }
}

export default function CategoryPage({ category, posts }: CategoryPageProps) {
  const { t } = useTranslation('common')
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">{t('loading', 'Loading...')}</p>
          </div>
        </div>
      </Layout>
    )
  }

  const breadcrumbItems = [
    { name: t('navigation.home', 'Home'), url: 'https://blog.overx.ai/' },
    { name: t('navigation.categories', 'Categories'), url: 'https://blog.overx.ai/' },
    { name: category.name }
  ]

  const structuredData = [
    generateBreadcrumbSchema(breadcrumbItems),
    {
      '@context': 'https://schema.org' as const,
      '@type': 'CollectionPage',
      name: `${category.name} - OverX AI Blog`,
      description: category.description,
      url: `https://blog.overx.ai/category/${category.slug}`,
      isPartOf: {
        '@type': 'Blog',
        name: 'OverX AI Blog',
        url: 'https://blog.overx.ai'
      }
    }
  ]

  return (
    <Layout>
      <BaseSEO
        title={`${category.name} - OverX AI Blog`}
        description={category.description || `Browse all ${category.name} articles on the OverX AI Blog. Discover insights, tutorials, and updates about AI technology.`}
        canonical={`https://blog.overx.ai/category/${category.slug}`}
        openGraph={{
          title: `${category.name} - OverX AI Blog`,
          description: category.description || `Browse all ${category.name} articles`,
          url: `https://blog.overx.ai/category/${category.slug}`,
          image: {
            url: 'https://blog.overx.ai/og-image.png',
            width: 1312,
            height: 736,
            alt: `${category.name} - OverX AI Blog`
          }
        }}
        twitter={{
          card: 'summary_large_image',
          title: `${category.name} - OverX AI Blog`,
          description: category.description || `Browse all ${category.name} articles`,
          image: 'https://blog.overx.ai/og-image.png'
        }}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Category Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
            {category.name}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 light:from-gray-900 light:to-gray-600 bg-clip-text text-transparent">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-400 light:text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500 light:text-gray-500">
            {posts.length} {posts.length === 1 ? t('post', 'article') : t('posts', 'articles')}
          </p>
        </motion.div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={item}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 light:from-white/80 light:to-gray-50/60 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-2xl overflow-hidden hover:border-gray-700 light:hover:border-gray-300 transition-all duration-500"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, type: 'spring' as const, stiffness: 200 }
                }}
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
                    <span className={`text-xs px-2 py-1 bg-gradient-to-r ${category.color} bg-opacity-20 text-white rounded-full`}>
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

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
                      className="text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-500 text-sm font-medium flex items-center gap-1"
                    >
                      {t('sections.readArticle', 'Read Article')}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </SmartLink>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 light:from-gray-100 light:to-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600 light:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-300 light:text-gray-700">
              {t('noPostsYet', 'No articles yet')}
            </h2>
            <p className="text-gray-500 light:text-gray-500 mb-6">
              {t('noPostsDescription', 'Check back soon for articles in this category.')}
            </p>
            <SmartLink
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              {t('browseAllPosts', 'Browse All Posts')}
            </SmartLink>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = getAllCategorySlugs()
  const locales = ['en', 'es', 'ru']

  const paths = locales.flatMap(locale =>
    categorySlugs.map(category => ({
      params: { category },
      locale
    }))
  )

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params, locale = 'en' }) => {
  const categorySlug = params?.category as string
  const category = getCategoryBySlug(categorySlug)

  // Return 404 for invalid categories
  if (!category) {
    return {
      notFound: true
    }
  }

  const posts = await getPostsByCategory(categorySlug, locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      category,
      posts
    },
    revalidate: 3600 // Revalidate every hour
  }
}
