/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF4602',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        dark: '#121212',
        'dark-card': '#1E1E1E',
        'dark-hover': '#2A2A2A',
      },
      textColor: {
        'dark-primary': '#F3F4F6',
        'dark-secondary': '#9CA3AF',
      },
    },
  },
  plugins: [],
};
