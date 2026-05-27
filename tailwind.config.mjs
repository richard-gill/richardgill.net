/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff4444',
        'accent-hover': '#cc2222',
        'stats-red': '#c41d1d',
        'dark-hero': '#0d0d0d',
        'dark-card': '#111111',
        'dark-section': '#1a1a1a',
        'dark-raised': '#252525',
      },
    },
  },
  plugins: [],
};
