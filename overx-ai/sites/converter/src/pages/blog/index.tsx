import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { BlogImage } from '@/components/BlogImage'
import { BaseSEO } from '@overx-ai/shared'
import { getAllBlogPosts } from '@/lib/blog/posts'
import { useRouter } from 'next/router'

export default function BlogPage() {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const posts = getAllBlogPosts()
  const currentLang = i18n.language as 'en' | 'es' | 'ru'

  // Helper function to get primary image
  const getPrimaryImage = (post: any) => {
    return post.image || (post.images && post.images[0]) || {
      url: '/images/blog/default-hero.jpg',
      alt: { en: 'Blog post image', es: 'Imagen del artículo', ru: 'Изображение статьи' },
      width: 1200,
      height: 630
    }
  }

  const structuredData = {
    '@context': 'https://schema.org' as const,
    '@type': 'Blog',
    name: 'Exchange Rates Pro Blog',
    description: 'Expert insights on currency exchange, international business, and financial technology',
    url: 'https://rates.overx.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'OverX AI',
      url: 'https://overx.ai'
    }
  }

  return (
    <>
      <BaseSEO
        title="Blog - Currency Exchange Insights & International Business Tips | Exchange Rates Pro"
        description="Expert articles on transparent currency exchange, saving money on international transactions, and optimizing your business's foreign exchange strategy."
        canonical="https://rates.overx.ai/blog"
        openGraph={{
          title: 'Exchange Rates Pro Blog - Expert Currency Exchange Insights',
          description: 'Learn how to save money on international transactions with transparent exchange rates',
          type: 'website',
        }}
        structuredData={[structuredData]}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Currency Exchange Insights
            </h1>
            <p className="text-xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto">
              Expert articles on transparent currency exchange, international business, and financial technology
            </p>
          </section>

          {/* Featured Post */}
          {posts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-300 light:text-gray-700">Featured Article</h2>
              <Link href={`/blog/${posts[0].slug}`}>
                <article className="glass-effect rounded-lg overflow-hidden hover-glow cursor-pointer group">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative h-64 md:h-80">
                      {(() => {
                        const primaryImage = getPrimaryImage(posts[0])
                        return (
                          <img 
                            src={primaryImage.url}
                            alt={primaryImage.alt[currentLang] || primaryImage.alt.en}
                            className="w-full h-full object-cover rounded-lg"
                            width={primaryImage.width}
                            height={primaryImage.height}
                          />
                        )
                      })()}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-blue-400 light:text-blue-600 font-semibold">
                          FEATURED
                        </span>
                        <span className="text-sm text-gray-400 light:text-gray-600">
                          {new Date(posts[0].publishedAt).toLocaleDateString(currentLang, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-gray-400 light:text-gray-600">
                          {posts[0].readingTime} min read
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                        {posts[0].title[currentLang]}
                      </h3>
                      <p className="text-gray-300 light:text-gray-700 mb-6 line-clamp-3">
                        {posts[0].excerpt[currentLang]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 light:bg-gray-300"></div>
                          <div>
                            <p className="font-semibold text-sm">{posts[0].author.name}</p>
                            <p className="text-xs text-gray-400 light:text-gray-600">{posts[0].author.role}</p>
                          </div>
                        </div>
                        <span className="text-blue-400 light:text-blue-600 group-hover:translate-x-2 transition-transform">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {/* All Posts */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-300 light:text-gray-700">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="glass-effect rounded-lg overflow-hidden hover-glow cursor-pointer group h-full">
                    <div className="relative h-48">
                      {(() => {
                        const primaryImage = getPrimaryImage(post)
                        return (
                          <img 
                            src={primaryImage.url}
                            alt={primaryImage.alt[currentLang] || primaryImage.alt.en}
                            className="w-full h-full object-cover"
                            width={primaryImage.width}
                            height={primaryImage.height}
                          />
                        )
                      })()}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-xs">
                        <span className="text-gray-400 light:text-gray-600">
                          {new Date(post.publishedAt).toLocaleDateString(currentLang, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-gray-400 light:text-gray-600">•</span>
                        <span className="text-gray-400 light:text-gray-600">
                          {post.readingTime} min read
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title[currentLang]}
                      </h3>
                      <p className="text-gray-300 light:text-gray-700 text-sm mb-4 line-clamp-3">
                        {post.excerpt[currentLang]}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700 light:bg-gray-300"></div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                        </div>
                        <span className="text-blue-400 light:text-blue-600 text-sm group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mt-16 glass-effect rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated on Currency Exchange Trends</h2>
            <p className="text-gray-300 light:text-gray-700 mb-6 max-w-2xl mx-auto">
              Get weekly insights on currency markets, international business tips, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 light:bg-white border border-white/20 light:border-gray-300 focus:border-blue-500 light:focus:border-blue-600 focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}