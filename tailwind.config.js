/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d4d',
        'primary-dark': '#990000',
        secondary: '#7C3AED',  // Vibrant purple
        accent: '#EC4899',     // Hot pink
        dark: '#1F2937',
        light: '#EEF2FF',      // Light indigo
        'gradient-1': '#C084FC', // Purple
        'gradient-2': '#818CF8', // Indigo
        'gradient-3': '#F472B6', // Pink
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        blob: "blob 7s infinite",
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}

