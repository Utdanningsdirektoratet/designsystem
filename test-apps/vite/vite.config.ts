import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/test-apps/vite',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '.storybook': path.resolve(
        __dirname,
        '../../@udir-design/react/.storybook',
      ),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: Infinity,
  },
  define: {
    'import.meta.vitest': undefined,
  },
});
