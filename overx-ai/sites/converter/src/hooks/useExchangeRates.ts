import { useQuery } from '@tanstack/react-query'
import { ratesApi } from '@/services/api'
import { PROVIDERS } from '@/utils/providers'
import { extractCurrenciesFromRates } from '@/utils/currencies'

export function useAllRates(base: string = 'USD') {
  return useQuery({
    queryKey: ['rates', 'all', base],
    queryFn: () => ratesApi.getAllRates(base),
    staleTime: 2 * 60 * 60 * 1000, // 2 hours (match localStorage cache)
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    refetchInterval: false, // Don't refetch automatically
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useRatesByProvider(provider: string, base: string = 'USD') {
  return useQuery({
    queryKey: ['rates', provider, base],
    queryFn: () => ratesApi.getRatesByProvider(provider, base),
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    enabled: !!provider,
  })
}

export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => PROVIDERS.filter(p => !p.id.includes('binance')),
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useCurrencies() {
  const { data: ratesData } = useAllRates()
  
  return useQuery({
    queryKey: ['currencies', ratesData],
    queryFn: async () => extractCurrenciesFromRates(ratesData),
    enabled: !!ratesData,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}