import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import { LogoSymbol } from './LogoSymbol';

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;
type StorySymbol = StoryObj<typeof LogoSymbol>;

export const Preview: Story = {
  render: (args) => <Logo {...args} />,
};

export const Symbol: StorySymbol = {
  render: (args) => <LogoSymbol {...args} />,
};

export const DarkMode: Story = {
  render: (args) => (
    <div data-color-scheme="dark">
      <Logo {...args} />
    </div>
  ),
};

export const Variables: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', gap: 'var(--ds-size-4)', alignItems: 'center' }}
    >
      <Logo {...args} style={{ border: '1px solid black' }} />
      <LogoSymbol style={{ border: '1px solid black' }} />
    </div>
  ),
};
