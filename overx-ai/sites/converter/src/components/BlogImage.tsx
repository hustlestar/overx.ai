interface BlogImageProps {
  title: string
  icon?: string
  gradient?: string
}

export function BlogImage({ title, icon = '📊', gradient = 'from-blue-600/20 to-cyan-600/20' }: BlogImageProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden glass-effect">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-6xl md:text-8xl mb-6">{icon}</div>
        <h3 className="text-xl md:text-2xl font-bold text-white/90 max-w-2xl">
          {title}
        </h3>
      </div>
    </div>
  )
}