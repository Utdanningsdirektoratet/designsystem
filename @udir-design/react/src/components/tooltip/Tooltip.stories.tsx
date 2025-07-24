import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent, waitFor } from 'storybook/test';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      margin: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Preview: Story = {
  args: {
    content: 'Legg til',
    children: (
      <Button aria-label="Legg til" variant="tertiary" icon>
        <PlusCircleIcon aria-hidden />
      </Button>
    ),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');

    await step('Tooltip is not visible initially', async () => {
      const tooltip = canvas.queryByText(args.content);
      expect(tooltip).not.toBeVisible();
    });

    await step('Hovering over the button displays the tooltip', async () => {
      await userEvent.hover(trigger);
      const tooltip = canvas.queryByText(args.content);
      await waitFor(() => {
        expect(tooltip).toBeVisible();
      });
      await userEvent.unhover(trigger);
      expect(tooltip).not.toBeVisible();
    });

    await step('Focus on the button displays the tooltip', async () => {
      await userEvent.tab();
      const tooltip = canvas.getByRole('tooltip');
      await waitFor(() => {
        expect(tooltip).toBeVisible();
      });
      await userEvent.tab();
      expect(tooltip).not.toBeVisible();
    });
  },
};

export const Placement: Story = {
  args: {
    content: 'Slett',
    placement: 'bottom',
    children: (
      <Button aria-label="Slett" data-color="danger" icon>
        <TrashIcon aria-hidden />
      </Button>
    ),
  },
};
