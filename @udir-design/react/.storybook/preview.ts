import './style.css';

import { Preview } from '@storybook/react';
const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['demo', 'components'],
      },
    },
  },
};

export default preview;
