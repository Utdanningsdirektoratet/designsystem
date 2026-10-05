import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/illustrations',
  server: {
    port: 4400,
    host: 'localhost',
  },
  preview: {
    port: 4500,
    host: 'localhost',
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: Infinity,
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.ts'],
    setupFiles: ['./src/test-setup.ts'],
  },
});
