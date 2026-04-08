import { useState } from 'react';
import preview from '.storybook/preview';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { Button } from '../button/Button';
import { Link } from '../link/Link';
import { Alert } from './';

const meta = preview.meta({
  component: Alert,
  subcomponents: {
    'Alert.Heading': Alert.Heading,
  },
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: { originator: 'digdir' },
  },
});

export const Preview = meta.story({
  args: {
    'data-color': 'info',
    'data-size': 'md',
  },
  render: (args) => (
    <Alert data-testid="alert-preview" {...args}>
      <Alert.Heading level={3}>Overskrift</Alert.Heading>
      En beskjed det er viktig at brukeren ser
    </Alert>
  ),
});

export const VariantInfo = meta.story({
  args: {
    'data-color': 'info',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>
        Har du husket å melde deg opp til privatisteksamen?
      </Alert.Heading>
      Du må melde deg opp innen 1. februar.
    </Alert>
  ),
});

export const VariantSuccess = meta.story({
  args: {
    'data-color': 'success',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Du har levert søknaden din!</Alert.Heading>
      Vi har mottatt søknaden din, og vil behandle den i løpet av få dager.
    </Alert>
  ),
});

export const VariantWarning = meta.story({
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
});

export const VariantDanger = meta.story({
  args: {
    'data-color': 'danger',
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Heading level={2}>Det har skjedd en feil</Alert.Heading>
      Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen
      litt senere. <br />
      Ta kontakt med kundeservice på telefon 85 44 32 66 hvis problemet
      vedvarer.
    </Alert>
  ),
});

export const NoHeading = meta.story({
  args: {
    'data-color': 'warning',
  },
  render: (args) => (
    <Alert {...args}>Du har 7 dager igjen på å fullføre søknaden.</Alert>
  ),
});

export const WithLink = meta.story({
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
});

export const WrongLiveRegion = meta.story({
  parameters: {
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
  },
  render: () => {
    const [showAlert, setShowAlert] = useState(false);
    return (
      <>
        {showAlert && (
          <Alert
            data-color="warning"
            // Feil bruk: role="alert" ligger på selve varselet
            role="alert"
          >
            Vi klarer ikke lagre skjemaet
          </Alert>
        )}
        <Button onClick={() => setShowAlert((value) => !value)}>
          {showAlert ? 'Skjul varsel' : 'Handling som fører til varsel'}
        </Button>
      </>
    );
  },
});

// Can't use WrongLiveRegion.extend because then the code example doesn't show up
export const CorrectLiveRegion = meta.story({
  ...WrongLiveRegion.input,
  render: () => {
    const [showAlert, setShowAlert] = useState(false);
    return (
      <>
        {/* Korrekt bruk: role="alert" ligger på elementet der varselet dukker opp */}
        <div role="alert">
          {showAlert && (
            <Alert data-color="warning">Vi klarer ikke lagre skjemaet</Alert>
          )}
        </div>
        <Button onClick={() => setShowAlert((value) => !value)}>
          {showAlert ? 'Skjul varsel' : 'Handling som fører til varsel'}
        </Button>
      </>
    );
  },
});
