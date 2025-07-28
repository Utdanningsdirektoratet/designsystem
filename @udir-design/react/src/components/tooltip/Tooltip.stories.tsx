import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent, waitFor } from 'storybook/test';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';
import {
  FilesIcon,
  FloppydiskIcon,
  PlusCircleIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@navikt/aksel-icons';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['beta'],
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
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button aria-label="Legg til" variant="tertiary" icon>
        <PlusCircleIcon aria-hidden />
      </Button>
    </Tooltip>
  ),
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
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
        <Tooltip placement="left" content="Slett">
          <Button aria-label="Slett" icon variant="secondary">
            <TrashIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="top" content="Lagre">
          <Button aria-label="Lagre" icon variant="secondary">
            <FloppydiskIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" content="ctrl + p">
          <Button aria-label="Print" icon variant="secondary">
            <PrinterSmallIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Kopier">
          <Button aria-label="Kopier" icon variant="secondary">
            <FilesIcon aria-hidden />
          </Button>
        </Tooltip>
      </div>
    );
  },
};
