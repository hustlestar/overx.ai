import React, { ReactNode } from 'react'
import Link from 'next/link'

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
  target,
  rel = target === '_blank' ? 'noopener noreferrer' : undefined,
  className = ''
}: GradientLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`text-sm font-semibold animated-gradient-text ${className}`}
    >
      {children}
    </Link>
  )
}