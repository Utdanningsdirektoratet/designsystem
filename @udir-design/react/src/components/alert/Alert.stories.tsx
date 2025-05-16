import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button, Heading, Link, Paragraph } from '@udir-design/react/alpha';
import { Alert } from './Alert';
import { within, expect } from '@storybook/test';
import { useState } from 'react';
import { formatReactSource } from '.storybook/utils/sourceTransformers';

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
      await expect(alert).toBeTruthy();
    });
    await step('Alert has correct color', async () => {
      await expect(alert).toHaveAttribute('data-color', 'info');
    });
    await step('Alert has correct text', async () => {
      await expect(alert).toHaveTextContent(args.children as string);
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
        Har du husket å melde deg på privatisteksamen?
      </Heading>,
      <Paragraph>
        Du må melde deg på innen 1. februar for våreksamen.
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
        Du kan levere søknaden din!
      </Heading>,
      <Paragraph>
        Du har besvart på alle spørsmålene i skjemaet. Du kan nå levere søknaden
        din.
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

export const UtenHeading: Story = {
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

export const WrongLiveRegion: StoryFn<typeof Alert> = () => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      {showAlert && (
        <Alert
          data-color="warning"
          // Feil bruk: role="alert" ligger på selve varselet
          role="alert"
        >
          <Heading
            level={2}
            data-size="xs"
            style={{
              marginBottom: 'var(--ds-size-2)',
            }}
          >
            Vi klarer ikke lagre skjemaet
          </Heading>
          <Paragraph>
            Vi har mistet forbindelsen med serveren og får ikke lagret skjemaet.
            Vent litt og prøv en gang til.
          </Paragraph>
        </Alert>
      )}
      <Button
        data-size="sm"
        variant="secondary"
        onClick={() => setShowAlert((value) => !value)}
      >
        {showAlert ? 'Skjul varsel' : 'Handling som fører til varsel'}
      </Button>
    </>
  );
};
WrongLiveRegion.parameters = {
  docs: {
    canvas: {
      sourceState: 'shown',
    },
    source: {
      // Ensure we show the actual code, and not the initially rendered output
      type: 'code',
      transform: formatReactSource,
    },
  },
  customStyles: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-size-2)',
    alignItems: 'start',
  },
};

export const CorrectLiveRegion: StoryFn<typeof Alert> = () => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      {/* Korrekt bruk: role="alert" ligger på elementet der varselet dukker opp */}
      <div role="alert">
        {showAlert && (
          <Alert data-color="warning">
            <Heading
              level={2}
              data-size="xs"
              style={{
                marginBottom: 'var(--ds-size-2)',
              }}
            >
              Vi klarer ikke lagre skjemaet
            </Heading>
            <Paragraph>
              Vi har mistet forbindelsen med serveren og får ikke lagret
              skjemaet. Vent litt og prøv en gang til.
            </Paragraph>
          </Alert>
        )}
      </div>
      <Button
        data-size="sm"
        variant="secondary"
        onClick={() => setShowAlert((value) => !value)}
      >
        {showAlert ? 'Skjul varsel' : 'Handling som fører til varsel'}
      </Button>
    </>
  );
};
CorrectLiveRegion.parameters = WrongLiveRegion.parameters;
