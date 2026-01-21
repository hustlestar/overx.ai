import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BaseSEO, SmartLink, Breadcrumbs } from '@overx-ai/shared'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../lib/blog'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '../../lib/seo'
import { BlogPost } from '../../types/blog'

interface PostPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function PostPage({ post, relatedPosts }: PostPageProps) {
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: post.category.name, url: `/category/${post.category.slug}` },
    { name: post.title }
  ]
  
  const structuredData = [
    generateBlogPostSchema(post, `https://blog.overx.ai/post/${post.slug}`),
    generateBreadcrumbSchema(breadcrumbItems)
  ]
  
  const shareUrl = `https://blog.overx.ai/post/${post.slug}`
  const shareText = `${post.title} - OverX AI Blog`
  
  return (
    <>
      <BaseSEO
        title={`${post.title} - OverX AI Blog`}
        description={post.seo?.metaDescription || post.excerpt}
        canonical={post.seo?.canonicalUrl || `https://blog.overx.ai/post/${post.slug}`}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: shareUrl,
          image: {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: post.title
          }
        }}
        twitter={{
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt,
          image: post.coverImage
        }}
        structuredData={structuredData}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: post.seo?.metaKeywords?.join(', ') || post.tags.join(', ')
          },
          {
            name: 'author',
            content: post.author.name
          }
        ]}
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
              </div>
              
              <SmartLink 
                href="https://overx.ai" 
                className="text-gray-300 hover:text-white transition-colors"
                external
              >
                Main Site
              </SmartLink>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          <article>
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-4">
                    <Breadcrumbs items={breadcrumbItems} baseUrl="https://blog.overx.ai" />
                  </div>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${post.category.color} text-white mb-4`}>
                    {post.category.name}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                  <div className="flex items-center space-x-6 text-gray-300">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <article className="flex-1 min-w-0 lg:max-w-4xl">
                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight
                      prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                      prose-p:text-gray-300 prose-p:leading-relaxed
                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-white prose-strong:font-semibold
                      prose-code:text-blue-300 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                      prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-400
                      prose-img:rounded-lg prose-img:shadow-xl
                      prose-ul:text-gray-300 prose-ol:text-gray-300
                      prose-li:marker:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <SmartLink
                          key={tag}
                          href={`/tag/${tag}`}
                          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors"
                        >
                          #{tag}
                        </SmartLink>
                      ))}
                    </div>
                  </div>
                  
                  {/* Author Bio */}
                  <div className="mt-12 p-6 bg-gray-900/50 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{post.author.name}</h3>
                        <p className="text-gray-400 text-sm mb-3">{post.author.bio}</p>
                        <div className="flex space-x-4">
                          {post.author.social?.twitter && (
                            <SmartLink
                              href={`https://twitter.com/${post.author.social.twitter}`}
                              className="text-gray-500 hover:text-blue-400 transition-colors"
                              external
                            >
                              Twitter
                            </SmartLink>
                          )}
                          {post.author.social?.linkedin && (
                            <SmartLink
                              href={`https://linkedin.com/in/${post.author.social.linkedin}`}
                              className="text-gray-500 hover:text-blue-400 transition-colors"
                              external
                            >
                              LinkedIn
                            </SmartLink>
                          )}
                          {post.author.social?.github && (
                            <SmartLink
                              href={`https://github.com/${post.author.social.github}`}
                              className="text-gray-500 hover:text-blue-400 transition-colors"
                              external
                            >
                              GitHub
                            </SmartLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                  {/* Share Buttons */}
                  <div className="sticky top-24 space-y-4">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-400">Share Article</h3>
                      <div className="flex flex-col space-y-2">
                        <SmartLink
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                          external
                        >
                          Twitter
                        </SmartLink>
                        <SmartLink
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          className="flex items-center justify-center px-4 py-2 bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors text-sm"
                          external
                        >
                          LinkedIn
                        </SmartLink>
                        <button
                          onClick={() => navigator.clipboard.writeText(shareUrl)}
                          className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16 pt-16 border-t border-gray-800">
                  <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {relatedPosts.map(relatedPost => (
                      <SmartLink key={relatedPost.slug} href={`/post/${relatedPost.slug}`} className="group">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                          <Image
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </SmartLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </main>
        
        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-12 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400">© 2024 OverX AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'es', 'ru']
  const paths = []
  
  for (const locale of locales) {
    const posts = await getAllPosts(locale)
    const localePaths = posts.map(post => ({
      params: { slug: post.slug },
      locale
    }))
    paths.push(...localePaths)
  }
  
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  const post = await getPostBySlug(params?.slug as string, locale)
  
  if (!post) {
    return {
      notFound: true
    }
  }
  
  const relatedPosts = await getRelatedPosts(post, locale, 3)
  
  return {
    props: {
      post,
      relatedPosts
    },
    revalidate: 3600 // Revalidate every hour
  }
}