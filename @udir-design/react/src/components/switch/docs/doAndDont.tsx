import { Button, Heading } from '@digdir/designsystemet-react';
import { Do, Dont, Stack } from '.storybook/docs/components';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Switch } from '../Switch';

export const SwitchExLabel = () => {
  return (
    <Stack>
      <Do description="Label forklarer konteksten og switchen forteller statusen">
        <ExLabelDo />
      </Do>
      <Dont description="Om label inneholder statusen kan det være vrient å skjønne hva som er av og på.">
        <ExLabelDont />
      </Dont>
    </Stack>
  );
};

const ExLabelDo = () => {
  return <Switch label="Mørk modus" value="dark" />;
};

const ExLabelDont = () => {
  return <Switch label="Skru på mørk modus" value="dark" />;
};

export const SwitchExCheckbox = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk switch for å velge flere alternativer.">
        <ExSwitchDont />
      </Dont>
    </Stack>
  );
};

const ExSwitchDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>
        Hvordan ønsker du at vi skal kontakte deg?
      </Fieldset.Legend>
      <Switch label="E-post" />
      <Switch label="Telefon" />
      <Switch label="SMS" />
    </Fieldset>
  );
};

export const SwitchExSaving = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk switch for innstillinger som krever bekreftelse eller lagring.">
        <ExSwitchSavingDont />
      </Dont>
    </Stack>
  );
};

const ExSwitchSavingDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>
        <Heading level={3}>Profilinnstillinger</Heading>
      </Fieldset.Legend>
      <Switch label="Privat profil" />
      <Switch label="Skjul profilbilde" />
      <Button style={{ marginTop: 'var(--ds-size-8)' }} variant="primary">
        Lagre endringer
      </Button>
    </Fieldset>
  );
};

export const DisabledEx = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk deaktivert Switch.">
        <ExSwitchDisabled />
      </Dont>
    </Stack>
  );
};

const ExSwitchDisabled = () => {
  return <Switch label="Mørk modus" value="dark" disabled />;
};

export const ReadOnlyEx = () => {
  return (
    <Stack>
      <Dont description="Unngå skrivebeskyttet Switch.">
        <ExSwitchReadOnly />
      </Dont>
    </Stack>
  );
};

const ExSwitchReadOnly = () => {
  return <Switch label="Mørk modus" value="dark" readOnly />;
};
