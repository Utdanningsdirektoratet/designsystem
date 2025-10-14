import { Dont, Stack } from '.storybook/docs/components';
import { Textfield } from '../Textfield';

export const DisabledEx = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk deaktivert Textfield.">
        <ExSwitchDisabled />
      </Dont>
    </Stack>
  );
};

const ExSwitchDisabled = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-2) 0' }}>
      <Textfield id="textfield-disabled" label="Disabled Textfield" disabled />
      <Textfield
        id="multiline-textfield-disabled"
        label="Disabled multiline Textfield"
        multiline
        rows={4}
        disabled
      />
    </Stack>
  );
};

export const ReadOnlyEx = () => {
  return (
    <Stack>
      <Dont description="Unngå skrivebeskyttet Textfield.">
        <ExSwitchReadOnly />
      </Dont>
    </Stack>
  );
};

const ExSwitchReadOnly = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-2) 0' }}>
      <Textfield id="textfield-readonly" label="ReadOnly Textfield" readOnly />
      <Textfield
        id="multiline-textfield-readonly"
        label="ReadOnly multiline Textfield"
        multiline
        rows={4}
        readOnly
      />
    </Stack>
  );
};
