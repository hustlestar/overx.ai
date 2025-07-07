import React from 'react'
import { SEOProps } from './types'

interface BaseSEOWithHeadProps extends SEOProps {
  HeadComponent?: React.ComponentType<{ children: React.ReactNode }>
}

export const BaseSEO: React.FC<BaseSEOWithHeadProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  structuredData,
  alternates,
  noindex = false,
  nofollow = false,
  additionalMetaTags = [],
  HeadComponent
}) => {
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`

  const metaTags = (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || 'website'} />
          <meta property="og:title" content={openGraph.title || title} />
          <meta property="og:description" content={openGraph.description || description} />
          {openGraph.url && <meta property="og:url" content={openGraph.url} />}
          {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
          {openGraph.locale && <meta property="og:locale" content={openGraph.locale} />}
          {openGraph.image && (
            <>
              <meta property="og:image" content={openGraph.image.url} />
              {openGraph.image.width && (
                <meta property="og:image:width" content={String(openGraph.image.width)} />
              )}
              {openGraph.image.height && (
                <meta property="og:image:height" content={String(openGraph.image.height)} />
              )}
              {openGraph.image.alt && (
                <meta property="og:image:alt" content={openGraph.image.alt} />
              )}
            </>
          )}
        </>
      )}
      
      {/* Twitter Card */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary'} />
          {twitter.site && <meta name="twitter:site" content={twitter.site} />}
          {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}
          {twitter.title && <meta name="twitter:title" content={twitter.title} />}
          {twitter.description && <meta name="twitter:description" content={twitter.description} />}
          {twitter.image && <meta name="twitter:image" content={twitter.image} />}
          {twitter.imageAlt && <meta name="twitter:image:alt" content={twitter.imageAlt} />}
        </>
      )}
      
      {/* Alternate Languages */}
      {alternates?.map((alternate) => (
        <link
          key={alternate.hrefLang}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      
      {/* Structured Data */}
      {structuredData?.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )

  if (HeadComponent) {
    return <HeadComponent>{metaTags}</HeadComponent>
  }

  // Return meta tags without wrapper for SSR
  return metaTags
}