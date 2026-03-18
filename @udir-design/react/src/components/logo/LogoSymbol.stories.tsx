import { expect, within } from 'storybook/test';
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const logos = canvas.getAllByAltText('Utdanningsdirektoratet');

    await step(
      'Logo is rendered with correct alttext in light- and darkmode',
      async () => {
        expect(logos).toHaveLength(2);
      },
    );
  },
});
