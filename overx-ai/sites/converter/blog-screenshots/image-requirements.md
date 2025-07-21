# Image Requirements for Blog Posts

## Required Images

### 1. Hero Images (1200x630px - Social Media Optimized)

#### `transparent-rates-hero.png`
- **Dimensions**: 1200x630px
- **Style**: Professional business theme
- **Elements**: 
  - Currency symbols (USD, EUR, GBP, JPY) in background
  - Glass morphism effects
  - Blue-cyan gradient overlay
  - Text overlay: "Transparent Exchange Rates"
- **Usage**: Article 1 hero image and social media sharing

#### `travel-savings-hero.png`
- **Dimensions**: 1200x630px
- **Style**: Travel theme with tech elements
- **Elements**:
  - Airplane/luggage icons
  - Chrome extension interface mockup
  - Pink-purple gradient overlay
  - Text overlay: "Save Money While Traveling"
- **Usage**: Article 2 hero image and social media sharing

#### `api-comparison-hero.png`
- **Dimensions**: 1200x630px
- **Style**: Technical/developer theme
- **Elements**:
  - Code snippets in background
  - API provider logos (if legally permissible)
  - Green-blue gradient overlay
  - Text overlay: "API Comparison Guide"
- **Usage**: Article 3 hero image and social media sharing

### 2. Chrome Extension Screenshots (800x500px)

#### `chrome-extension-popup.png`
- **Dimensions**: 800x500px
- **Content**: Chrome extension popup interface showing:
  - Currency converter with USD to EUR conversion
  - Real-time rate display: "1 USD = 0.9234 EUR"
  - "Updated 2 seconds ago" timestamp
  - Clean, modern UI with dark theme
  - OverX AI branding

#### `chrome-extension-website-overlay.png`
- **Dimensions**: 800x500px
- **Content**: Extension overlay on a shopping website showing:
  - Price in multiple currencies
  - Conversion tooltip
  - "Best rate available" indicator

### 3. Feature Demonstration Images (600x400px)

#### `real-time-rates-demo.png`
- **Dimensions**: 600x400px
- **Content**: Dashboard showing live rate updates
- **Elements**: Multiple currency pairs with timestamps

#### `triangulation-explanation.png`
- **Dimensions**: 600x400px
- **Content**: Visual diagram showing:
  - Currency A → Currency B → Currency C
  - Rate calculations and comparisons
  - "Why triangulation gives better rates" explanation

#### `rate-transparency-comparison.png`
- **Dimensions**: 600x400px
- **Content**: Side-by-side comparison:
  - Traditional bank rates (with hidden fees)
  - Our transparent rates (all fees visible)

### 4. API Integration Screenshots (800x600px)

#### `api-dashboard.png`
- **Dimensions**: 800x600px
- **Content**: Developer dashboard showing:
  - API key management
  - Usage statistics
  - Rate limit indicators
  - Example API responses

#### `code-integration-example.png`
- **Dimensions**: 800x600px
- **Content**: Code editor with:
  - JavaScript integration example
  - API response structure
  - Error handling examples

## Design Guidelines

### Color Palette
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #06b6d4 (Cyan)
- **Accent**: #9333ea (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Yellow)
- **Background**: #000000 (Black)
- **Text**: #ffffff (White)

### Typography
- **Headings**: Inter, system-ui, sans-serif
- **Body**: Inter, system-ui, sans-serif
- **Code**: 'Courier New', monospace

### Visual Style
1. **Glass Morphism**: Use backdrop-blur and semi-transparent backgrounds
2. **Gradients**: Smooth color transitions, no harsh stops
3. **Shadows**: Subtle, colored shadows (not just gray)
4. **Rounded Corners**: 8-12px border radius for consistency
5. **Dark Theme**: Default to dark backgrounds with light text

### Technical Specifications
- **Format**: PNG with transparency support
- **Quality**: High resolution for retina displays
- **Compression**: Optimize for web (target <200KB per image)
- **Alt Text**: Descriptive alternative text for accessibility

## File Organization
```
/public/images/blog/
├── heroes/
│   ├── transparent-rates-hero.png
│   ├── travel-savings-hero.png
│   └── api-comparison-hero.png
├── screenshots/
│   ├── chrome-extension-popup.png
│   ├── chrome-extension-website-overlay.png
│   ├── api-dashboard.png
│   └── code-integration-example.png
└── features/
    ├── real-time-rates-demo.png
    ├── triangulation-explanation.png
    └── rate-transparency-comparison.png
```

## SEO Optimization
- Include target keywords in alt text
- Use descriptive filenames
- Compress images without quality loss
- Provide multiple sizes for responsive design
- Include structured data for images

## Accessibility Requirements
- Alt text for all images
- High contrast ratios (4.5:1 minimum)
- Text should be readable at 200% zoom
- Important information should not rely solely on color

## Content Guidelines for Screenshots

### Do Include:
- Real-looking data and interface elements
- Professional, clean design
- Consistent branding
- Clear call-to-action buttons
- Realistic exchange rates

### Don't Include:
- Placeholder text (Lorem ipsum)
- Broken or incomplete interfaces
- Copyrighted content without permission
- Misleading information
- Personal or sensitive data

## Tools Recommended
- **Design**: Figma, Adobe XD, or Sketch
- **Screenshots**: CleanShot X, Lightshot
- **Optimization**: TinyPNG, ImageOptim
- **Mockups**: Browser dev tools for realistic screenshots