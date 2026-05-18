/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A5C45',
        primaryLight: '#12755A',
        primaryPale: '#E8F5F0',
        accent: '#E8A838',
        accentLight: '#FDF3DC',
        dark: '#1A1F2E',
        muted: '#6B7280',
        border: '#E5E9EF',
        surface: '#F8FAFB',
        danger: '#D94F4F',
        success: '#2DA76A',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        hero: '0 12px 48px rgba(0,0,0,0.2)',
        glow: '0 6px 24px rgba(232,168,56,0.35)',
        card: '0 16px 40px rgba(10,92,69,0.14)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(14px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        popIn: {
          'from': { transform: 'scale(0.7)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        blobFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(18px, -22px) scale(1.07)' },
          '66%': { transform: 'translate(-14px, 10px) scale(0.96)' },
        },
        blobFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-20px, 16px) scale(1.05)' },
          '66%': { transform: 'translate(12px, -18px) scale(0.97)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 2s ease-out infinite',
        floatBadge: 'floatBadge 3s ease-in-out infinite',
        slideInRight: 'slideInRight 0.3s ease',
        popIn: 'popIn 0.4s cubic-bezier(.34,1.56,.64,1)',
        blobFloat1: 'blobFloat1 9s ease-in-out infinite',
        blobFloat2: 'blobFloat2 11s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

