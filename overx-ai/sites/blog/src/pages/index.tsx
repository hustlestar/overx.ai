import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BaseSEO, SmartLink, OptimizedImage } from '@overx-ai/shared'
import { getAllPosts, getFeaturedPosts, getCategories } from '../lib/blog'
import { generateBlogSchema } from '../lib/seo'
import { BlogPost, Category } from '../types/blog'

interface BlogHomeProps {
  featuredPosts: BlogPost[]
  recentPosts: BlogPost[]
  categories: Category[]
  locale: string
}

export default function BlogHome({ featuredPosts, recentPosts, categories, locale }: BlogHomeProps) {
  const router = useRouter()
  
  const structuredData = [generateBlogSchema()]
  
  return (
    <>
      <BaseSEO
        title="Blog - OverX AI | AI Insights, Tutorials & Product Updates"
        description="Explore the latest insights on artificial intelligence, tutorials for our products, and updates from the OverX AI team."
        canonical="https://blog.overx.ai"
        openGraph={{
          type: 'website',
          title: 'OverX AI Blog - AI Insights & Innovation',
          description: 'Stay updated with the latest in AI technology and OverX AI products',
          url: 'https://blog.overx.ai',
          siteName: 'OverX AI Blog',
          locale: locale === 'es' ? 'es_ES' : locale === 'ru' ? 'ru_RU' : 'en_US'
        }}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <SmartLink href="/" className="group">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">OverX AI</span>
                    <span className="text-xs text-gray-500">Blog</span>
                  </div>
                </SmartLink>
                
                <div className="hidden md:flex items-center space-x-6">
                  <SmartLink href="/" className="text-gray-300 hover:text-white transition-colors">
                    All Posts
                  </SmartLink>
                  {categories.slice(0, 4).map(category => (
                    <SmartLink 
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {category.name}
                    </SmartLink>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <SmartLink 
                  href="https://overx.ai" 
                  className="text-gray-300 hover:text-white transition-colors"
                  external
                >
                  Main Site
                </SmartLink>
                <div className="flex items-center space-x-2">
                  {['en', 'es', 'ru'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => router.push(router.pathname, router.asPath, { locale: lang })}
                      className={`px-2 py-1 text-sm rounded transition-colors ${
                        locale === lang 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    OverX AI Blog
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Insights, tutorials, and updates from the forefront of AI innovation
                </p>
              </div>
            </div>
          </section>
          
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {featuredPosts.map(post => (
                    <article key={post.slug} className="group">
                      <SmartLink href={`/post/${post.slug}`}>
                        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4">
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${post.category.color} text-white`}>
                              {post.category.name}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </SmartLink>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* Recent Posts */}
          <section className="py-16 bg-gray-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Recent Posts</h2>
                <SmartLink 
                  href="/archive" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View All →
                </SmartLink>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map(post => (
                  <article key={post.slug} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors">
                    <SmartLink href={`/post/${post.slug}`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{post.author.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${post.category.color} text-white`}>
                          {post.category.name}
                        </span>
                        <span className="text-xs text-gray-500">{post.readingTime}</span>
                      </div>
                    </SmartLink>
                  </article>
                ))}
              </div>
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map(category => (
                  <SmartLink
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group relative p-6 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-lg`}></div>
                    <div className="relative z-10">
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </SmartLink>
                ))}
              </div>
            </div>
          </section>
          
          {/* Newsletter CTA */}
          <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-gray-400 mb-8">
                Get the latest AI insights and product updates delivered to your inbox
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">© 2024 OverX AI. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <SmartLink href="/rss.xml" className="text-gray-400 hover:text-white transition-colors">
                  RSS
                </SmartLink>
                <SmartLink href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">
                  Sitemap
                </SmartLink>
                <SmartLink href="https://overx.ai/privacy" className="text-gray-400 hover:text-white transition-colors" external>
                  Privacy
                </SmartLink>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const [featuredPosts, allPosts] = await Promise.all([
    getFeaturedPosts(locale, 3),
    getAllPosts(locale)
  ])
  
  const recentPosts = allPosts.slice(0, 6)
  const categories = Object.values(getCategories())
  
  return {
    props: {
      featuredPosts,
      recentPosts,
      categories,
      locale
    },
    revalidate: 3600 // Revalidate every hour
  }
}