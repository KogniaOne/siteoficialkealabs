/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kea: {
          'deep-blue': '#0A2540',
          'emerald': '#10B981',
          'cyan': '#00B4D8',
          'alert-orange': '#FF6B00',
          'slate': '#64748B',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
