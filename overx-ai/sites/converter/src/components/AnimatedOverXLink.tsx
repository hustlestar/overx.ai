import Link from 'next/link'
import { useState, useEffect } from 'react'

export function AnimatedOverXLink() {
  const [isHovered, setIsHovered] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setSparkles(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100
          }
        ])
      }, 300)

      return () => clearInterval(interval)
    }
  }, [isHovered])

  useEffect(() => {
    const timer = setInterval(() => {
      setSparkles(prev => prev.filter(sparkle => Date.now() - sparkle.id < 1000))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <Link
      href="https://overx.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative px-5 py-2 overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
      
      {/* Pulsing border */}
      <div className="absolute inset-0 rounded-lg border border-gray-600 group-hover:border-transparent transition-all duration-300">
        <div className="absolute inset-0 rounded-lg border border-purple-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12" />
      </div>
      
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: '1s'
          }}
        />
      ))}
      
      {/* Text with gradient animation */}
      <span className="relative z-10 font-bold text-sm bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 group-hover:from-white group-hover:via-yellow-200 group-hover:to-white bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-wider">
        OverX AI
      </span>
      
      {/* Particles effect on hover */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-32 group-hover:h-32 transition-all duration-700">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 animate-pulse" />
        </div>
      </div>
      
      {/* Light mode adjustments */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 light:group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
    </Link>
  )
}