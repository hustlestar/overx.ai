export interface ProviderRate {
  status: string
  rates: Record<string, number>
  last_updated: string
}

export interface AllRatesResponse {
  base: string
  providers: {
    [key: string]: ProviderRate
  }
}

export interface Provider {
  id: string
  name: string
  type: 'free' | 'paid' | 'freemium'
  supportedCurrencies: string[]
  updateFrequency: string
}

export interface Currency {
  code: string
  name: string
  symbol?: string
}

export interface HistoricalComparison {
  historical_date: string
  current_date: string
  base: string
  changes: Record<string, number>
}

export interface ComparisonResponse {
  base: string
  historical_date: string
  comparison: {
    [provider: string]: HistoricalComparison
  }
}

export interface RateWithChange {
  currency: Currency
  rate: number
  change?: number
}