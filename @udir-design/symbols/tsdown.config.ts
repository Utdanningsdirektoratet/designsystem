import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['generated-src/**/*.{ts,tsx}'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['react', 'react/jsx-runtime'],
  },
});
