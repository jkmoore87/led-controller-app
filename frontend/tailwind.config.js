/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00ffff',
        'neon-gold': '#ffd700',
        'panel': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.5s infinite alternate',
        'pulse-gold': 'pulseGold 1.5s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%': { color: '#00ffff', textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' },
          '100%': { color: '#fffbe6', textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff' },
        },
        pulseGold: {
          '0%': { color: '#ffd700', textShadow: '0 0 10px #ffd700, 0 0 20px #ffd700' },
          '100%': { color: '#fff8b0', textShadow: '0 0 30px #ffd700, 0 0 60px #ffd700' },
        },
      },
    },
  },
  plugins: [],
}
