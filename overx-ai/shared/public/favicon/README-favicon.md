# Favicon Generation Guide for OverX

## Brand Concept
OverX represents "Over the Xorizon" - a play on "horizon" with X replacing H, symbolizing going beyond boundaries.

## Current Favicon Design
The favicon uses:
- A cyan/teal background circle (#0891b2) representing trust and technology
- A white "X" symbol that forms the center of attention
- A subtle horizon line across the middle, representing the "Xorizon" concept
- Clean, modern design that scales well

## SVG Source
The main favicon is in SVG format at `/public/favicon.svg`

## Required PNG Sizes
To complete the favicon setup, generate PNG versions from the SVG:

1. **favicon-16x16.png** - Browser tabs
2. **favicon-32x32.png** - Browser tabs (high DPI)
3. **apple-touch-icon.png** - 180x180px for iOS devices
4. **favicon-192x192.png** - Android Chrome
5. **favicon-512x512.png** - PWA splash screens

## Generation Commands
Using ImageMagick or similar tools:

```bash
# Generate PNG versions from SVG
convert -background transparent favicon.svg -resize 16x16 favicon-16x16.png
convert -background transparent favicon.svg -resize 32x32 favicon-32x32.png
convert -background transparent favicon.svg -resize 180x180 apple-touch-icon.png
convert -background transparent favicon.svg -resize 192x192 favicon-192x192.png
convert -background transparent favicon.svg -resize 512x512 favicon-512x512.png

# Generate ICO file (contains multiple sizes)
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

## Alternative: Online Tools
- [RealFaviconGenerator.net](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)
- Upload the SVG and download all required formats

## Color Palette
- Primary: #0891b2 (cyan-600)
- Secondary: #06b6d4 (cyan-500)
- Background: #000000
- Foreground: #FFFFFF