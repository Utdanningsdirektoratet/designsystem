import type { Meta, StoryObj } from '@storybook/react-vite';
import { demoParameters } from '../demoParameters';
import { DemoPage } from './DemoPage';

const meta: Meta<typeof DemoPage> = {
  title: 'demo/Page Demo',
  component: DemoPage,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'digdir',
      demo: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DemoPage>;

export const Simple: Story = {
  args: {
    'data-color-scheme': 'auto',
  },
};
