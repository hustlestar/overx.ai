import axios from 'axios'
import { AllRatesResponse, ProviderRate, ComparisonResponse } from '@/types/api'

const API_BASE_URL = 'https://api.overx.ai/api/v1'

const CACHE_TTL = 2 * 60 * 60 * 1000 // 2 hours in milliseconds
const COMPARISON_CACHE_TTL = 12 * 60 * 60 * 1000 // 12 hours in milliseconds
const CACHE_PREFIX = 'rates_cache_'
const COMPARISON_CACHE_PREFIX = 'comparison_cache_'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Generic LocalStorage cache helpers
const getCachedData = <T>(prefix: string, key: string, ttl: number): T | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(prefix + key)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()
    
    // Check if cache is still valid
    if (now - timestamp < ttl) {
      return data
    }
    
    // Remove expired cache
    localStorage.removeItem(prefix + key)
    return null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

const setCachedData = <T>(prefix: string, key: string, data: T): void => {
  if (typeof window === 'undefined') return
  
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(prefix + key, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Cache write error:', error)
    // Clear old cache entries if storage is full
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(k => {
        if (k.startsWith(prefix)) {
          localStorage.removeItem(k)
        }
      })
    } catch (e) {
      console.error('Failed to clear cache:', e)
    }
  }
}

export const ratesApi = {
  // Get all rates from all providers for a base currency
  getAllRates: async (base: string): Promise<AllRatesResponse> => {
    const cacheKey = `all_${base}`
    
    // Check localStorage cache first
    const cachedData = getCachedData<AllRatesResponse>(CACHE_PREFIX, cacheKey, CACHE_TTL)
    if (cachedData) {
      return cachedData
    }
    
    // Fetch from API
    const { data } = await apiClient.get<AllRatesResponse>('/rates/all', {
      params: { base },
    })
    
    // Cache the response
    setCachedData(CACHE_PREFIX, cacheKey, data)
    
    return data
  },

  // Get rates from a specific provider
  getRatesByProvider: async (provider: string, base: string): Promise<ProviderRate> => {
    const { data } = await apiClient.get<AllRatesResponse>('/rates', {
      params: { api: provider, base },
    })
    // The API returns the same structure, extract the specific provider
    return data.providers[provider]
  },

  // Get historical comparison data
  getComparison: async (base: string, date: string): Promise<ComparisonResponse> => {
    const cacheKey = `${base}_${date}`
    
    // Check localStorage cache first (12-hour cache)
    const cachedData = getCachedData<ComparisonResponse>(COMPARISON_CACHE_PREFIX, cacheKey, COMPARISON_CACHE_TTL)
    if (cachedData) {
      console.log('[API] Returning cached comparison data for', base, date)
      return cachedData
    }
    
    console.log('[API] Fetching comparison data from API for', base, date)
    
    // Fetch from API
    const { data } = await apiClient.get<any>(`/history/compare/${date}`, {
      params: { base },
    })
    
    console.log('[API] Raw API response:', data)
    
    // Transform the API response to match our expected format
    const transformedData: ComparisonResponse = {
      base: data.base,
      historical_date: data.historical_date,
      comparison: {}
    }
    
    // Transform each provider's data
    if (data.comparison) {
      Object.entries(data.comparison).forEach(([provider, providerData]: [string, any]) => {
        transformedData.comparison[provider] = {
          historical_date: providerData.historical_date,
          current_date: providerData.current_date,
          base: providerData.base,
          changes: {}
        }
        
        // Extract just the change_percent values
        if (providerData.changes) {
          transformedData.comparison[provider].changes = providerData.changes
        }
      })
    }
    
    console.log('[API] Transformed comparison data:', transformedData)
    
    // Cache the transformed response with 12-hour TTL
    setCachedData(COMPARISON_CACHE_PREFIX, cacheKey, transformedData)
    
    return transformedData
  },
}