const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      'cookie': ['Cookie', 'Helvetica', 'Arial', 'sans-serif'],
    },
    // fontSize: {
    //   'xs': '1rem',
    //   'sm': '1.25rem',
    //   'base': '1.5rem',
    //   'lg': '1.75rem',
    //   'xl': '2rem',
    //   '2xl': '2.25rem',
    //   '3xl': '2.5rem',
    // },
    extend: {
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      animation: {
        menu: 'jump 500ms ease'
      }
    }
  },
  plugins: [],
}