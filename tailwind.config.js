/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-red': '#ff3333', // Added Neon Red
      },
      textShadow: {
        'neon-cyan': '0 0 8px #00ffff, 0 0 16px #00ffff',
        'neon-red': '0 0 8px #ff3333, 0 0 16px #ff3333', // Added Neon Red glow
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // Added text shadow plugin
  ],
}