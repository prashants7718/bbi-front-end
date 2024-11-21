/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: '#ffc3e1',
        primaryBlue: '#004c80',
        secondaryPink: '#f88da7',
        lightPink: '#ffc4e0',
        grayBackground: '#f8f9fb',
      }
    },
  },
  plugins: [],
}