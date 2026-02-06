/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      colors: {
        cineverse: {
          cyan: '#8FEFFF',
          aqua: '#6FD3FF',
          main: '#5FB3FF',
          deep: '#4A6BFF',
          dark: '#000000',
          light: '#232323',
          gray: '#808080',
        }
      },
      backgroundImage: {
        'cineverse-gradient': 'linear-gradient(135deg, #8FEFFF 0%, #5FB3FF 50%, #4A6BFF 100%)',
        'cineverse-gradient-2': 'linear-gradient(135deg, #7ce8fcff 0%, #3067ffff 50%, #621edfff 100%)',
      },
      screens: {
        'nav-lg': '1350px',
      }
    }
  },
  plugins: [],
}

