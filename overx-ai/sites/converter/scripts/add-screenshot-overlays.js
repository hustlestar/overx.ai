const fs = require('fs')
const path = require('path')
const { createCanvas, loadImage, registerFont } = require('canvas')

// Screenshot configurations with overlay text
const screenshotConfigs = {
  'transparent-rates-comparison.png': {
    title: 'Real-Time Rate Comparison',
    subtitle: 'See the difference across multiple providers',
    highlights: [
      { text: 'Save 2-5%', x: 50, y: 150, color: '#10B981' },
      { text: 'No hidden fees', x: 50, y: 200, color: '#3B82F6' }
    ]
  },
  'travel-converter.png': {
    title: 'Exchange Rates Pro',
    subtitle: 'Your travel companion for smart currency conversion',
    highlights: [
      { text: 'Instant conversion', x: 50, y: 150, color: '#3B82F6' },
      { text: 'Offline mode available', x: 50, y: 200, color: '#10B981' }
    ]
  },
  'api-comparison.png': {
    title: 'API Performance Dashboard',
    subtitle: 'Choose the best API for your needs',
    highlights: [
      { text: '99.9% uptime', x: 50, y: 150, color: '#10B981' },
      { text: '<100ms response', x: 50, y: 200, color: '#3B82F6' }
    ]
  },
  'currency-alerts.png': {
    title: 'Smart Currency Alerts',
    subtitle: 'Never miss the perfect exchange rate',
    highlights: [
      { text: 'Real-time notifications', x: 50, y: 150, color: '#3B82F6' },
      { text: 'Custom thresholds', x: 50, y: 200, color: '#10B981' }
    ]
  },
  'crypto-vs-forex.png': {
    title: 'Crypto vs Traditional Exchange',
    subtitle: 'Compare all your options in one place',
    highlights: [
      { text: 'Live crypto rates', x: 50, y: 150, color: '#F59E0B' },
      { text: 'Traditional forex', x: 50, y: 200, color: '#3B82F6' }
    ]
  },
  'dcc-comparison.png': {
    title: 'Avoid DCC Scams',
    subtitle: 'See the real cost of dynamic currency conversion',
    highlights: [
      { text: 'Up to 12% markup!', x: 50, y: 150, color: '#EF4444' },
      { text: 'Choose local currency', x: 50, y: 200, color: '#10B981' }
    ]
  }
}

async function addOverlayToScreenshot(inputPath, outputPath, config) {
  try {
    // Load the original image
    const image = await loadImage(inputPath)
    
    // Create canvas with same dimensions
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')
    
    // Draw the original image
    ctx.drawImage(image, 0, 0)
    
    // Add semi-transparent overlay for text background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, image.width, 250)
    
    // Add title
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 48px Arial'
    ctx.fillText(config.title, 50, 80)
    
    // Add subtitle
    ctx.fillStyle = '#E5E7EB'
    ctx.font = '24px Arial'
    ctx.fillText(config.subtitle, 50, 120)
    
    // Add highlights
    if (config.highlights) {
      config.highlights.forEach(highlight => {
        ctx.fillStyle = highlight.color
        ctx.font = 'bold 20px Arial'
        ctx.fillText(`• ${highlight.text}`, highlight.x, highlight.y)
      })
    }
    
    // Add branding
    ctx.fillStyle = '#3B82F6'
    ctx.font = 'bold 16px Arial'
    ctx.fillText('Exchange Rates Pro', image.width - 200, image.height - 30)
    
    // Save the image
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(outputPath, buffer)
    
    console.log(`✅ Added overlay to ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message)
  }
}

async function processAllScreenshots() {
  const screenshotDir = path.join(__dirname, '../public/blog/screenshots')
  const processedDir = path.join(screenshotDir, 'with-overlay')
  
  // Create processed directory if it doesn't exist
  if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir, { recursive: true })
  }
  
  // Process each screenshot
  for (const [filename, config] of Object.entries(screenshotConfigs)) {
    const inputPath = path.join(screenshotDir, filename)
    const outputPath = path.join(processedDir, filename)
    
    if (fs.existsSync(inputPath)) {
      await addOverlayToScreenshot(inputPath, outputPath, config)
    } else {
      console.log(`⚠️  Screenshot not found: ${filename}`)
    }
  }
  
  console.log('\n🎉 All screenshots processed!')
}

// Run the script
processAllScreenshots().catch(console.error)