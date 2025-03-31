import { Checkbox, Fieldset } from '@udir-design/react/alpha';
import { Do, Dont, Stack } from '../../../../.storybook/docs-components';

export const CheckboxEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Plasser checkboxes vertikalt, slik at listen blir lettere å lese.">
        <Ex1Do />
      </Do>
      <Dont description="Du bør unngå å plassere checkboxes i flere kolonner.">
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
      <Fieldset.Legend>
        Skal du reise til noen av disse landene?
      </Fieldset.Legend>
      <Checkbox label="Kroatia" value="kroatia" />
      <Checkbox label="Slovakia" value="slovakia" />
      <Checkbox label="Hobsyssel" value="hobsyssel" />
    </Fieldset>
  );
};

const Ex1Dont = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>
        Skal du reise til noen av disse landene?
      </Fieldset.Legend>
      <Stack direction="row" gap="var(--ds-size-8)">
        <Checkbox label="Kroatia" value="kroatia" />
        <Checkbox label="Slovakia" value="slovakia" />
        <Checkbox label="Hobsyssel" value="hobsyssel" />
      </Stack>
    </Fieldset>
  );
};
