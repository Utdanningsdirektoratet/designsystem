/// <reference types='vitest' />
import { createFilter, defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import pkg from './package.json';
import * as R from 'ramda';
import ts from 'typescript';

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
      src: 'src',
      '.storybook': '.storybook',
      '@udir-design/react/alpha': 'src/alpha',
      '@udir-design/react/beta': 'src/beta',
      // the root (stable) export must be last to not interfere with the aliases above
      '@udir-design/react': 'src/index',
    }),
  },

  plugins: [
    processComponentCss(),
    react(),
    tsConfigPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      afterDiagnostic: (diagnostics) => {
        const errors = diagnostics.filter(
          (x) => x.category === ts.DiagnosticCategory.Error,
        );
        if (errors.length > 0) {
          throw new Error(
            'Type error during .d.ts generation! See errors above.',
          );
        }
      },
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

function processComponentCss(): Plugin {
  const componentBase = '**/@udir-design/react/src/components';
  const include = `${componentBase}/**/*.css`;
  const exclude = `${componentBase}/**/*.module.css`;
  const filter = createFilter(include, exclude);

  return {
    name: 'udir-process-component-css',
    transform(code, id) {
      if (!filter(id)) return;

      const isStorybook = process.env.IS_STORYBOOK === 'true';
      if (isStorybook) {
        // Ensure the loaded css is wrapped in a layer, as @udir-design/css/src/index.css does
        return `@layer udir.components {\n${code}\n}`;
      } else {
        // Remove the css from the @udir-design/react bundle by returning an empty string.
        // Consumers will load it from @udir-design/css instead.
        return '';
      }
    },
  };
}
