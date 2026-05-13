import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '900px',
      md: '900px',
      lg: '900px',
      xl: '900px',
      '2xl': '900px'
    },
    extend: {
      colors: {
        brand: {
          primary: '#ff8c42',
          secondary: '#ffb84d',
          accent: '#ff6b35',
          neon: '#ff6b35',
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      }
    }
  },
  plugins: []
} satisfies Config;
