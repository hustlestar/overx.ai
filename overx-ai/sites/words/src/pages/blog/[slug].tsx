import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReactMarkdown from 'react-markdown'
import { Layout } from '@/components/Layout'
import { 
  EnhancedSEO,
  Breadcrumbs,
  BlogCard,
  OptimizedImage,
  createBlogPostPage,
  generateBlogPostSEO,
  getRelatedPosts
} from '@overx-ai/shared'
import { 
  getBlogPostBySlug, 
  getAllBlogPostSlugs, 
  getAllBlogPosts 
} from '@/lib/blogLoader'
import { wordsBlogConfig } from '@/lib/blogConfig'
import type { BlogPost, BlogPostMetadata } from '@overx-ai/shared'

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogPostMetadata[]
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const { t, i18n } = useTranslation('common')
  const currentLocale = i18n.language

  const title = post.title[currentLocale] || post.title[wordsBlogConfig.defaultLocale]
  const content = post.content[currentLocale] || post.content[wordsBlogConfig.defaultLocale]
  
  // Generate SEO data
  const seoData = generateBlogPostSEO(post, wordsBlogConfig, currentLocale)

  return (
    <Layout>
      <EnhancedSEO
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black light:from-gray-50 light:via-white light:to-gray-100">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs 
            items={[
              { name: t('navigation.home'), url: '/' },
              { name: t('blog.title'), url: '/blog' },
              { name: title }
            ]}
            className="mb-8"
          />

          {/* Article Header */}
          <header className="mb-12">
            {/* Featured Badge */}
            {post.featured && (
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
                  ⭐ Featured Article
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text light:text-gray-900 leading-tight">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 light:text-gray-600 mb-8">
              {/* Author */}
              <div className="flex items-center space-x-3">
                {post.author.avatar && (
                  <OptimizedImage
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-300 light:text-gray-700">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Publication Date */}
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(currentLocale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              {/* Reading Time */}
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800/50 light:bg-gray-200 text-gray-300 light:text-gray-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <OptimizedImage
                src={post.image.url}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                className="w-full h-auto"
                priority
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert light:prose-gray max-w-none mb-16">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text light:text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 gradient-text light:text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-blue-400 light:text-blue-600">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-gray-300 light:text-gray-700">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-gray-300 light:text-gray-700">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start">
                    <span className="text-blue-400 light:text-blue-600 mr-2 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-400 light:text-gray-600">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-blue-400 light:text-blue-600">
                    {children}
                  </strong>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800/50 light:bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-700 light:border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-700 light:border-gray-300 px-4 py-2 bg-gray-800/50 light:bg-gray-100 font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-700 light:border-gray-300 px-4 py-2">
                    {children}
                  </td>
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 light:from-gray-100 light:to-gray-200 rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4 gradient-text light:text-gray-900">
              Share This Article
            </h3>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://words.overx.ai/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://words.overx.ai/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 light:from-blue-50 light:to-purple-50 rounded-2xl p-8 md:p-12 text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text light:text-gray-900">
              Ready to Apply What You've Learned?
            </h3>
            <p className="text-lg text-gray-300 light:text-gray-600 mb-8 max-w-2xl mx-auto">
              Put these language learning strategies into practice with our AI-powered vocabulary system. Start building your multilingual skills today.
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
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-800/50 light:bg-gray-100/50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text light:text-gray-900">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    locale={currentLocale}
                    defaultLocale={wordsBlogConfig.defaultLocale}
                    basePath={wordsBlogConfig.basePath}
                    showTags={true}
                    imageSize="medium"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = getAllBlogPostSlugs()
  
  const paths = slugs.flatMap(slug =>
    (locales || ['en']).map(locale => ({
      params: { slug },
      locale
    }))
  )

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      notFound: true
    }
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  return {
    props: {
      post,
      relatedPosts,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 3600 // Revalidate every hour
  }
}