import { TFunction } from 'next-i18next'

export function localizeProviderName(providerId: string, providerName: string, t: TFunction): string {
  // Try to get localized name from translations
  const translationKey = `providers.names.${providerId}`
  const translated = t(translationKey, { returnObjects: false, defaultValue: '' })
  
  // If translation exists and is not the key itself, return it
  if (translated && translated !== translationKey) {
    return translated as string
  }
  
  // Otherwise, return the original name
  return providerName
}

export function localizeProviderDescription(providerId: string, description: string, t: TFunction): string {
  const translationKey = `providers.descriptions.${providerId}`
  const translated = t(translationKey, { returnObjects: false, defaultValue: '' })
  
  if (translated && translated !== translationKey) {
    return translated as string
  }
  
  return description
}

export function localizeProviderSource(providerId: string, source: string, t: TFunction): string {
  const translationKey = `providers.sources.${providerId}`
  const translated = t(translationKey, { returnObjects: false, defaultValue: '' })
  
  if (translated && translated !== translationKey) {
    return translated as string
  }
  
  return source
}

export function localizeProviderFeatures(providerId: string, features: string, t: TFunction): string {
  const translationKey = `providers.features.${providerId}`
  const translated = t(translationKey, { returnObjects: false, defaultValue: '' })
  
  if (translated && translated !== translationKey) {
    return translated as string
  }
  
  return features
}

export function localizeUpdateFrequency(frequency: string, t: TFunction): string {
  // Map provider update frequencies to translation keys
  const frequencyMap: Record<string, string> = {
    'Real-time': 'providers.updateFrequencies.realTime',
    'Every minute': 'providers.updateFrequencies.everyMinute',
    'Every 10 minutes': 'providers.updateFrequencies.every10Minutes',
    'Every 60 seconds': 'providers.updateFrequencies.every60Seconds',
    'Hourly': 'providers.updateFrequencies.hourly',
    'Daily': 'providers.updateFrequencies.daily',
  }

  // Check for exact match
  if (frequencyMap[frequency]) {
    return t(frequencyMap[frequency])
  }

  // Check for "Daily at" pattern
  const dailyAtMatch = frequency.match(/Daily at (.+)/)
  if (dailyAtMatch) {
    return t('providers.updateFrequencies.dailyAt', { time: dailyAtMatch[1] })
  }

  // Return original if no translation found
  return frequency
}

export function localizeCurrencyName(currencyCode: string, t: TFunction): string {
  // Try to get localized name from translations
  const translationKey = `currencies.${currencyCode}`
  const translated = t(translationKey, { returnObjects: false, defaultValue: '' })
  
  // If translation exists and is not the key itself, return it
  if (translated && translated !== translationKey) {
    return translated as string
  }
  
  // Otherwise, return the original name from the currency data
  return ''
}