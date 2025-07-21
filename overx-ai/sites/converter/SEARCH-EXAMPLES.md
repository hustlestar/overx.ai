# Multi-Language Currency Search Examples

The ProviderComparisonTable now supports searching for currencies using:
- Currency codes (USD, EUR, GBP, etc.)
- Country names in English
- Country names in Spanish
- Country names in Russian

## Search Examples

### English
- "United States" → USD
- "America" → USD
- "United Kingdom" → GBP
- "Japan" → JPY
- "Dollar" → USD, CAD, AUD, NZD, HKD, SGD (all dollar currencies)

### Spanish
- "Estados Unidos" → USD
- "Reino Unido" → GBP
- "Japón" → JPY
- "México" → MXN
- "España" or "Europa" → EUR

### Russian
- "США" → USD
- "Великобритания" → GBP
- "Япония" → JPY
- "Россия" → RUB
- "Китай" → CNY

## Implementation Details

1. The search is case-insensitive
2. Partial matches work (e.g., "uni" matches "United States")
3. Section headers are automatically hidden when no currencies match in that section
4. The search uses the current locale from i18n but searches across all languages
5. Currency codes always work regardless of language setting