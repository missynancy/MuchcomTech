/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbff',
          100: '#d5f5ff',
          200: '#b3efff',
          300: '#7be3ff',
          400: '#38cdff',
          500: '#00f2fe',
          600: '#00b7d4',
          700: '#008ba4',
          800: '#076f84',
          900: '#0b5b6d',
          950: '#033748',
        },
        dark: {
          base: '#0B0F17',
          surface: '#131929',
          card: '#1A2333',
          border: '#233044',
          hover: '#253248',
        },
        neon: {
          cyan: '#00f2fe',
          purple: '#9333ea',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(29, 78, 216, 0.35)',
        'glow-red': '0 0 25px -5px rgba(220, 38, 38, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
