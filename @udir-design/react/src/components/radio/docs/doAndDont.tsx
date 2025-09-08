import { Radio, Divider, Fieldset } from '@udir-design/react/alpha';
import { Do, Dont, Stack } from '.storybook/docs-components';

export const RadioExConversation = () => {
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
      <Radio name="ex-conv-do-group" label="Barnehage" value="barnehage" />
      <Radio name="ex-conv-do-group" label="Grunnskole" value="grunnskole" />
      <Radio
        name="ex-conv-do-group"
        label="Videregående"
        value="videregaende"
      />
    </Fieldset>
  );
};

const ExConversationDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Informasjon ønskes om</Fieldset.Legend>
      <Radio name="ex-conv-dont-group" label="Barnehage" value="barnehage" />
      <Radio name="ex-conv-dont-group" label="Grunnskole" value="grunnskole" />
      <Radio
        name="ex-conv-dont-group"
        label="Videregående"
        value="videregaende"
      />
    </Fieldset>
  );
};

export const RadioExPlacement = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Plasser alternativene vertikalt, slik at listen blir lettere å lese.">
        <ExPlacementDo />
      </Do>
      <Dont description="Du bør unngå å plassere alternativene i flere kolonner.">
        <ExPlacementExDont />
      </Dont>
    </Stack>
  );
};

const ExPlacementDo = () => {
  return (
    <Fieldset
      style={{
        flexDirection: 'column',
      }}
    >
      <Fieldset.Legend>Hva vil du vite mer om?</Fieldset.Legend>
      <Radio name="ex-place-do-group" label="Barnehage" value="barnehage" />
      <Radio name="ex-place-do-group" label="Grunnskole" value="grunnskole" />
      <Radio
        name="ex-place-do-group"
        label="Videregående"
        value="videregaende"
      />
    </Fieldset>
  );
};

const ExPlacementExDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du vite mer om?</Fieldset.Legend>
      <Stack direction="row" gap="var(--ds-size-8)">
        <Radio name="ex-place-dont-group" label="Barnehage" value="barnehage" />
        <Radio
          name="ex-place-dont-group"
          label="Grunnskole"
          value="grunnskole"
        />
        <Radio
          name="ex-place-dont-group"
          label="Videregående"
          value="videregaende"
        />
      </Stack>
    </Fieldset>
  );
};

export const RadioExLogic = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Brukeren skal kunne lese hvert svaralternativ som en logisk respons på forklaringen over boksene.">
        <ExLogicDo />
      </Do>
      <Dont description="Unngå å lage svaralternativer som bryter lesbarheten.">
        <ExLogicDont />
      </Dont>
    </Stack>
  );
};

const ExLogicDo = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du jobbe med?</Fieldset.Legend>
      <Radio name="ex-logic-do-group" label="Utdanning" value="utdanning" />
      <Radio name="ex-logic-do-group" label="Skatt" value="Skatt" />
      <Radio name="ex-logic-do-group" label="Velferd" value="Velferd" />
    </Fieldset>
  );
};

const ExLogicDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva vil du jobbe med?</Fieldset.Legend>
      <Radio
        name="ex-logic-dont-group"
        label="Innenfor utdanning"
        value="utdanning"
      />
      <Radio
        name="ex-logic-dont-group"
        label="Som skattearbeider"
        value="Skatt"
      />
      <Radio
        name="ex-logic-dont-group"
        label="Ønsket mitt har alltid vært velferd"
        value="Velferd"
      />
    </Fieldset>
  );
};

export const RadioExLangStyle = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk en konsekvent språklig stil i alle svaralternativene.">
        <ExLangStyleDo />
      </Do>
      <Dont description="Unngå å blande forskjellige språklige former.">
        <ExLangStyleDont />
      </Dont>
    </Stack>
  );
};

export const ExLangStyleDo = () => {
  return (
    <Stack>
      <Fieldset>
        <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
        <Radio
          name="ex-langStyle-do-group"
          label="Jeg liker å jobbe med selvstendige oppgaver"
          value="selvstendige"
        />
        <Radio
          name="ex-langStyle-do-group"
          label="Jeg elsker møter"
          value="moter"
        />
        <Radio
          name="ex-langStyle-do-group"
          label="Lunsjen er best"
          value="lunsj"
        />
        <Radio
          name="ex-langStyle-do-group"
          label="Jeg liker å møte kolleger"
          value="kolleger"
        />
      </Fieldset>
      <Divider />
      <Fieldset>
        <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
        <Radio
          name="ex-langStyle-do2-group"
          label="Selvstendige oppgaver"
          value="selvstendige"
        />
        <Radio name="ex-langStyle-do2-group" label="Møter" value="moter" />
        <Radio name="ex-langStyle-do2-group" label="Lunsj" value="lunsj" />
        <Radio
          name="ex-langStyle-do2-group"
          label="Kolleger"
          value="kolleger"
        />
      </Fieldset>
    </Stack>
  );
};

const ExLangStyleDont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
      <Radio
        name="ex-langStyle-dont-group"
        label="Selvstendige oppgaver"
        value="selvstendige"
      />
      <Radio name="ex-langStyle-dont-group" label="Møter" value="moter" />
      <Radio
        name="ex-langStyle-dont-group"
        label="Lunsjen er best"
        value="lunsj"
      />
      <Radio
        name="ex-langStyle-dont-group"
        label="Jeg liker å møte kolleger"
        value="kolleger"
      />
    </Fieldset>
  );
};

export const DisabledEx = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk deaktivert Radio.">
        <ExRadioDisabled />
      </Dont>
    </Stack>
  );
};

const ExRadioDisabled = () => {
  return (
    <Radio
      name="ex-radio-disabled"
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
      <Dont description="Unngå skrivebeskyttet Radio.">
        <ExRadioReadOnly />
      </Dont>
    </Stack>
  );
};

const ExRadioReadOnly = () => {
  return (
    <Radio
      name="ex-radio-readonly"
      label="Read only"
      value="readonly"
      description="Description"
      readOnly
    />
  );
};
