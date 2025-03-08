/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired color palette
        'apple-gray': {
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#a8a8a8',
          500: '#737373',
          600: '#525252',
          700: '#3d3d3d',
          800: '#262626',
          900: '#171717',
        },
        'apple-blue': {
          500: '#0071e3', // Apple blue
          600: '#0058b0',
        },
        'apple-red': '#ff3b30',
        'apple-green': '#34c759',
        'apple-orange': '#ff9500',
        'apple-yellow': '#ffcc00',
        'apple-purple': '#af52de',
        'apple-pink': '#ff2d55',
      },
      fontFamily: {
        sans: [
          'SF Pro Text', // Apple system font
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        display: [
          'SF Pro Display',
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'SF Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
      },
      boxShadow: {
        'apple-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'apple': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'apple-sm': '0.25rem',
        'apple': '0.5rem',
        'apple-md': '0.75rem',
        'apple-lg': '1rem',
        'apple-xl': '1.5rem',
        'apple-2xl': '2rem',
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'bounce-sm': 'bounceSm 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        bounceSm: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-blue': {
          background: 'linear-gradient(to right, #007bff, #0063cc)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'color': 'transparent',
        },
        '.backdrop-blur-apple': {
          '-webkit-backdrop-filter': 'saturate(180%) blur(20px)',
          'backdrop-filter': 'saturate(180%) blur(20px)',
        },
        '.font-smoothing-auto': {
          '-webkit-font-smoothing': 'auto',
          '-moz-osx-font-smoothing': 'auto',
        },
        '.font-smoothing-antialiased': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
