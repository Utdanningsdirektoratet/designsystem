import './style.css';
import { Preview } from '@storybook/react';
import type { MarkdownToJSX } from 'markdown-to-jsx';

export const componentOverrides = {} satisfies MarkdownToJSX.Overrides;

const preview: Preview = {
  tags: ['autodocs', 'a11y-test'],
  parameters: {
    options: {
      storySort: {
        order: ['Introduksjon', 'demo', 'components'],
      },
    },
    docs: {
      components: componentOverrides,
    },
  },
};

export default preview;
