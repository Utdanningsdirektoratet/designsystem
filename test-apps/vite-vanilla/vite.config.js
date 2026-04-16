import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const icons = ['ArrowRight', 'PencilWriting'];
const symbols = ['DatamaskinFill'];

export default defineConfig({
  root: 'src',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: icons.map(
            (icon) => `../node_modules/@udir-design/icons/dist/svg/${icon}.svg`,
          ),
          dest: 'assets/icons/',
          rename: { stripBase: true },
        },
        {
          src: symbols.map(
            (symbol) =>
              `../node_modules/@udir-design/symbols/dist/svg/${symbol}.svg`,
          ),
          dest: 'assets/symbols/',
          rename: { stripBase: true },
        },
      ],
    }),
  ],
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
