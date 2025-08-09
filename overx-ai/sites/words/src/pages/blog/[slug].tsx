import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseSEO, createArticleSchema } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import { getAllPosts, getPostDataWithHtml, PostData } from '@/lib/blog'
import { format } from 'date-fns'

interface BlogPostPageProps {
  post: PostData
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation('common')

  const articleSchema = createArticleSchema({
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      name: post.author
    },
    publisher: {
      name: 'Learn Words Bot',
      logo: 'https://learn.overx.ai/logo.png'
    },
    image: post.image || 'https://learn.overx.ai/og-image.jpg'
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tips': return 'from-blue-500 to-cyan-500'
      case 'languages': return 'from-green-500 to-emerald-500'
      case 'updates': return 'from-purple-500 to-pink-500'
      case 'success': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <>
      <BaseSEO
        title={`${post.title} - ${t('site.title')}`}
        description={post.excerpt}
        canonical={`https://learn.overx.ai/blog/${post.slug}`}
        openGraph={{
          type: 'article',
          title: post.title,
          description: post.excerpt,
          url: `https://learn.overx.ai/blog/${post.slug}`,
          article: {
            publishedTime: post.date,
            authors: [post.author],
            tags: [post.category]
          }
        }}
        structuredData={articleSchema}
      />
      
      <Layout>
        <article className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-200">{post.title}</li>
              </ol>
            </nav>
            
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(post.category)} bg-opacity-20 text-white`}>
                  {t(`blog.categories.${post.category}`)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{post.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
              
              <div className="flex items-center justify-between text-gray-400">
                <div>
                  <p className="font-medium text-white">{post.author}</p>
                  <p className="text-sm">{format(new Date(post.date), 'MMMM dd, yyyy')}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="hover:text-white transition-colors" aria-label="Share on Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="hover:text-white transition-colors" aria-label="Share on LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </header>
            
            {/* Featured Image */}
            {post.image && (
              <div className="mb-12 rounded-2xl overflow-hidden bg-gray-800">
                <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Article Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300 prose-strong:text-white prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
            
            {/* Share CTA */}
            <div className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-gray-400 mb-6">
                Start your language learning journey today with Learn Words Bot
              </p>
              <a 
                href="https://t.me/learn_words_bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                <span>Start Learning Free</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
            
            {/* Navigation */}
            <nav className="mt-12 flex justify-between">
              <Link 
                href="/blog"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </nav>
          </div>
        </article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = getAllPosts()
  const paths: any[] = []

  posts.forEach((post) => {
    locales?.forEach((locale) => {
      paths.push({
        params: { slug: post.slug },
        locale
      })
    })
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, locale }) => {
  const post = await getPostDataWithHtml(params?.slug as string)
  
  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      post
    }
  }
}