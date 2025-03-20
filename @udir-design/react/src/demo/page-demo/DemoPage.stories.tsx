import type { Meta, StoryObj } from '@storybook/react';

import { DemoPage } from './DemoPage';

const meta: Meta<typeof DemoPage> = {
  title: 'demo/Page Demo',
  component: DemoPage,
};

export default meta;
type Story = StoryObj<typeof DemoPage>;

export const Simple: Story = {
  args: {
    'data-size': 'sm',
    'data-color-scheme': 'auto',
  },
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
};
