/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00837E',
        secondary: '#FF6C36',
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
}
