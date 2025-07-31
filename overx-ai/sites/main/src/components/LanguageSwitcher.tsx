import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const languages = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
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
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-md hover:bg-gray-200 dark:hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors">
          <span>{currentLanguage.name}</span>
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
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
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white dark:bg-black/90 backdrop-blur-sm border border-gray-200 dark:border-white/20 divide-y divide-gray-100 dark:divide-white/10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 dark:bg-white/10' : ''
                    } ${
                      language.code === i18n.language ? 'bg-gray-50 dark:bg-white/5' : ''
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 dark:text-white transition-colors`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <span className="mr-3 text-xs font-bold w-6 text-center">{language.flag}</span>
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