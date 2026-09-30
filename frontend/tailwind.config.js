/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orebit: {
          bg: '#0D1B2A',         // Dark Navy background
          card: '#1B2A4A',       // Lighter Navy for cards
          cardHover: '#22385E',
          text: '#F5F5F5',       // Primary text
          textMuted: '#A0AEC0',   // Secondary text
          orange: '#F4A100',     // Accent orange
          orangeGlow: '#F4A10033',
          blue: '#00B4D8',       // Accent blue
          blueGlow: '#00B4D833',
          border: '#2C3E60',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(244, 161, 0, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(0, 180, 216, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};
