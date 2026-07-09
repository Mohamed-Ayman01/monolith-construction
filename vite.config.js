import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive: resolve(__dirname, 'archive.html'),
        capabilities: resolve(__dirname, 'capabilities.html'),
        manifesto: resolve(__dirname, 'manifesto.html'),
        estimate: resolve(__dirname, 'estimate.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
