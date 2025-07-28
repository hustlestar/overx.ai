import axios from 'axios'
import { AllRatesResponse, ProviderRate } from '@/types/api'

const API_BASE_URL = 'https://api.overx.ai/api/v1'

const CACHE_TTL = 2 * 60 * 60 * 1000 // 2 hours in milliseconds
const CACHE_PREFIX = 'rates_cache_'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// LocalStorage cache helpers
const getCachedData = (key: string): AllRatesResponse | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()
    
    // Check if cache is still valid (2 hours)
    if (now - timestamp < CACHE_TTL) {
      return data
    }
    
    // Remove expired cache
    localStorage.removeItem(CACHE_PREFIX + key)
    return null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

const setCachedData = (key: string, data: AllRatesResponse): void => {
  if (typeof window === 'undefined') return
  
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Cache write error:', error)
    // Clear old cache entries if storage is full
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(k => {
        if (k.startsWith(CACHE_PREFIX)) {
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
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    // Fetch from API
    const { data } = await apiClient.get<AllRatesResponse>('/rates/all', {
      params: { base },
    })
    
    // Cache the response
    setCachedData(cacheKey, data)
    
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
}