import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { EnhancedSEO, Breadcrumbs, BlogCard } from '@overx-ai/shared'
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getBlogPostsByCategory
} from '@/lib/blogLoader'
import { wordsBlogConfig } from '@/lib/blogConfig'
import type { BlogPostMetadata } from '@overx-ai/shared'

interface CategoryPageProps {
  category: {
    slug: string
    name: string
    description: string
  }
  posts: BlogPostMetadata[]
  categorySlug: string
}

export default function CategoryPage({ category, posts, categorySlug }: CategoryPageProps) {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const currentLocale = i18n.language

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">{t('loading', 'Loading...')}</p>
          </div>
        </div>
      </Layout>
    )
  }

  const breadcrumbItems = [
    { name: t('navigation.home', 'Home'), url: 'https://words.overx.ai/' },
    { name: t('blog.title', 'Blog'), url: 'https://words.overx.ai/blog' },
    { name: category.name }
  ]

  return (
    <Layout>
      <EnhancedSEO
        title={`${category.name} - ${t('blog.title', 'Language Learning Blog')} | World Word War Bot`}
        description={category.description || `Browse all ${category.name} articles on the World Word War language learning blog. Discover insights, tips, and strategies for mastering languages.`}
        canonical={`https://words.overx.ai/blog/category/${categorySlug}`}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black light:from-gray-50 light:via-white light:to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} baseUrl="https://words.overx.ai" />
          </div>

          {/* Category Header */}
          <div className="mb-12 text-center">
            <span className="inline-block px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6 shadow-lg">
              {category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text light:text-gray-900">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-gray-400 light:text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-500 light:text-gray-500">
              {posts.length} {posts.length === 1 ? t('blog.article', 'article') : t('blog.articles', 'articles')}
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={currentLocale}
                  defaultLocale={wordsBlogConfig.defaultLocale}
                  basePath={wordsBlogConfig.basePath}
                  showTags={true}
                  imageSize="medium"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 light:from-gray-100 light:to-gray-200 rounded-2xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 light:from-gray-100 light:to-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600 light:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-300 light:text-gray-700">
                {t('blog.noPostsYet', 'No articles yet')}
              </h2>
              <p className="text-gray-500 light:text-gray-500 mb-6">
                {t('blog.noPostsDescription', 'Check back soon for articles in this category.')}
              </p>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {t('blog.browseAllPosts', 'Browse All Posts')}
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const categorySlugs = getAllCategorySlugs()

  const paths = categorySlugs.flatMap(slug =>
    (locales || ['en']).map(locale => ({
      params: { category: slug },
      locale
    }))
  )

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params, locale = 'en' }) => {
  const categorySlug = params?.category as string
  const category = getCategoryBySlug(categorySlug, locale)

  // Return 404 for invalid categories
  if (!category) {
    return {
      notFound: true
    }
  }

  const posts = getBlogPostsByCategory(categorySlug)

  return {
    props: {
      category,
      posts,
      categorySlug,
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 3600 // Revalidate every hour
  }
}
