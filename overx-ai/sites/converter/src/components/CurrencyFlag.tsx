import { getCurrencyFlag } from '../utils/currencyFlags'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

// Map currency codes to country codes for flag-icons library
const currencyToCountry: Record<string, string> = {
  USD: 'us',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  CHF: 'ch',
  CAD: 'ca',
  AUD: 'au',
  NZD: 'nz',
  CNY: 'cn',
  HKD: 'hk',
  SGD: 'sg',
  SEK: 'se',
  NOK: 'no',
  DKK: 'dk',
  PLN: 'pl',
  CZK: 'cz',
  HUF: 'hu',
  RON: 'ro',
  BGN: 'bg',
  HRK: 'hr',
  RUB: 'ru',
  TRY: 'tr',
  KRW: 'kr',
  INR: 'in',
  BRL: 'br',
  MXN: 'mx',
  ZAR: 'za',
  THB: 'th',
  MYR: 'my',
  PHP: 'ph',
  IDR: 'id',
  ILS: 'il',
  AED: 'ae',
  SAR: 'sa',
  EGP: 'eg',
  PKR: 'pk',
  CLP: 'cl',
  COP: 'co',
  PEN: 'pe',
  ARS: 'ar',
  VND: 'vn',
  TWD: 'tw',
  ISK: 'is',
  BAM: 'ba',
  ALL: 'al',
  RSD: 'rs',
  MKD: 'mk',
  BYN: 'by',
  UAH: 'ua',
  GEL: 'ge',
  AMD: 'am',
  AZN: 'az',
  MDL: 'md',
  TMT: 'tm',
  UZS: 'uz',
  KZT: 'kz',
  KGS: 'kg',
  TJS: 'tj',
  BDT: 'bd',
  LKR: 'lk',
  NPR: 'np',
  AFN: 'af',
  MMK: 'mm',
  KHR: 'kh',
  LAK: 'la',
  MNT: 'mn',
  BTN: 'bt',
  MVR: 'mv',
  BND: 'bn',
  MOP: 'mo',
  QAR: 'qa',
  KWD: 'kw',
  BHD: 'bh',
  OMR: 'om',
  JOD: 'jo',
  LBP: 'lb',
  SYP: 'sy',
  YER: 'ye',
  IQD: 'iq',
  IRR: 'ir',
  LYD: 'ly',
  TND: 'tn',
  DZD: 'dz',
  MAD: 'ma',
  NGN: 'ng',
  GHS: 'gh',
  KES: 'ke',
  UGX: 'ug',
  TZS: 'tz',
  ETB: 'et',
  SDG: 'sd',
  ZMW: 'zm',
  ZWL: 'zw',
  BWP: 'bw',
  NAD: 'na',
  SZL: 'sz',
  LSL: 'ls',
  MUR: 'mu',
  SCR: 'sc',
  MWK: 'mw',
  MZN: 'mz',
  AOA: 'ao',
  FJD: 'fj',
  PGK: 'pg',
  SBD: 'sb',
  TON: 'to',
  VUV: 'vu',
  WST: 'ws',
  // Multi-country currencies
  XAF: 'cm', // Central African CFA Franc (Cameroon)
  XOF: 'sn', // West African CFA Franc (Senegal)
  XPF: 'pf', // CFP Franc (French Polynesia)
  XCD: 'ag', // East Caribbean Dollar (Antigua)
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const countryCode = currencyToCountry[currencyCode]
  
  // Use flag-icons library for consistent display across all platforms including Windows
  if (countryCode) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <span className={`fi fi-${countryCode} text-lg`} style={{ lineHeight: 1 }} />
      </span>
    )
  }
  
  // Fallback to emoji flag if available (for currencies not in flag-icons)
  const emojiFlag = getCurrencyFlag(currencyCode)
  if (emojiFlag !== currencyCode) {
    return <span className={className}>{emojiFlag}</span>
  }
  
  // Final fallback to styled currency code
  return (
    <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded ${className}`}>
      {currencyCode}
    </span>
  )
}