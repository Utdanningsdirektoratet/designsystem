import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  FilesIcon,
  FloppydiskIcon,
  PlusCircleIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Tooltip } from './Tooltip';

const meta = preview.meta({
  component: Tooltip,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    customStyles: {
      margin: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  args: {
    // Children is required in Tooltip props, so we must set something
    children: undefined,
  },
});

export const Preview = meta.story({
  args: {
    content: 'Legg til',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="tertiary" icon>
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
      await waitFor(() => expect(tooltip).not.toBeVisible());
    });

    await step('Focus on the button displays the tooltip', async () => {
      await userEvent.tab();
      const tooltip = canvas.getByRole('tooltip');
      await waitFor(() => {
        expect(tooltip).toBeVisible();
      });
      await userEvent.tab();
      await waitFor(() => expect(tooltip).not.toBeVisible());
    });
  },
});

export const Placement = meta.story({
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
        <Tooltip placement="left" content="Slett">
          <Button icon variant="secondary">
            <TrashIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="top" content="Lagre">
          <Button icon variant="secondary">
            <FloppydiskIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" content="ctrl + p">
          <Button icon variant="secondary">
            <PrinterSmallIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Kopier">
          <Button icon variant="secondary">
            <FilesIcon aria-hidden />
          </Button>
        </Tooltip>
      </div>
    );
  },
});

export const Aria = meta.story({
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
      <Tooltip content="Jeg er hovedinformasjon (aria-labelledby)">
        <Button icon>
          <FilesIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Jeg er tillegsinformasjon (aria-describedby)">
        <Button>Tekst i trigger</Button>
      </Tooltip>
    </div>
  ),
});
