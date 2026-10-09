import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  // Builds with login are served under /illustrasjoner and read artwork from private storage.
  const authenticated = Boolean(
    loadEnv(mode, import.meta.dirname, 'VITE_').VITE_AUTH_CLIENT_ID,
  );
  return {
    root: import.meta.dirname,
    base: authenticated ? '/illustrasjoner/' : '/',
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
      // The artwork in public/ is uploaded to storage, never deployed or cached with the app.
      copyPublicDir: false,
      reportCompressedSize: true,
      chunkSizeWarningLimit: Infinity,
    },
    test: {
      include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.ts'],
      setupFiles: ['./src/test-setup.ts'],
    },
  };
});
