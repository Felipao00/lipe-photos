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
        background: '#0A0A0A',
        surface: '#111111',
        'text-primary': '#F5F0EB',
        'text-secondary': '#A09890',
        'text-muted': '#6B6560',
        accent: '#F5F0EB',
        border: '#1F1F1F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        signature: ['var(--font-signature)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;