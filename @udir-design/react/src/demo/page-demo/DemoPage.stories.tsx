import type { Meta, StoryObj } from '@storybook/react-vite';

import { DemoPage } from './DemoPage';
import { demoChromaticModes } from '../demoChromaticModes';

const meta: Meta<typeof DemoPage> = {
  title: 'demo/Page Demo',
  component: DemoPage,
  parameters: { chromatic: { modes: demoChromaticModes } },
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
