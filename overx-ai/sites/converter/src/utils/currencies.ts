// Common currency codes that we'll extract from the API response
export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  NZD: 'New Zealand Dollar',
  CNY: 'Chinese Yuan',
  HKD: 'Hong Kong Dollar',
  SGD: 'Singapore Dollar',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  PLN: 'Polish Zloty',
  CZK: 'Czech Koruna',
  HUF: 'Hungarian Forint',
  RON: 'Romanian Leu',
  BGN: 'Bulgarian Lev',
  HRK: 'Croatian Kuna',
  RUB: 'Russian Ruble',
  TRY: 'Turkish Lira',
  KRW: 'South Korean Won',
  INR: 'Indian Rupee',
  BRL: 'Brazilian Real',
  MXN: 'Mexican Peso',
  ZAR: 'South African Rand',
  THB: 'Thai Baht',
  MYR: 'Malaysian Ringgit',
  PHP: 'Philippine Peso',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli Shekel',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  QAR: 'Qatari Riyal',
  KWD: 'Kuwaiti Dinar',
  BHD: 'Bahraini Dinar',
  OMR: 'Omani Rial',
  JOD: 'Jordanian Dinar',
  EGP: 'Egyptian Pound',
  MAD: 'Moroccan Dirham',
  TND: 'Tunisian Dinar',
  ARS: 'Argentine Peso',
  CLP: 'Chilean Peso',
  COP: 'Colombian Peso',
  PEN: 'Peruvian Sol',
  UYU: 'Uruguayan Peso',
  BOB: 'Bolivian Boliviano',
  PYG: 'Paraguayan Guarani',
  VES: 'Venezuelan Bolivar',
  UAH: 'Ukrainian Hryvnia',
  BYN: 'Belarusian Ruble',
  GEL: 'Georgian Lari',
  AMD: 'Armenian Dram',
  AZN: 'Azerbaijani Manat',
  KZT: 'Kazakhstani Tenge',
  UZS: 'Uzbekistani Som',
  TJS: 'Tajikistani Somoni',
  KGS: 'Kyrgyzstani Som',
  TMT: 'Turkmenistani Manat',
  MDL: 'Moldovan Leu',
  ALL: 'Albanian Lek',
  BAM: 'Bosnia-Herzegovina Mark',
  MKD: 'Macedonian Denar',
  RSD: 'Serbian Dinar',
  ISK: 'Icelandic Krona',
  TWD: 'Taiwan Dollar',
  VND: 'Vietnamese Dong',
  PKR: 'Pakistani Rupee',
  BDT: 'Bangladeshi Taka',
  LKR: 'Sri Lankan Rupee',
  NPR: 'Nepalese Rupee',
  AFN: 'Afghan Afghani',
  IRR: 'Iranian Rial',
  IQD: 'Iraqi Dinar',
  SYP: 'Syrian Pound',
  LBP: 'Lebanese Pound',
  YER: 'Yemeni Rial',
  LYD: 'Libyan Dinar',
  DZD: 'Algerian Dinar',
  SDG: 'Sudanese Pound',
  ETB: 'Ethiopian Birr',
  KES: 'Kenyan Shilling',
  TZS: 'Tanzanian Shilling',
  UGX: 'Ugandan Shilling',
  GHS: 'Ghanaian Cedi',
  NGN: 'Nigerian Naira',
  ZMW: 'Zambian Kwacha',
  ZWL: 'Zimbabwean Dollar',
  MUR: 'Mauritian Rupee',
  SCR: 'Seychellois Rupee',
  BWP: 'Botswana Pula',
  NAD: 'Namibian Dollar',
  SZL: 'Swazi Lilangeni',
  LSL: 'Lesotho Loti',
  MWK: 'Malawian Kwacha',
  MZN: 'Mozambican Metical',
  AOA: 'Angolan Kwanza',
  XAF: 'Central African CFA Franc',
  XOF: 'West African CFA Franc',
  XPF: 'CFP Franc',
  DJF: 'Djiboutian Franc',
  GNF: 'Guinean Franc',
  KMF: 'Comorian Franc',
  CDF: 'Congolese Franc',
  RWF: 'Rwandan Franc',
  BIF: 'Burundian Franc',
  MGA: 'Malagasy Ariary',
  HTG: 'Haitian Gourde',
  JMD: 'Jamaican Dollar',
  TTD: 'Trinidad and Tobago Dollar',
  BBD: 'Barbadian Dollar',
  BSD: 'Bahamian Dollar',
  BZD: 'Belize Dollar',
  GTQ: 'Guatemalan Quetzal',
  HNL: 'Honduran Lempira',
  NIO: 'Nicaraguan Córdoba',
  CRC: 'Costa Rican Colón',
  PAB: 'Panamanian Balboa',
  DOP: 'Dominican Peso',
  CUP: 'Cuban Peso',
  AWG: 'Aruban Florin',
  ANG: 'Netherlands Antillean Guilder',
  FJD: 'Fijian Dollar',
  PGK: 'Papua New Guinean Kina',
  SBD: 'Solomon Islands Dollar',
  VUV: 'Vanuatu Vatu',
  WST: 'Samoan Tala',
  TOP: 'Tongan Paʻanga',
  MMK: 'Myanmar Kyat',
  KHR: 'Cambodian Riel',
  LAK: 'Lao Kip',
  MNT: 'Mongolian Tugrik',
  KPW: 'North Korean Won',
  BTN: 'Bhutanese Ngultrum',
  MVR: 'Maldivian Rufiyaa',
  BND: 'Brunei Dollar',
  MOP: 'Macanese Pataca',
  GMD: 'Gambian Dalasi',
  SLL: 'Sierra Leonean Leone',
  LRD: 'Liberian Dollar',
  CVE: 'Cape Verdean Escudo',
  STN: 'São Tomé and Príncipe Dobra',
  ERN: 'Eritrean Nakfa',
  SOS: 'Somali Shilling',
  GIP: 'Gibraltar Pound',
  FKP: 'Falkland Islands Pound',
  SHP: 'Saint Helena Pound',
  XCD: 'East Caribbean Dollar',
  GYD: 'Guyanese Dollar',
  SRD: 'Surinamese Dollar',
  FOK: 'Faroese Króna',
  GGP: 'Guernsey Pound',
  IMP: 'Manx Pound',
  JEP: 'Jersey Pound',
  KID: 'Kiribati Dollar',
  TVD: 'Tuvaluan Dollar',
  XDR: 'Special Drawing Rights',
  XXX: 'No currency',
}

