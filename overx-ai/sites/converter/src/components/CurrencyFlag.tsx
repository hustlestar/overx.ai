import { FlagImage } from '@overx-ai/shared'
import { getCurrencyFlag } from '../utils/currencyFlags'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const flag = getCurrencyFlag(currencyCode)
  
  if (!flag) return null
  
  return (
    <span className={`inline-block ${className}`}>
      <FlagImage 
        emoji={flag}
        alt={`${currencyCode} flag`}
        size={20}
        className="align-text-bottom"
      />
    </span>
  )
}