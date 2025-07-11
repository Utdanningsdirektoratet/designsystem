import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkipLink } from './SkipLink';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { expect, userEvent, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';

const meta: Meta<typeof SkipLink> = {
  component: SkipLink,
  tags: ['alpha'],
  decorators: [withScrollHashBehavior],
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Paragraph>
        For å vise skiplinken, tab til dette eksempelet, eller klikk inni
        eksempelet og trykk <kbd>Tab</kbd>.
        <SkipLink {...args} href="#main-content">
          Hopp til hovedinnhold
        </SkipLink>
      </Paragraph>
      <main id="main-content" tabIndex={-1}>
        Region som kan motta fokus fra skiplink.
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
};

export const Tabbed: Story = {
  ...Preview,
  play: async () => {
    await userEvent.tab();
  },
};

function isVisibleOnScreen(el: Element) {
  const { height, width } = el.getBoundingClientRect();
  return height > 1 && width > 1;
}
