import type { Meta, StoryObj } from '@storybook/react-vite';

import { DemoPage } from './DemoPage';
import { demoParameters } from '../demoParameters';

const meta: Meta<typeof DemoPage> = {
  title: 'demo/Page Demo',
  component: DemoPage,
  parameters: {
    ...demoParameters,
  },
};

export default meta;
type Story = StoryObj<typeof DemoPage>;

export const Simple: Story = {
  args: {
    'data-color-scheme': 'auto',
  },
};
