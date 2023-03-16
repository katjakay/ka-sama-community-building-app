/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,png,jpg}',
  ],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      yellow: '#C5C32B',
      brown: '#A24300',
      blue: '#2F5FFF',
      white: '#FFFFFF',
      beige: '#BEB3B5',
      purple: '#BEB3B5',
    },
    extend: {},
    fontFamily: {
      sans: ['Supply', 'sans-serif'],
      mono: ['Cinetype', 'sans-serif'],
    },
  },
  plugins: [require('daisyui')],
};
