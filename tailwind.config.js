/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:  '#0b0c10',
        ink:       '#12141a',
        charcoal:  '#1a1d26',
        card:      '#1e2230',
        gold: {
          DEFAULT: '#b4985a',
          light:   '#d4b878',
          pale:    'rgba(180,152,90,0.08)',
        },
        cream:     '#f0ece4',
        mist:      'rgba(240,236,228,0.55)',
        border:    'rgba(180,152,90,0.18)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans:  ['Outfit', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        pulse2:  'pulse2 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
