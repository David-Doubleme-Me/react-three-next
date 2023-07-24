module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens:{ 
      '3xl': '1792px',
      '4xl': '2048px',
      '5xl': '2304px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
