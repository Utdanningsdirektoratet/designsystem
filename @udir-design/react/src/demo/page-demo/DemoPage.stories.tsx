import type { Meta, StoryObj } from '@storybook/react-vite';

import { DemoPage } from './DemoPage';

const meta: Meta<typeof DemoPage> = {
  title: 'demo/Page Demo',
  component: DemoPage,
};

export default meta;
type Story = StoryObj<typeof DemoPage>;

export const Simple: Story = {
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
    args: {
      'data-color-scheme': 'auto',
    },
  },
};
