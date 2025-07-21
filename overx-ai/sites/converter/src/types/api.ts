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