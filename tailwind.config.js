/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'borderShadow': '0 15px 20px -3px rgb(0 0 0 / 0.1), 0 10px 16px -4px rgb(53, 53, 53)',
        'borderShadow-hover': '0 30px 40px -3px rgb(0 0 0 / 0.1), 0 20px 32px -4px rgb(94, 94, 94)'
      },
      screens: {
        'phone' : '375px',
        'sm-phone' : '150px'
      }
    },
  },
  plugins: [],
}

