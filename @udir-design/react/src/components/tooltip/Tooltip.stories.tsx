import { expect, within } from 'storybook/test';
import {
  FilesIcon,
  FloppydiskIcon,
  PlusCircleIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Tooltip } from './Tooltip';

const meta = preview.meta({
  component: Tooltip,
  tags: ['digdir'],
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
    // Children and content is required in Tooltip props, so we must set something
    children: undefined,
    content: undefined,
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

    await step('Applies tooltip attributes to the trigger', async () => {
      expect(trigger).toHaveAttribute('data-tooltip', args.content);
      expect(trigger).toHaveAttribute('aria-label', args.content);
    });
  },
});

export const Placement = meta.story({
  render: (args) => {
    return (
      <>
        <style>
          {`
.placement-main {
  display: flex;
  gap: var(--ds-size-2);
}`}
        </style>
        <div className="placement-main">
          <Tooltip {...args} placement="left" content="Slett">
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
      </>
    );
  },
});

export const Aria = meta.story({
  render: (args) => (
    <>
      <style>
        {`
.aria-main {
  display: flex;
  gap: var(--ds-size-2);
}`}
      </style>
      <div className="aria-main">
        <Tooltip {...args} content="Jeg er hovedinformasjon (aria-label)">
          <Button icon>
            <FilesIcon aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip content="Jeg er tillegsinformasjon (aria-description)">
          <Button>Tekst i trigger</Button>
        </Tooltip>
      </div>
    </>
  ),
});
