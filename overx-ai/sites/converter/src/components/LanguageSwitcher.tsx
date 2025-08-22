import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useRef, useEffect } from 'react'
import { FlagImage } from '@overx-ai/shared/components/UI'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
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
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-900/50 light:bg-white border border-gray-800 light:border-gray-200 hover:bg-gray-800 light:hover:bg-gray-50 transition-colors"
      >
        <FlagImage
          emoji={currentLanguage.flag}
          alt={currentLanguage.name}
          size={20}
        />
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
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 light:bg-white overflow-hidden z-[100] shadow-2xl border border-gray-800 light:border-gray-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                lang.code === i18n.language
                  ? 'bg-blue-600 text-white light:bg-blue-500 light:text-white'
                  : 'hover:bg-gray-800 light:hover:bg-gray-100 text-gray-300 light:text-gray-700'
              }`}
            >
              <FlagImage
                emoji={lang.flag}
                alt={lang.name}
                size={20}
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}