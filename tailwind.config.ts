import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ag: {
          white: '#FFFFFF',
          cream: '#F8F4EF',
          parchment: '#EDE8E0',
          gold: '#B8934A',
          'gold-light': '#D4AF6E',
          'gold-dark': '#8B6914',
          charcoal: '#2C2C2C',
          black: '#0A0A0A',
          muted: '#8A8A8A',
          border: '#E5DDD3',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
