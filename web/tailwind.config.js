/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/app-bg.png)',
      },

      colors: {
        ignite: {
          500: '#129E57',
        },
        yellow: {
          500: '#F7DD43',
          700: '#E5CD1D',
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#202024',
          800: '#323238',
          900: '#121214',
        },
      },
    },
  },
  plugins: [],
};