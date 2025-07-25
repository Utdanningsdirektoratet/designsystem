/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import pkg from './package.json';
import * as R from 'ramda';

const resolveAlias = (alias: string): string =>
  path.resolve(import.meta.dirname, alias);

const resolveAliases = R.map(resolveAlias);

const dependencies = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

/*
Mark submodules from dependencies as being external
*/
const dependenciesSubmodules = dependencies.map(
  (dep) => new RegExp(`^${dep}/`),
);

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/@udir-design/react',
  resolve: {
    alias: resolveAliases({
      '.storybook': '.storybook',
      '@udir-design/react/alpha': 'src/alpha',
      '@udir-design/react/beta': 'src/beta',
      // the root (stable) export must be last to not interfere with the aliases above
      '@udir-design/react': 'src/index',
    }),
  },

  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: {
        index: 'src/index.ts',
        alpha: 'src/alpha.ts',
        beta: 'src/beta.ts',
      },
      name: '@udir-design/react',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [...dependencies, ...dependenciesSubmodules],
    },
  },
});
