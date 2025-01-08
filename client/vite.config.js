// filepath: /Users/mustafakaracuha/Desktop/auth-app/auth-app/client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://user-auth-app-server.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});