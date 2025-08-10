import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { BlogImage } from '@/components/BlogImage'
import { BaseSEO, Breadcrumbs } from '@overx-ai/shared'
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from '@/lib/blog/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  slug: string
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const post = getBlogPost(slug)
  const currentLang = i18n.language as 'en' | 'es' | 'ru'

  if (!post) {
    return <div>Post not found</div>
  }

  const structuredData = [
    {
      '@context': 'https://schema.org' as const,
      '@type': 'BlogPosting',
      headline: post.title[currentLang],
      description: post.excerpt[currentLang],
      image: `https://rates.overx.ai${post.image.url}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'OverX AI',
        url: 'https://overx.ai',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://rates.overx.ai/blog/${post.slug}`,
      },
    },
    {
      '@context': 'https://schema.org' as const,
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://converter.overx.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://converter.overx.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title[currentLang],
        },
      ],
    },
  ]

  return (
    <>
      <BaseSEO
        title={post.seo[currentLang].metaTitle}
        description={post.seo[currentLang].metaDescription}
        canonical={`https://converter.overx.ai/blog/${post.slug}`}
        openGraph={{
          title: post.title[currentLang],
          description: post.excerpt[currentLang],
          type: 'article',
          image: {
            url: `https://converter.overx.ai${post.image.url}`,
            width: post.image.width,
            height: post.image.height,
            alt: post.image.alt[currentLang],
          },
        }}
        additionalMetaTags={[
          { property: 'article:published_time', content: post.publishedAt },
          ...(post.updatedAt ? [{ property: 'article:modified_time', content: post.updatedAt }] : []),
          { property: 'article:author', content: post.author.name },
          ...post.tags.map(tag => ({ property: 'article:tag', content: tag }))
        ]}
        structuredData={structuredData}
      />
      
      <Layout>
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.title[currentLang] },
            ]}
          />

          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 light:bg-blue-100 light:text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {post.title[currentLang]}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400 light:text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 light:bg-gray-300"></div>
                <div className="text-left">
                  <p className="font-semibold text-gray-300 light:text-gray-700">{post.author.name}</p>
                  <p className="text-xs">{post.author.role}</p>
                </div>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(currentLang, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-96 mb-12">
            <BlogImage 
              title={post.title[currentLang]} 
              icon="📊" 
              gradient="from-blue-600/20 to-cyan-600/20" 
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert light:prose-not-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-12 mb-6 text-white light:text-gray-900">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-10 mb-4 text-white light:text-gray-900">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-8 mb-3 text-white light:text-gray-900">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 text-gray-300 light:text-gray-700 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 space-y-2 text-gray-300 light:text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 space-y-2 text-gray-300 light:text-gray-700">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="ml-6 list-disc marker:text-blue-400 light:marker:text-blue-600">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-white light:text-gray-900">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-400 light:text-gray-600">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  if (isInline) {
                    return (
                      <code className="px-2 py-1 rounded bg-gray-800 light:bg-gray-200 text-blue-400 light:text-blue-700 font-mono text-sm">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <pre className="mb-6 p-4 rounded-lg bg-gray-900 light:bg-gray-100 overflow-x-auto">
                      <code className="text-gray-300 light:text-gray-700 font-mono text-sm">{children}</code>
                    </pre>
                  )
                },
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-400 light:text-blue-600 hover:text-blue-300 light:hover:text-blue-700 underline"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content[currentLang]}
            </ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-800 light:border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title[currentLang]
                )}&url=${encodeURIComponent(`https://converter.overx.ai/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `https://converter.overx.ai/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://converter.overx.ai/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {getRelatedPosts(post.slug, 3).map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <article className="glass-effect rounded-lg p-6 hover-glow cursor-pointer group h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-blue-600/20 text-blue-400 light:bg-blue-100 light:text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {relatedPost.title[currentLang]}
                    </h3>
                    <p className="text-sm text-gray-400 light:text-gray-600 mb-4 line-clamp-2 flex-grow">
                      {relatedPost.excerpt[currentLang]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 light:text-gray-500">
                        {relatedPost.readingTime} min read
                      </span>
                      <span className="text-blue-400 light:text-blue-600 text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = getAllBlogPosts()
  const paths: any[] = []
  
  // Generate paths for all locales
  if (locales) {
    locales.forEach((locale) => {
      posts.forEach((post) => {
        paths.push({
          params: { slug: post.slug },
          locale,
        })
      })
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
  locale,
}) => {
  const slug = params?.slug as string

  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}