import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  base: '/recurringly/',
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/recurringly/api': {
        rewrite: (path) => path.replace(/^\/recurringly/, ''),
        target: 'http://localhost:8090',
        changeOrigin: true,
      },
    },
  },
});
