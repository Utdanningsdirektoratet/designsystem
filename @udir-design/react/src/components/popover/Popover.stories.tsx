import type { Meta, StoryObj } from '@storybook/react';

import { expect, userEvent, within } from '@storybook/test';
import { TrashIcon } from '@navikt/aksel-icons';
import { Popover, Button, Paragraph } from '../alpha';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['alpha'],
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      display: 'flex',
      placeItems: 'end',
      placeContent: 'center',
      padding: '1rem 2rem',
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  play: async (ctx) => {
    // When not in Docs mode, automatically open the popover
    const canvas = within(ctx.canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    const popover = ctx.canvasElement.querySelector('[popover]');
    await expect(popover).toBeVisible();
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Preview: Story = {
  args: {
    placement: 'top',
  },
  parameters: {
    customStyles: {
      paddingTop: '5rem',
    },
  },
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger>My trigger!</Popover.Trigger>
      <Popover {...args}>popover content</Popover>
    </Popover.TriggerContext>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    const dropdown = canvasElement.querySelector('[popover]');

    await step('Open popover', async () => {
      await userEvent.click(button);
      expect(dropdown).toBeVisible();
    });
    await step('Close popover', async () => {
      await userEvent.click(button);
      expect(dropdown).not.toBeVisible();
    });
    await step('Click outside closes dropdown', async () => {
      await userEvent.click(button);
      expect(dropdown).toBeVisible();
      await userEvent.click(document.body);
      expect(dropdown).not.toBeVisible();
    });
  },
};

export const Interactive: Story = {
  parameters: {
    customStyles: {
      padding: '12rem 6rem 1rem',
    },
  },
  render: (args) => {
    return (
      <Popover.TriggerContext>
        <Popover.Trigger data-color="danger" aria-label="Slett rad">
          <TrashIcon title="Slett rad" />
        </Popover.Trigger>
        <Popover {...args} data-color="danger">
          <Paragraph>
            Er du sikker på at du vil slette raden? Handlingen kan ikke angres.
          </Paragraph>
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-2)',
              marginTop: 'var(--ds-size-2)',
            }}
          >
            <Button data-size="sm">Ja, slett den</Button>
            <Button data-size="sm" variant="tertiary">
              Avbryt
            </Button>
          </div>
        </Popover>
      </Popover.TriggerContext>
    );
  },
};

export const DottedUnderline: Story = {
  parameters: {
    customStyles: {
      padding: '10rem 6rem 1rem',
    },
  },
  render: (args) => {
    return (
      <Popover.TriggerContext>
        <Paragraph>
          Vi bruker <Popover.Trigger inline>design tokens</Popover.Trigger> for
          å sikre at vi har konsistent design.
        </Paragraph>
        <Popover {...args} data-color="neutral">
          <Paragraph>
            <strong
              style={{
                display: 'block',
              }}
            >
              Design tokens
            </strong>
            Design tokens er en samling av variabler som definerer designet i et
            designsystem.
          </Paragraph>
        </Popover>
      </Popover.TriggerContext>
    );
  },
};

const VariantsMap: {
  [key: string]: { [key: string]: string };
} = {
  neutralDefault: {
    'data-color': 'neutral',
  },
  neutralTinted: {
    'data-color': 'neutral',
    'data-variant': 'tinted',
  },
  dangerDefault: {
    'data-color': 'danger',
  },
  dangerTinted: {
    'data-color': 'danger',
    'data-variant': 'tinted',
  },
  infoDefault: {
    'data-color': 'info',
  },
  infoTinted: {
    'data-color': 'info',
    'data-variant': 'tinted',
  },
  warningDefault: {
    'data-color': 'warning',
  },
  warningTinted: {
    'data-color': 'warning',
    'data-variant': 'tinted',
  },
};

export const Variants: Story = {
  parameters: {
    customStyles: {
      padding: '5rem 1rem',
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(true), []);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--ds-size-2)',
          height: '100%',
          width: '100%',
        }}
      >
        {Object.entries(VariantsMap).map(([key, props], index) => (
          <Popover.TriggerContext key={key}>
            <Popover.Trigger>popover</Popover.Trigger>
            <Popover
              {...args}
              open={open}
              placement={index >= 4 ? 'bottom' : 'top'}
              autoPlacement={false}
              {...props}
            >
              {key}
            </Popover>
          </Popover.TriggerContext>
        ))}
      </div>
    );
  },
  play: () => {
    // Popover already open
  },
};

export const Controlled: Story = {
  parameters: {
    customStyles: {
      padding: '8rem 6rem 1rem',
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <Popover.TriggerContext>
        <Popover.Trigger onClick={() => setOpen(!open)}>
          My trigger
        </Popover.Trigger>
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          data-color="neutral"
        >
          <Paragraph>Er du sikker på at du vil slette?</Paragraph>
          <Button
            data-color="danger"
            onClick={() => setOpen(false)}
            data-size="sm"
            style={{ marginTop: 'var(--ds-size-2)' }}
          >
            Slett
          </Button>
        </Popover>
      </Popover.TriggerContext>
    );
  },
};

export const WithoutContext: Story = {
  parameters: {
    customStyles: {
      padding: '8rem 6rem 1rem',
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button popovertarget="my-popover" onClick={() => setOpen(!open)}>
          My trigger
        </Button>
        <Popover
          {...args}
          id="my-popover"
          open={open}
          onClose={() => setOpen(false)}
          data-color="neutral"
        >
          <Paragraph>Er du sikker på at du vil slette?</Paragraph>
          <Button
            data-color="danger"
            onClick={() => setOpen(false)}
            data-size="sm"
            style={{ marginTop: 'var(--ds-size-2)' }}
          >
            Slett
          </Button>
        </Popover>
      </>
    );
  },
};
