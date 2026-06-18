import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['generated-src/**/*.{ts,tsx}'],
  logLevel: 'warn',
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['react', 'react/jsx-runtime'],
  },
});
