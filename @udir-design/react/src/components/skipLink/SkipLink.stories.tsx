import { expect, userEvent, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { SkipLink } from './SkipLink';

const meta = preview.meta({
  component: SkipLink,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
  },
  decorators: [withScrollHashBehavior],
  args: {
    // Shared defaults for required props
    children: undefined,
    href: '#',
  },
});

export const Preview = meta.story({
  render: (args) => (
    <>
      <Paragraph>
        Tab til, eller klikk inni dette eksempelet og trykk <kbd>Tab</kbd>.
        <SkipLink {...args} href="#main-content">
          Hopp til hovedinnholdet
        </SkipLink>
      </Paragraph>
      <main id="main-content" tabIndex={-1}>
        Region som kan motta fokus fra SkipLink.
      </main>
    </>
  ),
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement);
    const mainContent = canvas.getByRole('main');
    const link = canvas.getByRole('link');
    await expect(link).not.toSatisfy(isVisibleOnScreen);
    await userEvent.tab();
    await expect(link).toSatisfy(isVisibleOnScreen);
    await expect(link).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(mainContent).toHaveFocus();
    await userEvent.keyboard('{Tab}');
  },
});

export const Tabbed = meta.story({
  ...Preview.input,
  play: async () => {
    await userEvent.tab();
  },
});

function isVisibleOnScreen(el: Element) {
  const { height, width } = el.getBoundingClientRect();
  return height > 1 && width > 1;
}
