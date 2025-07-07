import React from 'react'

interface PreloadResource {
  href: string
  as: 'script' | 'style' | 'image' | 'font' | 'fetch'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
}

interface PreloadLinkProps {
  resources: PreloadResource[]
  HeadComponent?: React.ComponentType<{ children: React.ReactNode }>
}

export const PreloadLink: React.FC<PreloadLinkProps> = ({ resources, HeadComponent }) => {
  const links = (
    <>
      {resources.map((resource, index) => (
        <link
          key={index}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
        />
      ))}
    </>
  )

  return HeadComponent ? <HeadComponent>{links}</HeadComponent> : links
}

interface PrefetchLinkProps {
  urls: string[]
  HeadComponent?: React.ComponentType<{ children: React.ReactNode }>
}

export const PrefetchLink: React.FC<PrefetchLinkProps> = ({ urls, HeadComponent }) => {
  const links = (
    <>
      {urls.map((url, index) => (
        <link key={index} rel="prefetch" href={url} />
      ))}
    </>
  )

  return HeadComponent ? <HeadComponent>{links}</HeadComponent> : links
}

interface PreconnectLinkProps {
  origins: string[]
  HeadComponent?: React.ComponentType<{ children: React.ReactNode }>
}

export const PreconnectLink: React.FC<PreconnectLinkProps> = ({ origins, HeadComponent }) => {
  const links = (
    <>
      {origins.map((origin, index) => (
        <link key={index} rel="preconnect" href={origin} />
      ))}
    </>
  )

  return HeadComponent ? <HeadComponent>{links}</HeadComponent> : links
}