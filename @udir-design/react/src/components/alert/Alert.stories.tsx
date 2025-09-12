import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button, Heading, Link, Paragraph } from '@udir-design/react/alpha';
import { Alert } from './';
import { within, expect } from 'storybook/test';
import { useState } from 'react';
import { formatReactSource } from '.storybook/utils/sourceTransformers';

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['beta'],
};

export default meta;

export const Preview: Story = {
  args: {
    'data-color': 'info',
  },
  render: (args) => (
    <Alert data-testid="alert-preview" {...args}>
      <Alert.Heading level={3}>Overskrift</Alert.Heading>
      En beskjed det er viktig at brukeren ser
    </Alert>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByTestId('alert-preview');
    await step('Alert is rendered ', async () => {
      await expect(alert).toBeTruthy();
    });
    await step('Alert has correct color', async () => {
      await expect(alert).toHaveAttribute('data-color', 'info');
    });
    await step('Alert has correct text', async () => {
      await expect(alert).toHaveTextContent(
        'En beskjed det er viktig at brukeren ser',
      );
    });
  },
};

export const VariantInfo: Story = {
  args: {
    'data-color': 'info',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>
        Har du husket å melde deg på privatisteksamen?
      </Alert.Heading>
      Du må melde deg på innen 1. februar for våreksamen.
    </Alert>
  ),
};

export const VariantSuccess: Story = {
  args: {
    'data-color': 'success',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Du har levert søknaden din!</Alert.Heading>
      Vi har mottatt søknaden din, og vil behandle den i løpet av få dager.
    </Alert>
  ),
};

export const VariantWarning: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Vi har tekniske problemer</Alert.Heading>
      Det gjør at du kan bli avbrutt mens du fyller ut skjemaet. Vi jobber med å
      rette problemene.
    </Alert>
  ),
};

export const VariantDanger: Story = {
  args: {
    'data-color': 'danger',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Det har skjedd en feil</Alert.Heading>
      Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen
      litt senere. Hvis vi fortsatt ikke klarer å vise informasjonen du trenger,
      tar du kontakt med kundeservice på telefon 85 44 32 66.
    </Alert>
  ),
};

export const NoHeading: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>Du har 7 dager igjen på å fullføre søknaden.</Alert>
  ),
};

export const WithLink: Story = {
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Søknadsfristen går ut om 3 dager</Alert.Heading>
      Fristen for å søke opptak til utdanning er 15. april.{' '}
      <Link href="https://udir.no/">Søk nå</Link>
    </Alert>
  ),
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
          <Heading level={2}>Vi klarer ikke lagre skjemaet</Heading>
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
            <Alert.Heading level={2}>
              Vi klarer ikke lagre skjemaet
            </Alert.Heading>
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
