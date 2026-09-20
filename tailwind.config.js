/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        twitter: {
          blue: '#1d9bf0',
          blueHover: '#1a8cd8',
          dark: '#000000',
          darkCard: '#16181c',
          darkHover: '#181818',
          borderDark: '#2f3336',
          light: '#ffffff',
          lightCard: '#f7f9f9',
          lightHover: '#eff3f4',
          borderLight: '#eff3f4',
        }
      }
    },
  },
  plugins: [],
}
