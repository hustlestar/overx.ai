import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface CurrencyPair {
  base: string
  target: string
}

interface UserPreferences {
  favoritePairs: CurrencyPair[]
  defaultBase: string
  defaultTargets: string[]
  showTriangulation: boolean
  showProviderRates: boolean
  isPremium: boolean
}

interface PreferencesState extends UserPreferences {
  updateDefaultBase: (base: string) => void
  updateDefaultTargets: (targets: string[]) => void
  addFavoritePair: (pair: CurrencyPair) => void
  removeFavoritePair: (pair: CurrencyPair) => void
  toggleTriangulation: () => void
  toggleProviderRates: () => void
  setPremium: (isPremium: boolean) => void
  canAddMoreCurrencies: () => boolean
}

export const useUserPreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      favoritePairs: [
        { base: 'USD', target: 'EUR' },
        { base: 'USD', target: 'GBP' },
        { base: 'EUR', target: 'GBP' },
      ],
      defaultBase: 'USD',
      defaultTargets: [],
      showTriangulation: true,
      showProviderRates: false,
      isPremium: false,

      updateDefaultBase: (base) => set({ defaultBase: base }),
      
      updateDefaultTargets: (targets) => set((state) => {
        // Limit to 5 currencies for non-premium users
        if (!state.isPremium && targets.length > 5) {
          return { defaultTargets: targets.slice(0, 5) }
        }
        return { defaultTargets: targets }
      }),
      
      addFavoritePair: (pair) =>
        set((state) => ({
          favoritePairs: [...state.favoritePairs, pair],
        })),
      
      removeFavoritePair: (pair) =>
        set((state) => ({
          favoritePairs: state.favoritePairs.filter(
            (p) => p.base !== pair.base || p.target !== pair.target
          ),
        })),
      
      toggleTriangulation: () =>
        set((state) => ({ showTriangulation: !state.showTriangulation })),
      
      toggleProviderRates: () =>
        set((state) => ({ showProviderRates: !state.showProviderRates })),
      
      setPremium: (isPremium) => set({ isPremium }),
      
      canAddMoreCurrencies: () => {
        const { isPremium, defaultTargets } = get()
        return isPremium || defaultTargets.length < 5
      },
    }),
    {
      name: 'converter-preferences',
    }
  )
)