export function formatCurrency(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount)
  } catch (error) {
    // Fallback for unsupported currency codes
    return `${amount.toFixed(2)} ${currencyCode}`
  }
}

export function calculateTriangulation(
  amount: number,
  fromRate: number,
  toRate: number,
  viaRate: number
): number {
  // Convert from source to via currency
  const viaAmount = (amount * fromRate) / viaRate
  // Convert from via to target currency
  return (viaAmount * viaRate) / toRate
}

// List of cryptocurrency codes to exclude
const CRYPTO_CURRENCIES = new Set([
  'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE', 'AVAX', 'SHIB',
  'MATIC', 'LTC', 'UNI', 'LINK', 'XLM', 'ATOM', 'XMR', 'ETC', 'BCH', 'ALGO',
  'VET', 'FIL', 'ICP', 'MANA', 'SAND', 'AXS', 'THETA', 'FTM', 'HBAR', 'EGLD',
  'XTZ', 'CHZ', 'ENJ', 'NEAR', 'GRT', 'KLAY', 'FLOW', 'HNT', 'CRV', 'LRC',
  'USDT', 'USDC', 'BUSD', 'UST', 'DAI', 'FRAX', 'TUSD', 'USDP', 'GUSD', 'PAXG',
  'XCG', 'BMD', 'BYR', 'CLF', 'CUC', 'LTL', 'LVL', 'STD', 'SVC', 'ZMK',
  'XAG', 'XAU', 'XPD', 'XPT', 'SLE', 'SSP', 'MRU', 'CNH', 'KYD', 'ZWG'
])

// Extract currencies from API response
export function extractCurrenciesFromRates(ratesData: any): any[] {
  const currencySet = new Set<string>()
  
  if (ratesData && ratesData.providers) {
    Object.values(ratesData.providers).forEach((provider: any) => {
      if (provider.rates) {
        Object.keys(provider.rates).forEach(code => {
          // Exclude cryptocurrencies
          if (!CRYPTO_CURRENCIES.has(code)) {
            currencySet.add(code)
          }
        })
      }
    })
  }
  
  // Add base currency if it's not a crypto
  if (ratesData && ratesData.base && !CRYPTO_CURRENCIES.has(ratesData.base)) {
    currencySet.add(ratesData.base)
  }
  
  return Array.from(currencySet).map(code => ({
    code,
    name: CURRENCY_NAMES[code] || code,
  })).sort((a, b) => a.code.localeCompare(b.code))
}