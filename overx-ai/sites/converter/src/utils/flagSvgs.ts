// Inline SVG flags for Windows compatibility
// Using simplified flag designs to keep file size small

export const FLAG_SVGS: Record<string, string> = {
  // United States
  US: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#B22234"/>
    <path d="M0 4.6h60M0 9.2h60M0 13.8h60M0 18.4h60M0 23h60M0 27.6h60M0 32.2h60" stroke="#fff" stroke-width="3.08"/>
    <rect width="24" height="21.54" fill="#3C3B6E"/>
  </svg>`,
  
  // European Union
  EU: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#003399"/>
    <g fill="#FFCC00">
      <circle cx="30" cy="8" r="1.5"/>
      <circle cx="36.4" cy="10" r="1.5"/>
      <circle cx="39.6" cy="16" r="1.5"/>
      <circle cx="38" cy="22.5" r="1.5"/>
      <circle cx="33" cy="27" r="1.5"/>
      <circle cx="27" cy="27" r="1.5"/>
      <circle cx="22" cy="22.5" r="1.5"/>
      <circle cx="20.4" cy="16" r="1.5"/>
      <circle cx="23.6" cy="10" r="1.5"/>
    </g>
  </svg>`,
  
  // United Kingdom
  GB: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#012169"/>
    <path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/>
    <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="4.8" stroke-dasharray="0 12 4.8"/>
    <path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13.33"/>
    <path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="8"/>
  </svg>`,
  
  // Japan
  JP: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#fff"/>
    <circle cx="30" cy="20" r="12" fill="#BC002D"/>
  </svg>`,
  
  // China
  CN: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#DE2910"/>
    <g fill="#FFDE00">
      <path d="M10 8l2.5 7.5L6 11h7l-3.5 4.5z"/>
      <path d="M18 6l.9 2.7-2.3-.8 2.3-.8z" transform="rotate(18 20 10)"/>
      <path d="M22 10l.9 2.7-2.3-.8 2.3-.8z" transform="rotate(-18 20 10)"/>
      <path d="M22 16l.9 2.7-2.3-.8 2.3-.8z"/>
      <path d="M18 20l.9 2.7-2.3-.8 2.3-.8z" transform="rotate(18 20 10)"/>
    </g>
  </svg>`,
  
  // Canada
  CA: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="15" height="40" fill="#FF0000"/>
    <rect x="45" width="15" height="40" fill="#FF0000"/>
    <rect x="15" width="30" height="40" fill="#fff"/>
    <path d="M30 28l-2-2v-2l-2 1-1-3-3 2v-2l-3-1 1-2h2l1-3-1-1h3l2-2-1-2 3 1v-3h2v3l3-1-1 2 2 2h3l-1 1 1 3h2l1 2-3 1v2l-3-2-1 3-2-1v2z" fill="#FF0000"/>
  </svg>`,
  
  // Australia
  AU: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#012169"/>
    <g stroke="#fff" stroke-width="6">
      <path d="M0 0l30 20M30 0L0 20"/>
    </g>
    <g stroke="#e4002b" stroke-width="4">
      <path d="M0 0l30 20M30 0L0 20"/>
    </g>
    <g stroke="#fff" stroke-width="10">
      <path d="M15 0v20M0 10h30"/>
    </g>
    <g stroke="#e4002b" stroke-width="6">
      <path d="M15 0v20M0 10h30"/>
    </g>
    <g fill="#fff">
      <path d="M45 30l.6 1.8h1.9l-1.5 1.1.6 1.8-1.6-1.1-1.5 1.1.6-1.8-1.5-1.1h1.9z"/>
      <path d="M45 10l.4 1.2h1.3l-1 .7.4 1.2-1.1-.8-1 .8.4-1.2-1-.7h1.3z"/>
      <path d="M52 14l.4 1.2h1.3l-1 .7.4 1.2-1.1-.8-1 .8.4-1.2-1-.7h1.3z"/>
      <path d="M38 14l.4 1.2h1.3l-1 .7.4 1.2-1.1-.8-1 .8.4-1.2-1-.7h1.3z"/>
      <path d="M48 18l.4 1.2h1.3l-1 .7.4 1.2-1.1-.8-1 .8.4-1.2-1-.7h1.3z"/>
      <path d="M44 22l.3.9h.9l-.7.5.3.9-.8-.6-.7.6.3-.9-.7-.5h.9z"/>
    </g>
  </svg>`,
  
  // Switzerland
  CH: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="#DA291C"/>
    <path d="M16 8h8v8h8v8h-8v8h-8v-8H8v-8h8z" fill="#fff"/>
  </svg>`,
  
  // Russia
  RU: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#fff"/>
    <rect y="13.33" width="60" height="13.33" fill="#0039A6"/>
    <rect y="26.66" width="60" height="13.34" fill="#D52B1E"/>
  </svg>`,
  
  // India
  IN: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#FF9933"/>
    <rect y="13.33" width="60" height="13.33" fill="#fff"/>
    <rect y="26.66" width="60" height="13.34" fill="#138808"/>
    <circle cx="30" cy="20" r="5" fill="#000080"/>
    <circle cx="30" cy="20" r="4.5" fill="#fff"/>
    <circle cx="30" cy="20" r="1" fill="#000080"/>
  </svg>`,
  
  // Brazil
  BR: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#009739"/>
    <path d="M30 4L52 20L30 36L8 20z" fill="#FEDD00"/>
    <circle cx="30" cy="20" r="9" fill="#012169"/>
    <path d="M23 19c3-1 9-2 14 2" fill="none" stroke="#fff" stroke-width="0.5"/>
  </svg>`,
  
  // South Korea
  KR: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#fff"/>
    <circle cx="30" cy="20" r="12" fill="#C60C30"/>
    <path d="M30 8a12 12 0 010 24 6 6 0 000-12 6 6 0 010-12" fill="#003478"/>
    <g fill="#000">
      <rect x="40" y="6" width="2" height="8" transform="rotate(-33.69 41 10)"/>
      <rect x="43" y="6" width="2" height="8" transform="rotate(-33.69 44 10)"/>
      <rect x="46" y="6" width="2" height="8" transform="rotate(-33.69 47 10)"/>
      <rect x="12" y="26" width="2" height="8" transform="rotate(-33.69 13 30)"/>
      <rect x="15" y="26" width="2" height="8" transform="rotate(-33.69 16 30)"/>
      <rect x="18" y="26" width="2" height="8" transform="rotate(-33.69 19 30)"/>
    </g>
  </svg>`,
  
  // Mexico
  MX: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="40" fill="#006341"/>
    <rect x="20" width="20" height="40" fill="#fff"/>
    <rect x="40" width="20" height="40" fill="#C8102E"/>
    <g transform="translate(30 20)">
      <circle r="4" fill="#6F4E37"/>
      <path d="M-2 0a2 2 0 014 0" fill="#393"/>
    </g>
  </svg>`,
  
  // Turkey
  TR: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#E30A17"/>
    <circle cx="20" cy="20" r="8" fill="#fff"/>
    <circle cx="22.5" cy="20" r="6.4" fill="#E30A17"/>
    <path d="M29 17l2.5 2 1-3.2 1 3.2 2.5-2-.9 3.1h3.3l-2.7 1.9 1 3.2-2.5-2.3-2.5 2.3 1-3.2-2.7-1.9h3.3z" fill="#fff"/>
  </svg>`,
  
  // South Africa
  ZA: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#DE3831"/>
    <rect y="13.33" width="60" height="13.34" fill="#fff"/>
    <rect y="16" width="60" height="8" fill="#007A4D"/>
    <path d="M0 0v40l20-20z" fill="#000"/>
    <path d="M0 0v40l20-20z" fill="#FFB612" stroke="#fff" stroke-width="3.33"/>
    <path d="M0 4v32l16-16z" fill="#000"/>
    <path d="M0 7v26l13-13z" fill="#007A4D"/>
  </svg>`,
  
  // Singapore
  SG: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#EE2536"/>
    <rect y="20" width="60" height="20" fill="#fff"/>
    <circle cx="15" cy="10" r="6" fill="#fff"/>
    <circle cx="17" cy="10" r="5" fill="#EE2536"/>
    <g fill="#fff">
      <path d="M14 7l.4 1.2h1.2l-1 .7.4 1.2-1-.8-1 .8.4-1.2-1-.7h1.2zM18.5 5.5l.4 1.2h1.2l-1 .7.4 1.2-1-.8-1 .8.4-1.2-1-.7h1.2zM20.5 10l.4 1.2h1.2l-1 .7.4 1.2-1-.8-1 .8.4-1.2-1-.7h1.2zM18.5 14.5l.4 1.2h1.2l-1 .7.4 1.2-1-.8-1 .8.4-1.2-1-.7h1.2zM14 13l.4 1.2h1.2l-1 .7.4 1.2-1-.8-1 .8.4-1.2-1-.7h1.2z"/>
    </g>
  </svg>`,
  
  // Sweden
  SE: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#006AA7"/>
    <path d="M0 16h60v8H0zM18 0v40h8V0z" fill="#FECC00"/>
  </svg>`,
  
  // Norway
  NO: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#BA0C2F"/>
    <path d="M0 16h60v8H0zM16 0v40h8V0z" fill="#fff"/>
    <path d="M0 18h60v4H0zM18 0v40h4V0z" fill="#00205B"/>
  </svg>`,
  
  // Denmark
  DK: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#C8102E"/>
    <path d="M0 16h60v8H0zM16 0v40h8V0z" fill="#fff"/>
  </svg>`,
  
  // Poland
  PL: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#DC143C"/>
  </svg>`,
  
  // Czech Republic
  CZ: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#D7141A"/>
    <path d="M0 0v40l30-20z" fill="#11457E"/>
  </svg>`,
  
  // Israel
  IL: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#fff"/>
    <rect y="5" width="60" height="5" fill="#0038b8"/>
    <rect y="30" width="60" height="5" fill="#0038b8"/>
    <path d="M30 12l6 10h-12zM30 28l-6-10h12z" fill="none" stroke="#0038b8" stroke-width="2"/>
  </svg>`,
  
  // United Arab Emirates
  AE: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#00732F"/>
    <rect y="13.33" width="60" height="13.33" fill="#fff"/>
    <rect y="26.66" width="60" height="13.34" fill="#000"/>
    <rect width="15" height="40" fill="#FF0000"/>
  </svg>`,
  
  // Saudi Arabia
  SA: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#006C35"/>
    <g fill="#fff">
      <path d="M15 15c0-3 2-5 5-5h5v3h-3v7h8v-7h-3v-3h5c3 0 5 2 5 5v10H15z"/>
      <path d="M20 25l2-2v-3h4v3l2 2v3h-8z"/>
    </g>
  </svg>`,
  
  // Thailand
  TH: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#A51931"/>
    <rect y="6.67" width="60" height="26.66" fill="#F4F5F8"/>
    <rect y="13.33" width="60" height="13.34" fill="#2D2A4A"/>
  </svg>`,
  
  // Indonesia
  ID: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#FF0000"/>
    <rect y="20" width="60" height="20" fill="#fff"/>
  </svg>`,
  
  // Malaysia
  MY: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <g fill="#DC241F">
      <rect width="60" height="2.86"/>
      <rect y="5.71" width="60" height="2.86"/>
      <rect y="11.43" width="60" height="2.86"/>
      <rect y="17.14" width="60" height="2.86"/>
      <rect y="22.86" width="60" height="2.86"/>
      <rect y="28.57" width="60" height="2.86"/>
      <rect y="34.29" width="60" height="2.86"/>
    </g>
    <rect width="30" height="22.86" fill="#010066"/>
    <circle cx="15" cy="11.43" r="5" fill="#FFDE00"/>
    <circle cx="17" cy="11.43" r="4.5" fill="#010066"/>
    <path d="M17 7l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="#FFDE00"/>
  </svg>`,
  
  // Philippines
  PH: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#0038A8"/>
    <rect y="20" width="60" height="20" fill="#CE1126"/>
    <path d="M0 0v40l30-20z" fill="#fff"/>
    <circle cx="10" cy="20" r="5" fill="#FCD116"/>
    <g fill="#FCD116">
      <path d="M10 17l.5 1.5h1.5l-1.2 1 .5 1.5-1.3-1-1.2 1 .5-1.5-1.3-1h1.5z"/>
      <circle cx="5" cy="15" r="0.5"/>
      <circle cx="15" cy="15" r="0.5"/>
      <circle cx="10" cy="27" r="0.5"/>
    </g>
  </svg>`,
  
  // Hong Kong
  HK: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#DE2408"/>
    <g fill="#fff" transform="translate(30 20)">
      <path d="M0-8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"/>
      <g transform="rotate(72)">
        <path d="M0-8c0 1-1 2-1 3s1 1 1 1 1 0 1-1-1-2-1-3"/>
        <circle cy="-6" r="0.7"/>
      </g>
      <g transform="rotate(144)">
        <path d="M0-8c0 1-1 2-1 3s1 1 1 1 1 0 1-1-1-2-1-3"/>
        <circle cy="-6" r="0.7"/>
      </g>
      <g transform="rotate(216)">
        <path d="M0-8c0 1-1 2-1 3s1 1 1 1 1 0 1-1-1-2-1-3"/>
        <circle cy="-6" r="0.7"/>
      </g>
      <g transform="rotate(288)">
        <path d="M0-8c0 1-1 2-1 3s1 1 1 1 1 0 1-1-1-2-1-3"/>
        <circle cy="-6" r="0.7"/>
      </g>
    </g>
  </svg>`,
  
  // New Zealand
  NZ: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#012169"/>
    <g stroke="#fff" stroke-width="6">
      <path d="M0 0l30 20M30 0L0 20"/>
    </g>
    <g stroke="#C8102E" stroke-width="4">
      <path d="M0 0l30 20M30 0L0 20"/>
    </g>
    <g stroke="#fff" stroke-width="10">
      <path d="M15 0v20M0 10h30"/>
    </g>
    <g stroke="#C8102E" stroke-width="6">
      <path d="M15 0v20M0 10h30"/>
    </g>
    <g fill="#C8102E" stroke="#fff" stroke-width="0.5">
      <path d="M45 10l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"/>
      <path d="M50 20l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"/>
      <path d="M40 20l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"/>
      <path d="M45 28l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z"/>
    </g>
  </svg>`,
  
  // Egypt
  EG: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#CE1126"/>
    <rect y="13.33" width="60" height="13.33" fill="#fff"/>
    <rect y="26.66" width="60" height="13.34" fill="#000"/>
    <g fill="#C09300" transform="translate(30 20)">
      <circle r="5" fill="none" stroke="#C09300" stroke-width="0.5"/>
      <path d="M-4 2h8M-3-2h1.5L0 0l1.5-2H3"/>
    </g>
  </svg>`,
  
  // Argentina
  AR: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="13.33" fill="#74ACDF"/>
    <rect y="13.33" width="60" height="13.33" fill="#fff"/>
    <rect y="26.66" width="60" height="13.34" fill="#74ACDF"/>
    <circle cx="30" cy="20" r="5" fill="#FFD700" stroke="#8B6914" stroke-width="0.5"/>
  </svg>`,
  
  // Chile
  CL: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#fff"/>
    <rect y="20" width="60" height="20" fill="#D52B1E"/>
    <rect width="20" height="20" fill="#0039A6"/>
    <path d="M10 10l1.5 4.5h4.7l-3.8 2.8 1.5 4.5-3.9-2.8-3.8 2.8 1.5-4.5-3.9-2.8h4.7z" fill="#fff"/>
  </svg>`,
  
  // Ukraine
  UA: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="20" fill="#005BBB"/>
    <rect y="20" width="60" height="20" fill="#FFD500"/>
  </svg>`,
  
  // Pakistan
  PK: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#01411C"/>
    <rect width="15" height="40" fill="#fff"/>
    <g fill="#fff" transform="translate(37.5 20)">
      <circle r="7" fill="none" stroke="#fff" stroke-width="1.5"/>
      <circle cx="2" r="5.5" fill="#01411C"/>
      <path d="M5 -2l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" transform="rotate(-20)"/>
    </g>
  </svg>`,
}

// Function to get flag SVG as data URL
export function getFlagDataUrl(countryCode: string): string | null {
  const svg = FLAG_SVGS[countryCode]
  if (!svg) return null
  
  // Convert SVG to data URL
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml,${encoded}`
}