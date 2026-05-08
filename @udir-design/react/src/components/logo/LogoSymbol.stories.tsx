import preview from '.storybook/preview';
import { LogoSymbol } from './LogoSymbol';

const meta = preview.meta({
  component: LogoSymbol,
  tags: ['udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  render: (args) => <LogoSymbol {...args} />,
});

export const DarkMode = meta.story({
  render: (args) => (
    <div data-color-scheme="dark">
      <LogoSymbol {...args} />
    </div>
  ),
});
