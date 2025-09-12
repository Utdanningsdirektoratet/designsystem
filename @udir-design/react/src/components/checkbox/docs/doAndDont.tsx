import { Checkbox, Divider, Fieldset, Heading } from '@udir-design/react/alpha';
import { Do, Dont, Stack } from '.storybook/docs-components';

export const CheckboxExConversation = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Formuler spørsmål og svar som en samtale mellom to parter">
        <ExConversationDo />
      </Do>
      <Dont description="Ikke bruk passivt språk">
        <ExConversationDont />
      </Dont>
    </Stack>
  );
};

const ExConversationDo = () => {
  return (
    <Fieldset
      style={{
        flexDirection: 'column',
      }}
    >
      <Fieldset.Legend>Hva vil du vite mer om?</Fieldset.Legend>
      <Checkbox label="Barnehage" value="barnehage" />
      <Checkbox label="Grunnskole" value="grunnskole" />
      <Checkbox label="Videregående" value="videregaende" />
    </Fieldset>
  );
};

const ExConversationDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Informasjon ønskes om</Fieldset.Legend>
      <Checkbox label="Barnehage" value="barnehage" />
      <Checkbox label="Grunnskole" value="grunnskole" />
      <Checkbox label="Videregående" value="videregaende" />
    </Fieldset>
  );
};

export const CheckboxExFilter = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk enkeltord eller korte setninger for forklaring og alternativer">
        <FilterExampleDo />
      </Do>
      <Dont description="Ikke bruk unødvendig lange setninger">
        <FilterExampleDont />
      </Dont>
    </Stack>
  );
};

const FilterExampleDo = () => {
  return (
    <div
      data-size="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-size-6)',
      }}
    >
      <Heading level={3} data-size="xs">
        Filtrer resultater
      </Heading>
      <Fieldset>
        <Fieldset.Legend>Område</Fieldset.Legend>
        <Checkbox label="Barnehage" />
        <Checkbox label="Grunnskole" />
        <Checkbox label="Videregående" />
      </Fieldset>
      <Fieldset>
        <Fieldset.Legend>Læreplan</Fieldset.Legend>
        <Checkbox label="Kunnskapsløftet 2020" />
        <Checkbox label="Kunnskapsløftet 2006" />
      </Fieldset>
    </div>
  );
};

const FilterExampleDont = () => {
  return (
    <div
      data-size="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-size-6)',
      }}
    >
      <Heading level={3} data-size="xs">
        Filtrer resultater
      </Heading>
      <Fieldset>
        <Fieldset.Legend>Hvilke områder er du interessert i?</Fieldset.Legend>
        <Checkbox label="Barnehage" />
        <Checkbox label="Grunnskole" />
        <Checkbox label="Videregående" />
      </Fieldset>
      <Fieldset>
        <Fieldset.Legend>
          Hvilke læreplaner er relevant for deg?
        </Fieldset.Legend>
        <Checkbox label="Kunnskapsløftet 2020" />
        <Checkbox label="Kunnskapsløftet 2006" />
      </Fieldset>
    </div>
  );
};

export const CheckboxEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Plasser alternativene vertikalt, slik at listen blir lettere å lese.">
        <Ex1Do />
      </Do>
      <Dont description="Du bør unngå å plassere alternativene i flere kolonner.">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

const Ex1Do = () => {
  return (
    <Fieldset
      style={{
        flexDirection: 'column',
      }}
    >
      <Fieldset.Legend>Hva vil du vite mer om?</Fieldset.Legend>
      <Checkbox label="Barnehage" value="barnehage" />
      <Checkbox label="Grunnskole" value="grunnskole" />
      <Checkbox label="Videregående" value="videregaende" />
    </Fieldset>
  );
};

const Ex1Dont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du vite mer om?</Fieldset.Legend>
      <Stack direction="row" gap="var(--ds-size-8)">
        <Checkbox label="Barnehage" value="barnehage" />
        <Checkbox label="Grunnskole" value="grunnskole" />
        <Checkbox label="Videregående" value="videregaende" />
      </Stack>
    </Fieldset>
  );
};

export const CheckboxEx2 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Brukeren skal kunne lese hvert svaralternativ som en logisk respons på forklaringen over boksene.">
        <Ex2Do />
      </Do>
      <Dont description="Unngå å lage svaralternativer som bryter lesbarheten.">
        <Ex2Dont />
      </Dont>
    </Stack>
  );
};

const Ex2Do = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du jobbe med?</Fieldset.Legend>
      <Checkbox label="Utdanning" value="utdanning" />
      <Checkbox label="Skatt" value="Skatt" />
      <Checkbox label="Velferd" value="Velferd" />
    </Fieldset>
  );
};

const Ex2Dont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du jobbe med?</Fieldset.Legend>
      <Checkbox label="Innenfor utdanning" value="utdanning" />
      <Checkbox label="Som skattearbeider" value="Skatt" />
      <Checkbox label="Ønsket mitt har alltid vært velferd" value="Velferd" />
    </Fieldset>
  );
};

export const CheckboxEx3 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk en konsekvent språklig stil i alle svaralternativene.">
        <Ex3Do />
      </Do>
      <Dont description="Unngå å blande forskjellige språklige former.">
        <Ex3Dont />
      </Dont>
    </Stack>
  );
};

export const Ex3Do = () => {
  return (
    <Stack>
      <Fieldset>
        <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
        <Checkbox
          label="Jeg liker å jobbe med selvstendige oppgaver"
          value="selvstendige"
        />
        <Checkbox label="Jeg elsker møter" value="moter" />
        <Checkbox label="Lunsjen er best" value="lunsj" />
        <Checkbox label="Jeg liker å møte kolleger" value="kolleger" />
      </Fieldset>
      <Divider />
      <Fieldset>
        <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
        <Checkbox label="Selvstendige oppgaver" value="selvstendige" />
        <Checkbox label="Møter" value="moter" />
        <Checkbox label="Lunsj" value="lunsj" />
        <Checkbox label="Kolleger" value="kolleger" />
      </Fieldset>
    </Stack>
  );
};

const Ex3Dont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
      <Checkbox label="Selvstendige oppgaver" value="selvstendige" />
      <Checkbox label="Møter" value="moter" />
      <Checkbox label="Lunsjen er best" value="lunsj" />
      <Checkbox label="Jeg liker å møte kolleger" value="kolleger" />
    </Fieldset>
  );
};

export const DisabledEx = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk deaktivert Checkbox.">
        <ExCheckboxDisabled />
      </Dont>
    </Stack>
  );
};

const ExCheckboxDisabled = () => {
  return (
    <Checkbox
      name="ex-checkbox-disabled-group"
      label="Disabled"
      value="disabled"
      description="Description"
      disabled
    />
  );
};

export const ReadOnlyEx = () => {
  return (
    <Stack>
      <Dont description="Unngå skrivebeskyttet Checkbox.">
        <ExCheckboxReadOnly />
      </Dont>
    </Stack>
  );
};

const ExCheckboxReadOnly = () => {
  return (
    <Checkbox
      name="ex-checkbox-readonly-group"
      label="Read only"
      value="readonly"
      description="Description"
      readOnly
    />
  );
};
