/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      colors: {
        netflix: {
          red: '#E50914',      
          dark: '#141414',    
          light: '#232323',   
          gray: '#808080',     
        }
      },
    }
 },
  plugins: [],
}

