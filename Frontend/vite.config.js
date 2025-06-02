import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://todo-web-app-backend-ynim.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
