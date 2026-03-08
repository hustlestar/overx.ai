type LegalLang = 'en' | 'ru' | 'es'

const labels: Record<LegalLang, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
}

interface LegalLanguageTabsProps {
  selectedLang: LegalLang
  onSelect: (lang: LegalLang) => void
}

export function LegalLanguageTabs({ selectedLang, onSelect }: LegalLanguageTabsProps) {
  return (
    <div className="flex gap-2 mb-10">
      {(Object.keys(labels) as LegalLang[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onSelect(lang)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedLang === lang
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {labels[lang]}
        </button>
      ))}
    </div>
  )
}
