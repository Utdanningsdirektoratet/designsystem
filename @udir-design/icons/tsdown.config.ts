import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    // One entry per icon (plus `index`), so bundlers only include used icons
    '*': 'generated-src/*.{ts,tsx}',
    metadata: 'src/metadata.ts',
  },
  logLevel: 'warn',
  format: ['esm', 'cjs'],
  dts: true,
});
