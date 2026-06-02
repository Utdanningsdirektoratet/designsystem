import preview from '.storybook/preview';
import { Logo } from './Logo';

const meta = preview.meta({
  title: 'Components/Logo/Logo',
  component: Logo,
  tags: ['udir'],
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

export const PrideVariants = meta.story({
  render: (args) => (
    <>
      <div data-color-scheme="light">
        <Logo {...args} variant="pride" />
      </div>
      <div data-color-scheme="dark">
        <Logo {...args} variant="pride" />
      </div>
    </>
  ),
});
