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
        'kanata-pink': '#FEABBD',
        'youtube': '#FF0000',
        'twitter': '#1DA1F2',
        "klightblue": "#a3dde5",
        "kblue" : "#2263E8",
        "kgold" : "#D5C37E",
        "kwhite" : "#F2FBFC",
        "kblack": "#32282B",
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
      fontFamily: {
        serif: ["Rubik", "sans-serif"]
      },
      screens: {
        'canhover': {'raw': '(hover: hover)'},
        'smMax': {'max': '639px'},
        'mdMax': {'max': '767px'},
        'lgMax': {'max': '1023px'}
      },
      spacing: {
        '18' : '4.5rem',
        '45': '11.25rem'
      },
      gridTemplateColumns: {
        'video' : 'repeat(auto-fit, 20rem)'
      },
      justifyContent: {
        'stretch' : 'stretch'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'),require('@tailwindcss/aspect-ratio'),],
}
