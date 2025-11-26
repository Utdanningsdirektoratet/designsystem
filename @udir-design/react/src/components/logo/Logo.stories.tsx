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

export const Preview: Story = {
  render: (args) => <Logo {...args} />,
};

export const Symbol: Story = {
  render: (args) => <LogoSymbol {...args} />,
};

export const DarkMode: Story = {
  render: (args) => (
    <div data-color-scheme="dark">
      <Logo {...args} />
    </div>
  ),
};
