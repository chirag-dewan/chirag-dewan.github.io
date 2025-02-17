/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",              // Primary on non-Apple devices
          "-apple-system",      // SF Pro on Apple devices
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        serif: ['"EB Garamond"', "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'binary-rain': 'binaryFall 5s linear infinite',
        'skill-shine': 'skill-shine 3s linear infinite',
        'text-glitch': 'text-glitch 0.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            textShadow: '0 0 5px rgba(59, 130, 246, 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)',
            textShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
          },
        },
        binaryFall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(12px)',
      },
    },
  },
  plugins: [],
}
