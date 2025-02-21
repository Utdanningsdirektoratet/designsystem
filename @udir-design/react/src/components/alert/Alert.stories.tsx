import type { Meta, StoryObj } from '@storybook/react';

import { Heading, Link, Paragraph } from '../alpha';

import { Alert } from './Alert';
import { within, expect } from '@storybook/test';

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['alpha'],
};

export default meta;

export const Preview: Story = {
  args: {
    'data-color': 'info',
    children: 'En beskjed det er viktig at brukeren ser',
  },
  render: (args) => <Alert data-testid="alert-preview" {...args} />,
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByTestId('alert-preview');
    await step('Alert is rendered ', async () => {
      expect(alert).toBeTruthy();
    });
    await step('Alert has correct color', async () => {
      expect(alert).toHaveAttribute('data-color', 'info');
    });
    await step('Alert has correct text', async () => {
      expect(alert).toHaveTextContent(args.children as string);
    });
  },
};

export const VariantInfo: Story = {
  args: {
    'data-color': 'info',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Har du husket å bestille passtime?
      </Heading>,
      <Paragraph>
        Det er lange køer for å bestille pass om dagen, det kan være lurt å
        bestille i god tid før du skal reise.
      </Paragraph>,
    ],
  },
};

export const VariantSuccess: Story = {
  args: {
    'data-color': 'success',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Gratulerer! Du kan nå starte selskapet ditt
      </Heading>,
      <Paragraph>
        Det ser ut til at regnestykket går i pluss og at du har det som skal til
        for å starte selskapet ditt.
      </Paragraph>,
    ],
  },
};

export const VariantWarning: Story = {
  args: {
    'data-color': 'warning',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Vi har tekniske problemer
      </Heading>,
      <Paragraph>
        Det gjør at du kan bli avbrutt mens du fyller ut skjemaet. Vi jobber med
        å rette problemene.
      </Paragraph>,
    ],
  },
};

export const VariantDanger: Story = {
  args: {
    'data-color': 'danger',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Det har skjedd en feil
      </Heading>,
      <Paragraph>
        Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen
        litt senere. Hvis vi fortsatt ikke klarer å vise informasjonen du
        trenger, tar du kontakt med kundeservice på telefon 85 44 32 66.
      </Paragraph>,
    ],
  },
};

export const MedHeading: Story = {
  args: {
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Har du husket å bestille passtime?
      </Heading>,
      <Paragraph>
        Det er lange køer for å bestille pass om dagen, det kan være lurt å
        bestille i god tid om du trenger pass til sommeren.
      </Paragraph>,
    ],
  },
};

export const MedKunHeading: Story = {
  args: {
    'data-color': 'warning',
    children: [
      <Paragraph>Du har 7 dager igjen på å fullføre søknaden.</Paragraph>,
    ],
  },
};

export const MedLenke: Story = {
  args: {
    'data-color': 'warning',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Søknadsfristen går ut om 3 dager
      </Heading>,
      <Paragraph>
        Fristen for å søke opptak til utdanning er 15. april.{' '}
        <Link href="https://udir.no/">Søk nå</Link>
      </Paragraph>,
    ],
  },
};

export const UtenAria: Story = {
  args: {
    'data-color': 'warning',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Nedetid
      </Heading>,
      <Paragraph>
        I natt klokken 00:00 til 02:00 vil nettsiden være nede på grunn av
        vedlikehold.
      </Paragraph>,
    ],
  },
};

export const MedAria: Story = {
  args: {
    'data-color': 'danger',
    role: 'alert',
    children: [
      <Heading
        level={2}
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Vi klarer ikke lagre skjemaet
      </Heading>,
      <Paragraph>
        Vi har mistet forbindelsen med serveren og får ikke lagret skjemaet.
        Vent litt og prøv en gang til.
      </Paragraph>,
    ],
  },
};
