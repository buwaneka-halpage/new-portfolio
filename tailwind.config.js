/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base backgrounds — match CSS variables
        bg: '#050508',
        surface: {
          DEFAULT: '#0e0e14',
          light: '#141420',
          // Used as 1px dividers and subtle borders
          lighter: 'rgba(255, 255, 255, 0.06)',
        },
        // Accent — teal primary, keeps 'accent' token name for existing class refs
        accent: {
          DEFAULT: '#0de2c8',
          dim: 'rgba(13, 226, 200, 0.12)',
        },
        // Text scale — match CSS variables
        text: {
          DEFAULT: '#f4f0fa',
          muted: '#8b879c',
          subtle: '#4a4a58',
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
