import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'next-i18next'
import { Currency } from '@/types/api'
import { localizeCurrencyName } from '@/utils/localizeProviders'
import { CurrencyFlag } from './CurrencyFlag'

interface CurrencySelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
  currencies: Currency[]
}

export function CurrencySelector({ label, value, onChange, currencies = [] }: CurrencySelectorProps) {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

  const selectedCurrency = currencies.find(c => c.code === value)
  const selectedCurrencyName = selectedCurrency ? 
    (localizeCurrencyName(selectedCurrency.code, t) || selectedCurrency.name) : ''
  
  const filteredCurrencies = currencies.filter(currency => {
    const localizedName = localizeCurrencyName(currency.code, t) || currency.name
    return (
      currency.code.toLowerCase().includes(search.toLowerCase()) ||
      currency.name.toLowerCase().includes(search.toLowerCase()) ||
      localizedName.toLowerCase().includes(search.toLowerCase())
    )
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }, [isOpen])

  const handleSelect = (currency: Currency) => {
    onChange(currency.code)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div className="relative z-[60]" ref={dropdownRef}>
      <label className="block text-sm text-gray-400 light:text-gray-600 mb-2">{label}</label>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 light:bg-white border border-white/10 light:border-gray-300 focus:border-blue-500 light:focus:border-blue-600 focus:outline-none transition-colors flex items-center justify-between"
        disabled={!selectedCurrency}
      >
        <div className="flex items-center space-x-2">
          {selectedCurrency && <CurrencyFlag currencyCode={selectedCurrency.code} className="text-lg" />}
          <span className="font-semibold">{selectedCurrency?.code || value}</span>
          <span className="text-sm text-gray-400 light:text-gray-600">{selectedCurrencyName || 'Loading...'}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[9999]" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown */}
          <div 
            ref={dropdownRef}
            className="fixed z-[10000] rounded-lg shadow-2xl bg-black/95 light:bg-white backdrop-blur-xl border border-white/20 light:border-gray-200 overflow-hidden"
            style={{ 
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            <div className="p-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('home.searchCurrencies')}
                className="w-full px-3 py-2 rounded-lg bg-white/10 light:bg-gray-100 border border-white/10 light:border-gray-300 focus:border-blue-500 light:focus:border-blue-600 focus:outline-none transition-colors text-sm"
                autoFocus
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCurrencies.map((currency) => {
                const localizedName = localizeCurrencyName(currency.code, t) || currency.name
                return (
                  <button
                    key={currency.code}
                    onClick={() => handleSelect(currency)}
                    className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between ${
                      currency.code === value
                        ? 'bg-blue-600/20 text-blue-400 light:bg-blue-100 light:text-blue-700'
                        : 'hover:bg-white/10 light:hover:bg-gray-100'
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{currency.code}</span>
                      <span className="text-sm text-gray-400 light:text-gray-600 ml-2">{localizedName}</span>
                    </div>
                    <CurrencyFlag currencyCode={currency.code} className="text-lg" />
                  </button>
                )
              })}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}