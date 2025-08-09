import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseSEO } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import { getAllPosts, PostData } from '@/lib/blog'
import { useState } from 'react'
import { format } from 'date-fns'

interface BlogPageProps {
  posts: PostData[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const { t } = useTranslation('common')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'tips', label: t('blog.categories.tips') },
    { id: 'languages', label: t('blog.categories.languages') },
    { id: 'updates', label: t('blog.categories.updates') },
    { id: 'success', label: t('blog.categories.success') }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

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
        title={`Blog - ${t('site.title')}`}
        description="Language learning tips, insights, and strategies. Stay updated with the latest from Learn Words Bot."
        canonical="https://learn.overx.ai/blog"
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {t('blog.title')}
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('blog.subtitle')}
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                      : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No posts found in this category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.slug}
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-green-500/20 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {post.image && (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                        <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(post.category)} bg-opacity-20 text-white`}>
                          {t(`blog.categories.${post.category}`)}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors duration-300">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <p>{post.author}</p>
                          <p>{format(new Date(post.date), 'MMM dd, yyyy')}</p>
                        </div>
                        
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
                        >
                          <span>{t('blog.readMore')}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Stay Updated
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest language learning tips and product updates delivered to your Telegram
            </p>
            <a 
              href="https://t.me/learn_words_bot" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <span>Subscribe on Telegram</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ locale }) => {
  const posts = getAllPosts()
  
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      posts
    }
  }
}