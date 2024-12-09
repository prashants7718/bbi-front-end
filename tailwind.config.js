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
        blueBackground: '#004c80',
        secondaryPink: '#f88da7',
        lightPink: '#ffc4e0',
        grayBackground: '#f5f8fa',
        blueBorder: '#1a5e8d',
        textBlue: '#004c80',
        textBlack: '#3A3A3A',
        textGray: '#5a5a5a',
        darkGrayBackground: '#e5e5e5'
      },
      boxShadow: {
        bbiHeaderShadow: '6px 0px 13px #ccdbe6',
        bbiCardShadow: '0px 0px 13px #ccdbe6',
      },
    },
  },
  plugins: [],
}