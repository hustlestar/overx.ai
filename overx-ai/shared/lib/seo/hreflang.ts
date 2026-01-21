import { AlternateLanguage } from '../../components/SEO/types'

/**
 * Normalize domain by removing protocol if present
 */
function normalizeDomain(domain: string): string {
  return domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * Normalize basePath to ensure it starts with / and has no trailing /
 */
function normalizeBasePath(basePath: string): string {
  let normalized = basePath.trim()

  // Handle empty or root path
  if (!normalized || normalized === '/') {
    return ''
  }

  // Ensure starts with /
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized
  }

  // Remove trailing slash
  if (normalized.endsWith('/') && normalized.length > 1) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

export function generateHrefLangAlternates(
  basePath: string,
  domain: string,
  locales: string[] = ['en', 'es', 'ru']
): AlternateLanguage[] {
  const normalizedDomain = normalizeDomain(domain)
  const normalizedPath = normalizeBasePath(basePath)

  return [
    ...locales.map(locale => ({
      hrefLang: locale,
      href: `https://${normalizedDomain}${locale === 'en' ? normalizedPath : `/${locale}${normalizedPath}`}`
    })),
    { hrefLang: 'x-default', href: `https://${normalizedDomain}${normalizedPath}` }
  ]
}
