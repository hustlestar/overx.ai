import { useQuery } from '@tanstack/react-query'
import { ratesApi } from '@/services/api'
import { ComparisonResponse } from '@/types/api'

export function useHistoricalComparison(base: string, period: 7 | 30) {
  // Calculate the historical date based on the period
  const calculateHistoricalDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - period)
    return date.toISOString().split('T')[0] // Format as YYYY-MM-DD
  }

  const historicalDate = calculateHistoricalDate()

  return useQuery<ComparisonResponse>({
    queryKey: ['comparison', base, historicalDate],
    queryFn: async () => {
      console.log(`[Comparison] Fetching comparison data for ${base} from ${historicalDate} (${period} days ago)`)
      const data = await ratesApi.getComparison(base, historicalDate)
      console.log('[Comparison] Response:', data)
      return data
    },
    staleTime: 12 * 60 * 60 * 1000, // 12 hours (match localStorage cache)
    gcTime: 12 * 60 * 60 * 1000, // 12 hours
    refetchInterval: false, // Don't refetch automatically
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}