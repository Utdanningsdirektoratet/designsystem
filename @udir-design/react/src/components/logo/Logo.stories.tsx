import { expect, within } from 'storybook/test';
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

export const DarkMode = meta.story({
  render: (args) => (
    <div data-color-scheme="dark">
      <Logo {...args} />
    </div>
  ),
});
