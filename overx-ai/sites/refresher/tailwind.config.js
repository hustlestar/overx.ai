const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../shared/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '.light'],
  theme: {
    extend: {
      colors: {
        'refresher-blue': '#3B82F6',
        'refresher-sky': '#0EA5E9',
        'refresher-indigo': '#6366F1',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        breathe: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.15)' } },
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', '.light &')
    }),
  ],
}
