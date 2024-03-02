/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#F2F5F9',
        backgound: '#111729',
        primary: '#3662E3',
        secondary: '#4e80ee33',
        diamond1: '#111729',
        diamond2: '#364153'
      }
    }
  },
  plugins: []
}
