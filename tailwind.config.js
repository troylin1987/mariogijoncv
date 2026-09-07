import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        brand: {
          primary:   '#1FBFAD',
          secondary: '#147A6E',
          dark:      '#0A403A',
          darker:    '#08332E',
          light:     '#6FBCD1',
          mid:       '#4EABBF',
          teal:      '#1B98A8',
          teal2:     '#187A87',
          ocean:     '#0A6373',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      }
    }
  },
  plugins: []
} satisfies Config;
