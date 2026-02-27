import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'es', label: 'ES' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()

  const switchLanguage = (locale: string) => {
    document.cookie = `overx-locale=${locale};path=/;domain=.overx.ai;max-age=31536000`
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLanguage(code)}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            i18n.language === code
              ? 'bg-blue-500 text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
