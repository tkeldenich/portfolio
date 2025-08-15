/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        main: {
          1: 'var(--main-1)',
          2: 'var(--main-2)',
          3: 'var(--main-3)',
          4: 'var(--main-4)',
          5: 'var(--main-5)',
        },
      },
    },
  },
  plugins: [],
};