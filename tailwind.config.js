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
        
        // Cyberpunk color palette
        'cyber-green': '#00ff00',
        'cyber-cyan': '#00ffff',
        'cyber-red': '#ff0040',
        'cyber-purple': '#8a2be2',
        'cyber-yellow': '#ffff00',
        'cyber-orange': '#ff6600',
        'cyber-pink': '#ff1493',
        'cyber-blue': '#0080ff',
        
        'matrix': {
          50: '#f0fff4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // Threat level colors
        'threat': {
          'low': '#22c55e',
          'medium': '#f59e0b', 
          'high': '#ef4444',
          'critical': '#dc2626'
        }
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
        // Cyberpunk/Hacker fonts
        terminal: [
          'Courier New',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
        cyber: [
          'Orbitron',
          'SF Mono',
          'Courier New',
          'monospace'
        ]
      },
      boxShadow: {
        'apple-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'apple': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        
        // Cyberpunk/Neon shadows
        'neon-sm': '0 0 5px currentColor',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        'neon-xl': '0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
        
        // Matrix/Hacker themed shadows
        'matrix': '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00',
        'cyber': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
        'threat': '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 40px #ff0040'
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
        
        // Cyberpunk animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix-rain': 'matrix-rain 1s linear infinite',
        'scan': 'scan 2s linear infinite',
        'glitch': 'glitch 0.5s infinite',
        'hologram': 'hologram 3s ease infinite',
        'terminal-blink': 'blink 1s infinite',
        'threat-pulse': 'threat-pulse 1.5s ease-in-out infinite',
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
        
        // Cyberpunk keyframes
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00' 
          },
          '100%': { 
            boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00' 
          }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        hologram: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        blink: {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 }
        },
        'threat-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #ff0040, 0 0 10px #ff0040',
            opacity: 1 
          },
          '50%': { 
            boxShadow: '0 0 20px #ff0040, 0 0 40px #ff0040',
            opacity: 0.8 
          }
        }
      },
      
      // Custom gradient stops for cyberpunk themes
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ffff 75%, #ff00ff 100%)',
        'gradient-matrix': 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)',
        'gradient-neon': 'linear-gradient(45deg, #ff0040 0%, #00ffff 50%, #ff0040 100%)',
        'gradient-hacker': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
      },
      
      // Typography scale for cyberpunk theme
      fontSize: {
        'cyber-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'cyber-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'cyber-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.025em' }],
        'cyber-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.025em' }],
        'cyber-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.025em' }],
        'cyber-2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.025em' }],
        'cyber-3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.025em' }],
        'cyber-4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.025em' }],
      }
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
        '.text-gradient-cyber': {
          background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
          'background-size': '200% 200%',
          'animation': 'hologram 3s ease infinite',
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
        
        // Cyberpunk utilities
        '.neon-text': {
          'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        },
        '.matrix-text': {
          'font-family': 'Courier New, monospace',
          'text-shadow': '0 0 10px #00ff00',
          'color': '#00ff00',
        },
        '.glitch-text': {
          'position': 'relative',
        },
        '.scan-line': {
          'position': 'relative',
          'overflow': 'hidden',
        },
        '.scan-line::before': {
          'content': '""',
          'position': 'absolute',
          'top': '0',
          'left': '-100%',
          'width': '100%',
          'height': '100%',
          'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          'animation': 'scan 2s infinite',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
