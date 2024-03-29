/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,png,jpg}',
    './node_modules/flowbite/**/*.js',
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
      lightBrown: '#EFECE4',
    },
    extend: {},
    fontFamily: {
      // sans: ['Supply', 'sans-serif'],
      sans: ['IBM Plex Mono', 'monospace'],
    },
  },
  plugins: [require('daisyui', 'flowbite/plugin')],
};
