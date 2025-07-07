import { GetStaticProps } from 'next'
import { BaseSEO, SmartLink, OptimizedImage, PreconnectLink } from '../components/NextSEO'
import { Breadcrumbs } from '@overx-ai/shared/seo'
import { createOrganizationSchema, createWebSiteSchema } from '@overx-ai/shared/lib/schema'

interface HomePageProps {
  lastModified: string
}

export default function HomePage({ lastModified }: HomePageProps) {
  const structuredData = [
    createOrganizationSchema({
      name: 'OverX.ai',
      url: 'https://overx.ai',
      logo: 'https://overx.ai/logo.png',
      sameAs: [
        'https://twitter.com/overxai',
        'https://linkedin.com/company/overxai',
        'https://github.com/overxai'
      ],
      contactPoint: {
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['en', 'es']
      }
    }),
    createWebSiteSchema({
      name: 'OverX.ai',
      url: 'https://overx.ai',
      potentialAction: true
    })
  ]

  return (
    <>
      <BaseSEO
        title="OverX.ai - AI-Powered Solutions for Modern Businesses"
        description="Transform your business with OverX.ai's cutting-edge AI solutions. Boost productivity, automate workflows, and unlock insights with our enterprise-ready platform."
        canonical="https://overx.ai"
        openGraph={{
          type: 'website',
          title: 'OverX.ai - AI-Powered Business Solutions',
          description: 'Transform your business with cutting-edge AI solutions',
          image: {
            url: 'https://overx.ai/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'OverX.ai Platform Overview'
          },
          siteName: 'OverX.ai',
          locale: 'en_US',
          url: 'https://overx.ai'
        }}
        twitter={{
          card: 'summary_large_image',
          site: '@overxai',
          title: 'OverX.ai - AI-Powered Business Solutions',
          description: 'Transform your business with cutting-edge AI solutions',
          image: 'https://overx.ai/twitter-card.jpg'
        }}
        structuredData={structuredData}
      />
      
      <PreconnectLink origins={['https://cdn.overx.ai', 'https://api.overx.ai']} />
      
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <SmartLink href="/" className="text-2xl font-bold text-gray-900">
                  OverX.ai
                </SmartLink>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <SmartLink href="/products" className="text-gray-700 hover:text-gray-900">
                  Products
                </SmartLink>
                <SmartLink href="/about" className="text-gray-700 hover:text-gray-900">
                  About
                </SmartLink>
                <SmartLink href="https://blog.overx.ai" className="text-gray-700 hover:text-gray-900" external>
                  Blog
                </SmartLink>
                <SmartLink href="/cv" className="text-gray-700 hover:text-gray-900">
                  CV
                </SmartLink>
                <SmartLink 
                  href="/contact" 
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Get Started
                </SmartLink>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          <section className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Transform Your Business with AI
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Harness the power of artificial intelligence to automate workflows, 
                  gain deeper insights, and accelerate growth with OverX.ai's 
                  enterprise-ready platform.
                </p>
                <div className="flex justify-center space-x-4">
                  <SmartLink 
                    href="/demo" 
                    className="bg-primary-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-700"
                  >
                    Request Demo
                  </SmartLink>
                  <SmartLink 
                    href="/products" 
                    className="bg-white text-primary-600 px-8 py-3 rounded-md text-lg font-medium border-2 border-primary-600 hover:bg-primary-50"
                  >
                    Explore Products
                  </SmartLink>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Our AI Solutions
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Product A</h3>
                  <p className="text-gray-600 mb-4">
                    Advanced natural language processing for customer insights
                  </p>
                  <SmartLink 
                    href="https://producta.overx.ai" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    external
                  >
                    Learn More →
                  </SmartLink>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Product B</h3>
                  <p className="text-gray-600 mb-4">
                    Intelligent automation for business processes
                  </p>
                  <SmartLink 
                    href="https://productb.overx.ai" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    external
                  >
                    Learn More →
                  </SmartLink>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Product C</h3>
                  <p className="text-gray-600 mb-4">
                    Predictive analytics and forecasting platform
                  </p>
                  <SmartLink 
                    href="https://productc.overx.ai" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    external
                  >
                    Learn More →
                  </SmartLink>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/products/product-a" className="text-gray-400 hover:text-white">Product A</SmartLink></li>
                  <li><SmartLink href="/products/product-b" className="text-gray-400 hover:text-white">Product B</SmartLink></li>
                  <li><SmartLink href="/products/product-c" className="text-gray-400 hover:text-white">Product C</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/about" className="text-gray-400 hover:text-white">About</SmartLink></li>
                  <li><SmartLink href="/careers" className="text-gray-400 hover:text-white">Careers</SmartLink></li>
                  <li><SmartLink href="/contact" className="text-gray-400 hover:text-white">Contact</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="https://blog.overx.ai" className="text-gray-400 hover:text-white" external>Blog</SmartLink></li>
                  <li><SmartLink href="/docs" className="text-gray-400 hover:text-white">Documentation</SmartLink></li>
                  <li><SmartLink href="/support" className="text-gray-400 hover:text-white">Support</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</SmartLink></li>
                  <li><SmartLink href="/terms" className="text-gray-400 hover:text-white">Terms of Service</SmartLink></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2024 OverX.ai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      lastModified: new Date().toISOString()
    },
    revalidate: 60 * 60 * 24 // Revalidate once per day
  }
}