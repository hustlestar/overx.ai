import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

interface LazyProviderTableProps {
  baseCurrency: string
  targetCurrencies: string[]
  userCurrencies?: string[]
}

// Skeleton loader component
function ProviderTableSkeleton() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 mb-6">
        <div className="h-8 w-96 bg-white/10 rounded animate-pulse"></div>
      </div>
      <div className="w-full">
        <div className="glass-effect rounded-lg p-8 animate-pulse">
          <div className="h-96 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// Dynamically import the heavy table component
const ProviderComparisonTable = dynamic(
  () => import('./ProviderComparisonTable').then((mod) => mod.ProviderComparisonTable),
  {
    loading: () => <ProviderTableSkeleton />,
    ssr: false, // Don't render on server to improve initial load
  }
)

export function LazyProviderTable(props: LazyProviderTableProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  
  useEffect(() => {
    // Check if component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
        }
      },
      { 
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01 
      }
    )
    
    const trigger = document.getElementById('provider-table-trigger')
    if (trigger) {
      observer.observe(trigger)
    }
    
    // Also load after a short delay to ensure good UX
    const timer = setTimeout(() => setShouldLoad(true), 2000)
    
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
  
  return (
    <>
      <div id="provider-table-trigger" className="w-full">
        {shouldLoad ? (
          <ProviderComparisonTable {...props} />
        ) : (
          <ProviderTableSkeleton />
        )}
      </div>
    </>
  )
}