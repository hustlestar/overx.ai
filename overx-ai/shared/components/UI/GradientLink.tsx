import React, { ReactNode } from 'react'

interface GradientLinkProps {
  href: string
  children: ReactNode
  target?: string
  rel?: string
  className?: string
}

export function GradientLink({ 
  href, 
  children, 
  target = '_blank',
  rel = 'noopener noreferrer',
  className = ''
}: GradientLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`text-sm font-semibold animated-gradient-text ${className}`}
    >
      {children}
    </a>
  )
}