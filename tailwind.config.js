/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
          lighter: '#222222',
        },
        accent: {
          DEFAULT: '#a8ff3e',
          dim: 'rgba(168, 255, 62, 0.15)',
        },
        text: {
          DEFAULT: '#f0ede8',
          muted: '#888888',
          subtle: '#555555',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1400px',
          xl: '1400px',
        },
      },
    },
  },
  plugins: [],
}
