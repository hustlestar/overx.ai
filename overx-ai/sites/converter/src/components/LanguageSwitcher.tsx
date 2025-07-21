import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    router.push(router.pathname, router.asPath, { locale: langCode })
    setIsOpen(false)
  }

  return (
    <div className="relative z-[90]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-effect hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg glass-effect overflow-hidden z-[100] shadow-2xl border border-white/20 light:border-gray-200 light:bg-white">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                lang.code === i18n.language
                  ? 'bg-blue-600/20 text-blue-400 light:bg-blue-100 light:text-blue-700'
                  : 'hover:bg-white/10 light:hover:bg-gray-100'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}