export interface CurrencyRegion {
  id: string
  name: string
  currencies: string[]
  priority?: number
}

export const CURRENCY_REGIONS: CurrencyRegion[] = [
  {
    id: 'major',
    name: 'Major Currencies',
    currencies: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'],
    priority: 0
  },
  {
    id: 'americas',
    name: 'Americas',
    currencies: ['CAD', 'MXN', 'BRL', 'ARS', 'CLP', 'COP', 'PEN', 'UYU', 'BOB', 'PYG', 'VES', 'GTQ', 'HNL', 'NIO', 'CRC', 'PAB', 'DOP', 'CUP', 'JMD', 'TTD', 'BBD', 'BSD', 'BZD']
  },
  {
    id: 'europe',
    name: 'Europe',
    currencies: ['CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'RSD', 'UAH', 'RUB', 'BYN', 'GEL', 'AMD', 'AZN', 'TRY', 'ISK', 'ALL', 'BAM', 'MKD', 'MDL']
  },
  {
    id: 'asia-pacific',
    name: 'Asia-Pacific',
    currencies: ['AUD', 'NZD', 'SGD', 'HKD', 'KRW', 'TWD', 'INR', 'PKR', 'BDT', 'LKR', 'NPR', 'THB', 'MYR', 'PHP', 'IDR', 'VND', 'MMK', 'KHR', 'LAK', 'BND', 'MOP', 'FJD', 'PGK', 'SBD', 'VUV', 'WST', 'TOP', 'MNT']
  },
  {
    id: 'middle-east-africa',
    name: 'Middle East & Africa',
    currencies: ['AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'ILS', 'EGP', 'MAD', 'TND', 'DZD', 'LYD', 'SDG', 'ETB', 'KES', 'TZS', 'UGX', 'GHS', 'NGN', 'ZAR', 'ZMW', 'ZWL', 'MUR', 'SCR', 'BWP', 'NAD', 'SZL', 'LSL', 'MWK', 'MZN', 'AOA', 'XAF', 'XOF']
  },
  {
    id: 'central-asia',
    name: 'Central Asia',
    currencies: ['KZT', 'UZS', 'TJS', 'KGS', 'TMT', 'AFN', 'IRR', 'IQD', 'SYP', 'LBP', 'YER']
  }
]

// Map country codes to regions for IP-based detection
export const COUNTRY_TO_REGION: Record<string, string> = {
  // Americas
  'US': 'americas', 'CA': 'americas', 'MX': 'americas', 'BR': 'americas',
  'AR': 'americas', 'CL': 'americas', 'CO': 'americas', 'PE': 'americas',
  
  // Europe
  'GB': 'europe', 'DE': 'europe', 'FR': 'europe', 'IT': 'europe',
  'ES': 'europe', 'NL': 'europe', 'BE': 'europe', 'CH': 'europe',
  'AT': 'europe', 'SE': 'europe', 'NO': 'europe', 'DK': 'europe',
  'FI': 'europe', 'PL': 'europe', 'CZ': 'europe', 'HU': 'europe',
  'RO': 'europe', 'BG': 'europe', 'HR': 'europe', 'RS': 'europe',
  'UA': 'europe', 'RU': 'europe', 'BY': 'europe', 'GE': 'europe',
  'AM': 'europe', 'AZ': 'europe', 'TR': 'europe', 'IS': 'europe',
  
  // Asia-Pacific
  'CN': 'asia-pacific', 'JP': 'asia-pacific', 'KR': 'asia-pacific',
  'IN': 'asia-pacific', 'AU': 'asia-pacific', 'NZ': 'asia-pacific',
  'SG': 'asia-pacific', 'HK': 'asia-pacific', 'TW': 'asia-pacific',
  'TH': 'asia-pacific', 'MY': 'asia-pacific', 'ID': 'asia-pacific',
  'PH': 'asia-pacific', 'VN': 'asia-pacific', 'PK': 'asia-pacific',
  'BD': 'asia-pacific', 'LK': 'asia-pacific', 'NP': 'asia-pacific',
  
  // Middle East & Africa
  'AE': 'middle-east-africa', 'SA': 'middle-east-africa',
  'QA': 'middle-east-africa', 'KW': 'middle-east-africa',
  'BH': 'middle-east-africa', 'OM': 'middle-east-africa',
  'JO': 'middle-east-africa', 'IL': 'middle-east-africa',
  'EG': 'middle-east-africa', 'MA': 'middle-east-africa',
  'TN': 'middle-east-africa', 'DZ': 'middle-east-africa',
  'ZA': 'middle-east-africa', 'NG': 'middle-east-africa',
  'KE': 'middle-east-africa', 'ET': 'middle-east-africa',
  'GH': 'middle-east-africa', 'TZ': 'middle-east-africa',
  
  // Central Asia
  'KZ': 'central-asia', 'UZ': 'central-asia', 'TJ': 'central-asia',
  'KG': 'central-asia', 'TM': 'central-asia', 'AF': 'central-asia',
  'IR': 'central-asia', 'IQ': 'central-asia', 'SY': 'central-asia',
  'LB': 'central-asia', 'YE': 'central-asia'
}

export function getRegionsByUserLocation(countryCode?: string): CurrencyRegion[] {
  const userRegion = countryCode ? COUNTRY_TO_REGION[countryCode] : null
  
  if (!userRegion) {
    return CURRENCY_REGIONS
  }
  
  // Sort regions to put user's region after major currencies
  const sortedRegions = [...CURRENCY_REGIONS].sort((a, b) => {
    if (a.id === 'major') return -1
    if (b.id === 'major') return 1
    if (a.id === userRegion) return -1
    if (b.id === userRegion) return 1
    return 0
  })
  
  return sortedRegions
}