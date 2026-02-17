import preview from '.storybook/preview';
import { LogoSymbol } from './LogoSymbol';

const meta = preview.meta({
  component: LogoSymbol,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  render: (args) => <LogoSymbol {...args} />,
});
