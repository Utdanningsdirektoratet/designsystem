import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { MultiplyIcon, TrashIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Popover } from './Popover';

const meta = preview.meta({
  component: Popover,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    customStyles: {
      display: 'flex',
      justifyContent: 'center',
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
});

export const Preview = meta.story({
  render: (args) => (
    <Popover.TriggerContext>
      <Popover.Trigger variant="tertiary">
        Fjern <MultiplyIcon aria-hidden />
      </Popover.Trigger>
      <Popover {...args}>
        Er du sikker på at du vil fjerne raden? Handlingen kan ikke angres.
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-size-2)',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          <Button data-size="sm">Ja, fjern</Button>
          <Button data-size="sm" variant="tertiary">
            Avbryt
          </Button>
        </div>
      </Popover>
    </Popover.TriggerContext>
  ),
  play: async (ctx) => {
    const button = within(ctx.canvasElement).getByRole('button');

    // Check open, click link and close with trigger
    await userEvent.click(button);
    const dropdown = ctx.canvasElement.querySelector('[popover]');
    await expect(dropdown).toBeVisible();
    await userEvent.click(button);
    await expect(dropdown).not.toBeVisible();

    // Check close with click outside
    await userEvent.click(button);
    await expect(dropdown).toBeVisible();
    await userEvent.click(ctx.canvasElement);
    await expect(dropdown).not.toBeVisible();

    await userEvent.click(button);
  },
});

export const Interactive = meta.story({
  render: () => (
    <Popover.TriggerContext>
      <Popover.Trigger aria-label="Lukk" variant="secondary">
        Lukk <MultiplyIcon aria-hidden />
      </Popover.Trigger>
      <Popover>
        <Paragraph>Vil du lagre endringene dine?</Paragraph>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-size-2)',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          <Button data-size="sm">Lagre</Button>
          <Button data-size="sm" variant="tertiary">
            Ikke lagre
          </Button>
        </div>
      </Popover>
    </Popover.TriggerContext>
  ),
});

export const DottedUnderline = meta.story({
  render: () => (
    <Popover.TriggerContext>
      <Paragraph>
        I aldersgruppen 1-5 år går 93 prosent av barna i barnehage. I
        aldersgruppen 3-5 år er andelen 97 prosent. Til sammenligning er{' '}
        <Popover.Trigger inline>OECD</Popover.Trigger>-gjennomsnittet for
        andelen 3-5-åringer i barnehage på 83 prosent (OECD 2021).
      </Paragraph>
      <Popover data-color="neutral">
        <Paragraph>
          <strong>Organisasjonen for økonomisk samarbeid og utvikling </strong>
          (OCED) er en internasjonal organisasjon som sammarbeider om å fremme
          økonomisk og sosial vekst og utvikling.
        </Paragraph>
      </Popover>
    </Popover.TriggerContext>
  ),
  play: async (ctx) => {
    const button = within(ctx.canvasElement).getByRole('button');

    // Check open and close with trigger
    await userEvent.click(button);
    const dropdown = ctx.canvasElement.querySelector('[popover]');
    await expect(dropdown).toBeVisible();
    await userEvent.click(button);
    await expect(dropdown).not.toBeVisible();

    // Check close with click outside
    await userEvent.click(button);
    await expect(dropdown).toBeVisible();
    await userEvent.click(ctx.canvasElement);
    await expect(dropdown).not.toBeVisible();

    await userEvent.click(button);
  },
});

const ColorVariantsMap: {
  [key: string]: { [key: string]: string };
} = {
  neutralDefault: {
    'data-color': 'neutral',
  },
  neutralTinted: {
    'data-color': 'neutral',
    variant: 'tinted',
  },
  accentDefault: {
    'data-color': 'accent',
  },
  accentTinted: {
    'data-color': 'accent',
    variant: 'tinted',
  },
  support1Default: {
    'data-color': 'support1',
  },
  support1Tinted: {
    'data-color': 'support1',
    variant: 'tinted',
  },
  support2Default: {
    'data-color': 'support2',
  },
  support2Tinted: {
    'data-color': 'support2',
    variant: 'tinted',
  },
};

const VariantsMap: {
  [key: string]: { [key: string]: string };
} = {
  successDefault: {
    'data-color': 'success',
  },
  successTinted: {
    'data-color': 'success',
    variant: 'tinted',
  },
  dangerDefault: {
    'data-color': 'danger',
  },
  dangerTinted: {
    'data-color': 'danger',
    variant: 'tinted',
  },
  infoDefault: {
    'data-color': 'info',
  },
  infoTinted: {
    'data-color': 'info',
    variant: 'tinted',
  },
  warningDefault: {
    'data-color': 'warning',
  },
  warningTinted: {
    'data-color': 'warning',
    variant: 'tinted',
  },
};

export const Variants = meta.story({
  render: () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '100px',
          placeItems: 'center',
          marginTop: 'var(--ds-size-12)',
        }}
      >
        {Object.entries(VariantsMap).map(([key, props]) => (
          <Popover.TriggerContext key={key}>
            <Popover.Trigger variant="tertiary">popover</Popover.Trigger>
            <Popover open={true} autoPlacement={false} {...props}>
              {key}
            </Popover>
          </Popover.TriggerContext>
        ))}
      </div>
    );
  },
  play: () => {
    return;
  },
});

export const ColorVariants = meta.story({
  render: () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '100px',
          placeItems: 'center',
          marginTop: 'var(--ds-size-12)',
        }}
      >
        {Object.entries(ColorVariantsMap).map(([key, props]) => (
          <Popover.TriggerContext key={key}>
            <Popover.Trigger variant="tertiary">popover</Popover.Trigger>
            <Popover open={true} autoPlacement={false} {...props}>
              {key}
            </Popover>
          </Popover.TriggerContext>
        ))}
      </div>
    );
  },
  play: () => {
    return;
  },
});

export const Controlled = meta.story({
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover.TriggerContext>
        <Popover.Trigger variant="tertiary" onClick={() => setOpen(!open)}>
          Fjern <MultiplyIcon aria-hidden />
        </Popover.Trigger>
        <Popover open={open} {...args}>
          Er du sikker på at du vil fjerne raden? Handlingen kan ikke angres.
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-2)',
              marginTop: 'var(--ds-size-2)',
            }}
          >
            <Button data-size="sm" onClick={() => setOpen(false)}>
              Ja, fjern
            </Button>
            <Button
              data-size="sm"
              variant="tertiary"
              onClick={() => setOpen(false)}
            >
              Avbryt
            </Button>
          </div>
        </Popover>
      </Popover.TriggerContext>
    );
  },
});

export const WithoutContext = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          popovertarget="my-popover"
          aria-label="Slett rad"
          onClick={() => setOpen(!open)}
        >
          <TrashIcon title="Slett rad" />
        </Button>
        <Popover
          id="my-popover"
          open={open}
          onClose={() => setOpen(false)}
          data-color="neutral"
        >
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
      </>
    );
  },
});
