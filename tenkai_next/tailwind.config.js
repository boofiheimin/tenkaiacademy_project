module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: {
        greedy: [/safe$/],
      }
    }
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'kanata-gold': '#D6C37F',
        'kanata-grey': '#b4b1c2',
        'kanata-blue': '#1E62EB',
        'kanata-pink': '#FEABBD'
      },
      fontFamily: {
        serif: ["Rubik", "sans-serif"]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
