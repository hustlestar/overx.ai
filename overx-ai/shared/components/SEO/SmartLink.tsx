import React from 'react'

interface SmartLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  preload?: boolean
  trackClick?: boolean
  external?: boolean
  rel?: string
  LinkComponent?: React.ComponentType<any>
  useRouter?: () => { pathname: string; prefetch: (url: string) => void }
}

export const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  className = '',
  prefetch = true,
  preload = false,
  trackClick = true,
  external = false,
  rel,
  LinkComponent,
  useRouter
}) => {
  // Check if URL is truly external (not an OverX subdomain)
  const isOverXDomain = href.includes('overx.ai') || href.includes('localhost')
  const isExternal = external || (href.startsWith('http') && !isOverXDomain)
  const router = useRouter?.()
  const isActive = router?.pathname === href

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (trackClick && typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'Internal Link',
        event_label: href,
        transport_type: 'beacon'
      })
    }

    if (preload && !isExternal && router) {
      router.prefetch(href)
    }
  }

  const relValue = rel || (isExternal ? 'noopener noreferrer' : undefined)

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel={relValue}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </a>
    )
  }

  // Use provided Link component or fallback to regular anchor
  if (LinkComponent) {
    const linkProps: any = {
      href,
      className,
      onClick: handleClick,
      rel: relValue,
      'aria-current': isActive ? 'page' : undefined
    }
    
    return (
      <LinkComponent {...linkProps}>
        {children}
      </LinkComponent>
    )
  }

  // Fallback to regular anchor tag
  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      rel={relValue}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}