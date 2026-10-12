/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0D12',
          deep: '#06070A',
          surface: '#11151E',
        },
        graphite: {
          DEFAULT: '#151A24',
          light: '#1E2433',
          border: '#242D3F',
          muted: '#181E2B',
        },
        electric: {
          lime: '#C6FF4D',
          'lime-dim': '#9ECC3E',
        },
        ice: {
          blue: '#83BFFF',
          'blue-dim': '#639FDF',
        },
        text: {
          soft: '#F1F3F5',
          muted: '#9199A8',
          subtle: '#646D7E',
        },
        accent: {
          amber: '#F59E0B',
          'amber-warm': '#D97706',
          teal: '#14B8A6',
          'teal-soft': '#2DD4BF',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(198, 255, 77, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(131, 191, 255, 0.25)',
        'card': '0 4px 24px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(198, 255, 77, 0.2)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'radial-vignette': 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(11, 13, 18, 0.8) 100%)',
      }
    },
  },
  plugins: [],
}
