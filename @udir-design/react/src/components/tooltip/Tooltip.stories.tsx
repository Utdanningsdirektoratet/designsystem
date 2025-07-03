import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['alpha'],
  parameters: {
    customStyles: { margin: '2rem' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Preview: Story = {
  args: {
    content: 'Tooltip tekst',
    children: <Button>Hold peker over meg</Button>,
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
      const tooltip = canvas.getByRole('tooltip');
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

export const WithString: Story = {
  args: {
    content: 'Tooltip text',
    children: 'Hold peker over meg',
  },
};

export const Placement: Story = {
  args: {
    content: 'Tooltip text',
    placement: 'bottom',
    children: 'Hold peker over meg',
  },
};
