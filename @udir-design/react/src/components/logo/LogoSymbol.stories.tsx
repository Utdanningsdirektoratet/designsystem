import preview from '.storybook/preview';
import { LogoSymbol } from './LogoSymbol';

const meta = preview.meta({
  component: LogoSymbol,
  tags: ['beta', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  render: (args) => <LogoSymbol {...args} />,
});
