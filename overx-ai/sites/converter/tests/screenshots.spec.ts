import { test, expect } from '@playwright/test'

// Configure Playwright to use real API
test.use({
  baseURL: process.env.USE_PRODUCTION ? 'https://converter.overx.ai' : 'http://localhost:3003',
})

// Screenshot generation for blog posts
const blogScreenshots = [
  {
    slug: 'why-transparent-exchange-rates-matter-international-business',
    title: 'Transparent Exchange Rates Dashboard',
    description: 'Compare rates from multiple sources in real-time',
    steps: async (page) => {
      // Navigate to converter page
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Enter conversion amount
      await page.fill('input[placeholder*="amount"]', '10000')
      
      // Select currencies
      await page.selectOption('select[name="from"]', 'USD')
      await page.selectOption('select[name="to"]', 'EUR')
      
      // Wait for rates to load
      await page.waitForSelector('.rate-comparison-table', { timeout: 10000 })
      
      // Take screenshot of rate comparison
      await page.screenshot({
        path: 'public/blog/screenshots/transparent-rates-comparison.png',
        clip: {
          x: 0,
          y: 100,
          width: 1200,
          height: 600
        }
      })
    }
  },
  {
    slug: 'save-money-traveling-currency-converter-chrome-extension',
    title: 'Exchange Rates Pro Chrome Extension',
    description: 'Convert currencies instantly while browsing',
    steps: async (page) => {
      // Navigate to converter page
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Show travel scenario
      await page.fill('input[placeholder*="amount"]', '500')
      await page.selectOption('select[name="from"]', 'USD')
      await page.selectOption('select[name="to"]', 'JPY')
      
      // Take screenshot of converter
      await page.screenshot({
        path: 'public/blog/screenshots/travel-converter.png',
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 800
        }
      })
    }
  },
  {
    slug: 'compare-currency-exchange-apis-2024-complete-guide',
    title: 'API Comparison Dashboard',
    description: 'Real-time API response times and accuracy',
    steps: async (page) => {
      // Navigate to API comparison page
      await page.goto('/apis')
      await page.waitForLoadState('networkidle')
      
      // Wait for API data to load
      await page.waitForSelector('.api-comparison-table', { timeout: 10000 })
      
      // Take screenshot
      await page.screenshot({
        path: 'public/blog/screenshots/api-comparison.png',
        fullPage: false,
        clip: {
          x: 0,
          y: 100,
          width: 1200,
          height: 700
        }
      })
    }
  },
  {
    slug: 'real-time-currency-alerts-maximize-exchange-rates',
    title: 'Currency Alert Settings',
    description: 'Set up alerts for your target exchange rates',
    steps: async (page) => {
      // Navigate to settings/alerts
      await page.goto('/settings')
      await page.waitForLoadState('networkidle')
      
      // Simulate alert setup
      await page.click('text=Add Alert')
      await page.selectOption('select[name="fromCurrency"]', 'EUR')
      await page.selectOption('select[name="toCurrency"]', 'USD')
      await page.fill('input[name="targetRate"]', '1.10')
      
      // Take screenshot
      await page.screenshot({
        path: 'public/blog/screenshots/currency-alerts.png',
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 700
        }
      })
    }
  },
  {
    slug: 'cryptocurrency-vs-traditional-currency-exchange-2024',
    title: 'Crypto vs Traditional Exchange',
    description: 'Compare crypto and forex rates side by side',
    steps: async (page) => {
      // Navigate to converter
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Show crypto conversion
      await page.fill('input[placeholder*="amount"]', '1')
      await page.selectOption('select[name="from"]', 'BTC')
      await page.selectOption('select[name="to"]', 'USD')
      
      // Wait for rates
      await page.waitForSelector('.rate-comparison-table', { timeout: 10000 })
      
      // Take screenshot
      await page.screenshot({
        path: 'public/blog/screenshots/crypto-vs-forex.png',
        fullPage: false,
        clip: {
          x: 0,
          y: 100,
          width: 1200,
          height: 600
        }
      })
    }
  },
  {
    slug: 'avoid-dynamic-currency-conversion-scams-complete-guide',
    title: 'DCC Warning Example',
    description: 'Spot the difference in exchange rates',
    steps: async (page) => {
      // Navigate to converter
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Show typical DCC scenario
      await page.fill('input[placeholder*="amount"]', '100')
      await page.selectOption('select[name="from"]', 'EUR')
      await page.selectOption('select[name="to"]', 'USD')
      
      // Wait for rates
      await page.waitForSelector('.rate-comparison-table', { timeout: 10000 })
      
      // Take screenshot showing rate differences
      await page.screenshot({
        path: 'public/blog/screenshots/dcc-comparison.png',
        fullPage: false,
        clip: {
          x: 0,
          y: 100,
          width: 1200,
          height: 600
        }
      })
    }
  }
]

test.describe('Generate Blog Screenshots', () => {
  for (const screenshot of blogScreenshots) {
    test(`Generate screenshot for: ${screenshot.slug}`, async ({ page }) => {
      await screenshot.steps(page)
    })
  }
})

// Generate homepage screenshot
test('Generate homepage hero screenshot', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  
  // Take full page screenshot
  await page.screenshot({
    path: 'public/blog/screenshots/homepage-hero.png',
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: 1200,
      height: 700
    }
  })
})

// Generate mobile screenshots
test.describe('Mobile Screenshots', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    isMobile: true,
  })

  test('Generate mobile converter screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await page.fill('input[placeholder*="amount"]', '100')
    await page.selectOption('select[name="from"]', 'USD')
    await page.selectOption('select[name="to"]', 'EUR')
    
    await page.waitForSelector('.rate-comparison-table', { timeout: 10000 })
    
    await page.screenshot({
      path: 'public/blog/screenshots/mobile-converter.png',
      fullPage: false
    })
  })
})