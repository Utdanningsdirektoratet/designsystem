import './style.css';

import { Preview } from '@storybook/react';
const preview: Preview = {
  tags: ['autodocs', 'a11y-test'],
  parameters: {
    options: {
      storySort: {
        order: ['demo', 'components'],
      },
    },
  },
};

export default preview;
