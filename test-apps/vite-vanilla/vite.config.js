import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
