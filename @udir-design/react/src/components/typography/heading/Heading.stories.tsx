import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  tags: ['beta', '!autodocs', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  argTypes: {
    'data-size': {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
  title: 'Components/Typography/Heading',
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Preview: Story = {
  args: {
    children: 'Heading',
  },
};
