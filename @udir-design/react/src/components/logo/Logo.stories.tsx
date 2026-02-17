import preview from '.storybook/preview';
import { Logo } from './Logo';

const meta = preview.meta({
  title: 'Components/Logo/Logo',
  component: Logo,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  render: (args) => <Logo {...args} />,
});

export const DarkMode = meta.story({
  render: (args) => (
    <div data-color-scheme="dark">
      <Logo {...args} />
    </div>
  ),
});
