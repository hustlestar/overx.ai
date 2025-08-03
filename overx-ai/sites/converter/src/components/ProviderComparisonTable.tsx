import { useState, useMemo, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  FilterFn,
} from '@tanstack/react-table'
import { useAllRates, useProviders, useCurrencies } from '@/hooks/useExchangeRates'
import { formatCurrency } from '@/utils/currencies'
import { CURRENCY_REGIONS } from '@/utils/regions'
import { searchCurrencies } from '@/utils/currencySearch'
import { localizeProviderName, localizeUpdateFrequency, localizeCurrencyName } from '@/utils/localizeProviders'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import { CurrencyCell } from './CurrencyCell'
import { AllRatesResponse } from '@/types/api'

interface ProviderComparisonTableProps {
  baseCurrency: string
  targetCurrencies: string[]
  userCurrencies?: string[]
}

interface TableRow {
  currency: {
    code: string
    name: string
    symbol: string
  }
  providers: Record<string, {
    rate: number | null
    supported: boolean
  }>
  isUserCurrency?: boolean
  sectionHeader?: string
}

const columnHelper = createColumnHelper<TableRow>()

export function ProviderComparisonTable({ baseCurrency, targetCurrencies, userCurrencies = [] }: ProviderComparisonTableProps) {
  const { t, i18n } = useTranslation('common')
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [columnWidths, setColumnWidths] = useState<number[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredCurrency, setHoveredCurrency] = useState<string | null>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLTableSectionElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const stickyScrollRef = useRef<HTMLDivElement>(null)
  const mainTableRef = useRef<HTMLDivElement>(null)
  
  const { defaultTargets, updateDefaultTargets, isPremium, canAddMoreCurrencies } = useUserPreferences()
  const [showLimitMessage, setShowLimitMessage] = useState(false)

  const { data: providersData } = useProviders()
  const { data: currenciesData } = useCurrencies()
  const { data: ratesData } = useAllRates(baseCurrency)

  const providers = providersData || []
  const currencies = currenciesData || []
  
  // Get the most recent update time from all providers
  const getLastUpdateTime = () => {
    if (!ratesData || !(ratesData as AllRatesResponse).providers) return null
    
    const typedRatesData = ratesData as AllRatesResponse
    let mostRecentTime: string | null = null
    
    Object.values(typedRatesData.providers).forEach(provider => {
      if (provider.status === 'success' && provider.last_updated) {
        if (!mostRecentTime || new Date(provider.last_updated) > new Date(mostRecentTime)) {
          mostRecentTime = provider.last_updated
        }
      }
    })
    
    if (mostRecentTime) {
      const date = new Date(mostRecentTime)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      
      if (diffMins < 1) return t('home.justNow', 'Just now')
      if (diffMins < 60) return t('home.minsAgo', '{{mins}} mins ago', { mins: diffMins })
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return t('home.hoursAgo', '{{hours}} hours ago', { hours: diffHours })
      return date.toLocaleDateString()
    }
    
    return null
  }
  
  const handleToggleCurrency = (currencyCode: string) => {
    const isRemoving = defaultTargets.includes(currencyCode)
    
    if (!isRemoving && !canAddMoreCurrencies()) {
      setShowLimitMessage(true)
      setTimeout(() => setShowLimitMessage(false), 3000)
      return
    }
    
    const newTargets = isRemoving
      ? defaultTargets.filter((c: string) => c !== currencyCode)
      : [...defaultTargets, currencyCode]
    updateDefaultTargets(newTargets)
  }

  const data = useMemo(() => {
    if (!ratesData || !currenciesData) return []
    
    const typedRatesData = ratesData as AllRatesResponse
    if (!typedRatesData.providers) return []

    const rows: TableRow[] = []
    const userCurrencySet = new Set(userCurrencies)
    
    // Add section headers and process currencies
    let lastSection = ''
    
    targetCurrencies.forEach(targetCode => {
      const currency = currencies.find(c => c.code === targetCode)
      if (!currency) return
      
      // Determine section
      let currentSection = ''
      let sectionKey = ''
      if (userCurrencySet.has(targetCode)) {
        currentSection = t('regions.yourSelected')
        sectionKey = 'yourSelected'
      } else {
        // Find which region this currency belongs to
        const region = CURRENCY_REGIONS.find(r => r.currencies.includes(targetCode))
        if (region) {
          // Map region IDs to translation keys
          const regionKeyMap: Record<string, string> = {
            'major': 'major',
            'americas': 'americas',
            'europe': 'europe',
            'asia-pacific': 'asiaPacific',
            'middle-east-africa': 'middleEastAfrica',
            'central-asia': 'centralAsia'
          }
          sectionKey = regionKeyMap[region.id] || region.id
          currentSection = t(`regions.${sectionKey}`)
        } else {
          currentSection = t('regions.other')
          sectionKey = 'other'
        }
      }
      
      // Add section header row if section changed
      if (currentSection !== lastSection) {
        rows.push({
          currency: { code: '', name: '', symbol: '' },
          providers: {},
          sectionHeader: currentSection
        })
        lastSection = currentSection
      }

      const providerRates: Record<string, { rate: number | null; supported: boolean }> = {}
      
      // Check each provider in the API response
      Object.entries(typedRatesData.providers).forEach(([providerId, providerData]) => {
        if (providerData.status === 'success' && providerData.rates && providerData.rates[targetCode]) {
          providerRates[providerId] = {
            rate: providerData.rates[targetCode],
            supported: true
          }
        } else {
          providerRates[providerId] = {
            rate: null,
            supported: false
          }
        }
      })

      rows.push({
        currency,
        providers: providerRates,
        isUserCurrency: userCurrencySet.has(targetCode)
      })
    })

    return rows
  }, [targetCurrencies, currencies, providers, ratesData, currenciesData, userCurrencies])

  // Create simplified headers for sticky header (without update frequency)
  const stickyHeaders = useMemo(() => {
    const baseHeader = t('rates.currency')
    const providerHeaders = providers.map(provider => 
      localizeProviderName(provider.id, provider.name, t)
    )
    return [baseHeader, ...providerHeaders]
  }, [t, providers])

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor('currency.code', {
        header: t('rates.currency'),
        cell: (info) => {
          const currencyCode = info.row.original.currency.code
          const localizedName = localizeCurrencyName(currencyCode, t)
          const displayName = localizedName || info.row.original.currency.name
          const isSelected = defaultTargets.includes(currencyCode)
          
          return (
            <CurrencyCell
              currencyCode={currencyCode}
              displayName={displayName}
              symbol={info.row.original.currency.symbol}
              isSelected={isSelected}
              isHovered={hoveredCurrency === currencyCode}
              t={t}
            />
          )
        },
      }),
    ]

    const providerColumns = providers.map(provider => 
      columnHelper.accessor(`providers.${provider.id}`, {
        header: () => (
          <div className="text-center">
            <div className="font-semibold">{localizeProviderName(provider.id, provider.name, t)}</div>
            <div className="text-xs text-gray-400 light:text-gray-600">{localizeUpdateFrequency(provider.updateFrequency, t)}</div>
          </div>
        ),
        cell: (info) => {
          const data = info.row.original.providers[provider.id]
          if (!data || !data.supported) {
            return (
              <div className="text-center text-gray-600 light:text-gray-400">
                <span className="text-sm">{t('providers.notSupported')}</span>
              </div>
            )
          }
          return (
            <div className="text-center">
              <div className="font-mono font-semibold text-green-400 light:text-green-600">
                {data.rate?.toFixed(4) || '-'}
              </div>
            </div>
          )
        },
      })
    )

    return [...baseColumns, ...providerColumns]
  }, [t, providers, defaultTargets, hoveredCurrency])

  // Custom filter function for multi-language search
  const globalFilterFn: FilterFn<TableRow> = (row, columnId, filterValue) => {
    // Skip section header rows
    if (row.original.sectionHeader) {
      return true // Always show section headers
    }

    const searchTerm = filterValue.toLowerCase().trim()
    if (!searchTerm) return true

    // Check currency code
    if (row.original.currency.code.toLowerCase().includes(searchTerm)) {
      return true
    }

    // Check currency name in current language
    if (row.original.currency.name.toLowerCase().includes(searchTerm)) {
      return true
    }

    // Use multi-language search function - search across ALL languages
    const matchedCurrencies = searchCurrencies(searchTerm)
    return matchedCurrencies.includes(row.original.currency.code)
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
  })

  // Handle scroll to show/hide sticky header and sync horizontal scroll
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect()
        // Show sticky header when original header is scrolled above viewport
        setShowStickyHeader(headerRect.bottom < 64)
        
        // Capture column widths when header becomes visible
        if (headerRect.bottom < 64 && columnWidths.length === 0) {
          const ths = headerRef.current.querySelectorAll('th')
          const widths = Array.from(ths).map(th => th.getBoundingClientRect().width)
          setColumnWidths(widths)
        }
      }
      
      // Show scroll-to-top button when scrolled down
      if (mainTableRef.current) {
        const tableRect = mainTableRef.current.getBoundingClientRect()
        const scrolledDown = tableRect.top < -200
        setShowScrollTop(scrolledDown)
      }
    }

    const handleHorizontalScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      setScrollLeft(target.scrollLeft)
      
      // Sync scroll between main table and sticky header
      if (target === scrollContainerRef.current && stickyScrollRef.current) {
        stickyScrollRef.current.scrollLeft = target.scrollLeft
      } else if (target === stickyScrollRef.current && scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = target.scrollLeft
      }
    }

    window.addEventListener('scroll', handleScroll)
    scrollContainerRef.current?.addEventListener('scroll', handleHorizontalScroll)
    stickyScrollRef.current?.addEventListener('scroll', handleHorizontalScroll)
    
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollContainerRef.current?.removeEventListener('scroll', handleHorizontalScroll)
      stickyScrollRef.current?.removeEventListener('scroll', handleHorizontalScroll)
    }
  }, [data, columnWidths.length]) // Re-run when data changes

  if (!ratesData || !providersData || !currenciesData) {
    return (
      <div className="w-full">
        <div className="glass-effect rounded-lg p-8 animate-pulse">
          <div className="h-96 bg-white/10 light:bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }


  return (
    <div className="w-full" ref={mainTableRef}>
      {/* Empty state message when no currencies selected */}
      {defaultTargets.length === 0 && (
        <div className="container mx-auto px-4 mb-6">
          <div className="glass-effect rounded-lg p-6 text-center bg-blue-600/10 light:bg-blue-50 border-blue-600/20 light:border-blue-200">
            <p className="text-sm text-gray-300 light:text-gray-700">
              <span className="text-blue-400 light:text-blue-600">💡</span> {t('providers.selectCurrenciesToCompare', 'Select currencies from the table below to compare exchange rates across providers')}
            </p>
          </div>
        </div>
      )}
      
      {/* Search */}
      <div className="mb-6 container mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t('rates.searchPlaceholder')}
            className="w-full px-4 py-3 pr-12 rounded-lg glass-effect bg-white/5 light:bg-white border border-white/10 light:border-gray-300 focus:border-blue-500 light:focus:border-blue-600 focus:outline-none transition-colors"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 light:hover:bg-gray-200 transition-colors"
              title={t('common.clearSearch', 'Clear search')}
            >
              <svg
                className="w-5 h-5 text-gray-400 light:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Sticky Header (Fixed) */}
      {showStickyHeader && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 light:bg-white/95 backdrop-blur-xl border-b border-white/10 light:border-gray-200">
          <div className="overflow-x-auto overflow-y-hidden" ref={stickyScrollRef}>
            <table className="w-full" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  {table.getHeaderGroups()[0]?.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400 light:text-gray-600 ${
                        index === 0 ? 'sticky left-0 z-50 bg-black light:bg-white after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-white/10 light:after:bg-gray-200' : ''
                      }`}
                      style={{ 
                        width: columnWidths[index] ? `${columnWidths[index]}px` : 'auto',
                        minWidth: columnWidths[index] ? `${columnWidths[index]}px` : 'auto'
                      }}
                    >
                      {index === 0 
                        ? stickyHeaders[0]
                        : <div className="text-center font-semibold">{stickyHeaders[index]}</div>
                      }
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full" ref={tableRef}>
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <table className="w-full rounded-lg glass-effect table-vertical-lines">
            <thead ref={headerRef}>
              {/* Update time row */}
              {getLastUpdateTime() && (
                <tr className="border-b border-white/5 light:border-gray-100">
                  <td colSpan={providers.length + 1} className="px-4 py-2 text-center text-xs text-gray-500 light:text-gray-600 bg-black/50 light:bg-gray-50">
                    {t('home.lastUpdate')}: {getLastUpdateTime()}
                  </td>
                </tr>
              )}
              <tr className="border-b border-white/10 light:border-gray-200">
                {table.getHeaderGroups()[0]?.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-400 light:text-gray-600 bg-black/95 light:bg-white ${
                      index === 0 ? 'sticky left-0 z-20' : ''
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const rowData = row.original
              
              // Render section header
              if (rowData.sectionHeader) {
                // When filtering, check if this section has any visible currency rows
                if (globalFilter) {
                  // Look ahead to see if any currency rows in this section are visible
                  let hasVisibleCurrencies = false
                  for (let i = index + 1; i < table.getRowModel().rows.length; i++) {
                    const nextRow = table.getRowModel().rows[i]
                    // Stop if we hit another section header
                    if (nextRow.original.sectionHeader) break
                    // If we find a currency row, this section has content
                    if (!nextRow.original.sectionHeader && nextRow.original.currency.code) {
                      hasVisibleCurrencies = true
                      break
                    }
                  }
                  
                  // Hide section header if no currencies are visible in this section
                  if (!hasVisibleCurrencies) {
                    return null
                  }
                }

                return (
                  <tr key={row.id} className="bg-white/5 light:bg-gray-100">
                    <td colSpan={providers.length + 1} className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-300 light:text-gray-700 bg-white/5 light:bg-gray-100">
                      {rowData.sectionHeader}
                    </td>
                  </tr>
                )
              }
              
              // Render regular row with highlight for user currencies
              return (
                <tr
                  key={row.id}
                  className={`border-b border-white/5 light:border-gray-100 table-row-hover ${
                    rowData.isUserCurrency ? 'bg-blue-600/5 light:bg-blue-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredCurrency(rowData.currency.code)}
                  onMouseLeave={() => setHoveredCurrency(null)}
                  onClick={() => handleToggleCurrency(rowData.currency.code)}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td key={cell.id} className={`px-2 sm:px-4 py-2 sm:py-4 ${
                      index === 0 ? 'sticky left-0 z-20 bg-black light:bg-white' : ''
                    } ${rowData.isUserCurrency && index === 0 ? 'bg-blue-900/20 light:bg-blue-50' : ''}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Limit message */}
      {showLimitMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p className="text-sm font-medium">
            {t('providers.currencyLimit', 'You can select up to 5 currencies with the free plan. Upgrade to premium for unlimited currencies.')}
          </p>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => {
            mainTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title={t('common.scrollToTop', 'Scroll to top')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400 light:text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-400/20 light:bg-green-500/20"></div>
          <span>{t('providers.availableWithRate')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-600/20 light:bg-gray-400/20"></div>
          <span>{t('providers.notSupportedLegend')}</span>
        </div>
      </div>
    </div>
  )
}