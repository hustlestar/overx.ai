import { useState, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table'
import { Currency } from '@/types/api'
import { formatCurrency } from '@/utils/currencies'

interface ExchangeRatesTableProps {
  rates: Record<string, number>
  baseCurrency: string
  currencies: Currency[]
  providerId?: string
}

const columnHelper = createColumnHelper<{
  currency: Currency
  rate: number
  change?: number
}>()

export function ExchangeRatesTable({ rates, baseCurrency, currencies, providerId }: ExchangeRatesTableProps) {
  const { t } = useTranslation('common')
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const data = useMemo(() => {
    return Object.entries(rates)
      .map(([code, rate]) => {
        const currency = currencies.find(c => c.code === code)
        if (!currency) return null
        
        // TODO: Implement real 24h change calculation with historical data
        // For now, using deterministic mock data based on currency code
        const change = ((code.charCodeAt(0) + code.charCodeAt(1)) % 10 - 5) * 0.8
        
        return {
          currency,
          rate,
          change,
        }
      })
      .filter(Boolean) as Array<{
        currency: Currency
        rate: number
        change: number
      }>
  }, [rates, currencies])

  const columns = useMemo(
    () => [
      columnHelper.accessor('currency.code', {
        header: t('rates.currency'),
        cell: (info) => (
          <div className="flex items-center space-x-3">
            {info.row.original.currency.symbol && (
              <div className="text-2xl">{info.row.original.currency.symbol}</div>
            )}
            <div>
              <div className="font-semibold">{info.row.original.currency.code}</div>
              <div className="text-sm text-gray-400">{info.row.original.currency.name}</div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('rate', {
        header: t('rates.rate'),
        cell: (info) => (
          <div className="font-mono font-semibold">
            {info.getValue().toFixed(4)}
          </div>
        ),
      }),
      columnHelper.accessor('change', {
        header: t('rates.change'),
        cell: (info) => {
          const change = info.getValue() || 0
          const isPositive = change > 0
          return (
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              <span>{isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(change).toFixed(2)}%</span>
            </div>
          )
        },
      }),
    ],
    [t]
  )

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
  })

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={t('rates.searchPlaceholder')}
          className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg glass-effect">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-white/10">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer hover:text-white transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <span className="text-blue-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/5 table-row-hover"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer note about percentage changes */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        * 24h change percentages are demo data. Historical data integration coming soon.
      </div>
    </div>
  )
}