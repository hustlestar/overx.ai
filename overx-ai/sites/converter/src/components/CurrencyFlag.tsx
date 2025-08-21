import { getCurrencyFlag } from '../utils/currencyFlags'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  // Simply use the emoji flags from our existing currencyFlags utility
  const flag = getCurrencyFlag(currencyCode)
  
  // Return the flag emoji directly
  return <span className={className}>{flag}</span>
}