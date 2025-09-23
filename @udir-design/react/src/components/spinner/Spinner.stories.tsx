import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    customStyles: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Preview: Story = {
  args: {
    'aria-label': 'Laster...',
  },
};

export const Sizes: Story = {
  args: {
    'aria-label': 'Laster...',
  },
  render: (args) => (
    <>
      <Spinner {...args} data-size="2xs" />
      <Spinner {...args} data-size="xs" />
      <Spinner {...args} data-size="sm" />
      <Spinner {...args} data-size="md" />
      <Spinner {...args} data-size="lg" />
      <Spinner {...args} data-size="xl" />
    </>
  ),
};

export const Variants: Story = {
  args: {
    'aria-label': 'Laster...',
    'data-size': 'xl',
  },
  render: (args) => (
    <>
      <Spinner {...args} data-color="neutral" />
      <Spinner {...args} data-color="accent" />
      <Spinner {...args} data-color="support1" />
      <Spinner {...args} data-color="support2" />
    </>
  ),
};
