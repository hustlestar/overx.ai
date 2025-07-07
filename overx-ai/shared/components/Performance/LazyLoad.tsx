import React, { useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  offset?: number
  placeholder?: React.ReactNode
  className?: string
  once?: boolean
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  offset = 100,
  placeholder = null,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasBeenVisible = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            hasBeenVisible.current = true
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once && hasBeenVisible.current) {
            setIsVisible(false)
          }
        })
      },
      {
        rootMargin: `${offset}px`
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [offset, once])

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : placeholder}
    </div>
  )
}