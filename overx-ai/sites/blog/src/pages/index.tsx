import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          OverX AI Blog
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Welcome to the OverX AI Blog - Insights on AI and productivity
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <article className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Introduction to OverX AI</h2>
            <p className="text-gray-400 mb-4">
              Discover how OverX AI is revolutionizing productivity through intelligent automation.
            </p>
            <a href="/post/introducing-overx-ai" className="text-blue-400 hover:text-blue-300">
              Read more →
            </a>
          </article>

          <article className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">AI-Powered Productivity</h2>
            <p className="text-gray-400 mb-4">
              Learn how AI tools can help you reclaim your time and focus on what matters.
            </p>
            <a href="/post/ai-productivity" className="text-blue-400 hover:text-blue-300">
              Read more →
            </a>
          </article>

          <article className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Getting Started Guide</h2>
            <p className="text-gray-400 mb-4">
              A comprehensive guide to getting started with OverX AI tools and services.
            </p>
            <a href="/post/getting-started" className="text-blue-400 hover:text-blue-300">
              Read more →
            </a>
          </article>
        </div>

        <div className="mt-20 p-8 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">About OverX AI</h2>
          <p className="text-gray-300 mb-6">
            OverX AI is dedicated to building intelligent tools that give people more free time.
            Our suite of AI-powered applications helps automate repetitive tasks, enhance productivity,
            and simplify complex workflows.
          </p>
          <div className="flex gap-4">
            <a
              href="https://overx.ai"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Visit Main Site
            </a>
            <a
              href="https://rates.overx.ai"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Try Our Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}