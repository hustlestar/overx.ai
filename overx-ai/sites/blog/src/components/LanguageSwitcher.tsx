import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FlagImage } from '@overx-ai/shared'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: langCode })
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white light:text-gray-900 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-md hover:bg-white/20 light:hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 light:focus-visible:ring-blue-600 focus-visible:ring-opacity-75 transition-colors">
          <FlagImage emoji={currentLanguage.flag} alt={currentLanguage.name} size={20} />
          <span className="ml-2">{currentLanguage.name}</span>
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-gray-400 light:text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-black/90 light:bg-white backdrop-blur-sm border border-white/20 light:border-gray-200 divide-y divide-white/10 light:divide-gray-100 rounded-md shadow-lg ring-1 ring-black light:ring-gray-300 ring-opacity-5 light:ring-opacity-20 focus:outline-none">
          <div className="px-1 py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-white/10 light:bg-gray-100' : ''
                    } ${
                      language.code === i18n.language ? 'bg-white/5 light:bg-gray-50' : ''
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white light:text-gray-900 transition-colors`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <FlagImage emoji={language.flag} alt={language.name} size={20} className="mr-3" />
                    {language.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}