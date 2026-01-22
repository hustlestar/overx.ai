import React from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { 
  EnhancedSEO,
  Breadcrumbs,
  BlogGrid,
  BlogCategoryFilter,
  createBlogListPage,
  generateBlogListSEO
} from '@overx-ai/shared'
import { getAllBlogPosts, getBlogCategories } from '@/lib/blogLoader'
import { wordsBlogConfig } from '@/lib/blogConfig'

interface BlogPageProps {
  posts: ReturnType<typeof getAllBlogPosts>
  categories: ReturnType<typeof getBlogCategories>
}

export default function BlogPage({ posts, categories }: BlogPageProps) {
  const { t, i18n } = useTranslation('common')
  const currentLocale = i18n.language

  // Generate blog list page data
  const blogListData = createBlogListPage(posts, wordsBlogConfig, 1)
  
  // Generate SEO data
  const seoData = generateBlogListSEO(wordsBlogConfig, currentLocale)

  return (
    <Layout>
      <EnhancedSEO
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black light:from-gray-50 light:via-white light:to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { name: t('navigation.home'), url: '/' },
              { name: t('blog.title') }
            ]}
            className="mb-8"
            baseUrl="https://words.overx.ai"
          />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text light:text-gray-900">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-gray-300 light:text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <BlogCategoryFilter
              categories={blogListData.categories}
              locale={currentLocale}
              defaultLocale={wordsBlogConfig.defaultLocale}
              basePath={wordsBlogConfig.basePath}
              allPostsLabel={t('blog.allPosts')}
              className="justify-center"
              showPostCounts={true}
            />
          </div>

          {/* Featured Posts Section */}
          {posts.filter(post => post.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text light:text-gray-900">
                ⭐ Featured Articles
              </h2>
              <BlogGrid
                posts={posts.filter(post => post.featured)}
                locale={currentLocale}
                defaultLocale={wordsBlogConfig.defaultLocale}
                basePath={wordsBlogConfig.basePath}
                columns={posts.filter(post => post.featured).length === 1 ? 1 : 2}
                showTags={true}
                imageSize="large"
                className="mb-12"
              />
            </div>
          )}

          {/* All Posts Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text light:text-gray-900">
              Latest Articles
            </h2>
            <BlogGrid
              posts={posts.filter(post => !post.featured)}
              locale={currentLocale}
              defaultLocale={wordsBlogConfig.defaultLocale}
              basePath={wordsBlogConfig.basePath}
              columns={3}
              showTags={true}
              imageSize="medium"
            />
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 light:from-blue-50 light:to-purple-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text light:text-gray-900">
              Stay Updated with Language Learning Tips
            </h3>
            <p className="text-lg text-gray-300 light:text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest insights, research, and strategies delivered directly to your inbox. Join thousands of language learners improving their skills with our expert content.
            </p>
            <a 
              href="https://t.me/world_word_war_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="text-2xl mr-3">🚀</span>
              Start Learning Free
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getAllBlogPosts()
  const categories = getBlogCategories()

  return {
    props: {
      posts,
      categories,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 3600 // Revalidate every hour
  }
}