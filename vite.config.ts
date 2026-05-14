import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/mariogijoncv/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('/react-dom/')) {
            return 'vendor-react';
          }

          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }

          if (id.includes('src/content/copy.json') || id.includes('src/data/projectTranslations.generated.json')) {
            return 'content-data';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 4173
  }
});
