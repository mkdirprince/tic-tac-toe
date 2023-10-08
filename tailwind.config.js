/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-bg': '#058E86',
        'secondary-bg': "#161616",
      },
    },
  },
  plugins: [],
}

