import { Stack, Dont } from '.storybook/docs/components';
import { Field, Label, Select } from '@udir-design/react/alpha';

type County =
  | 'Akershus'
  | 'Agder'
  | 'Buskerud'
  | 'Finnmark'
  | 'Innlandet'
  | 'Nordland'
  | 'Rogaland';
const counties: County[] = [
  'Akershus',
  'Agder',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Nordland',
  'Rogaland',
];

export const DisabledEx = () => {
  return (
    <Stack>
      <Dont description="Ikke bruk deaktivert Select.">
        <ExSelectDisabled />
      </Dont>
    </Stack>
  );
};

const ExSelectDisabled = () => {
  return (
    <Field>
      <Label>Fylke</Label>
      <Select defaultValue="" id="do-dont-select-disabled" disabled>
        <Select.Option value="">Velg et fylke &hellip;</Select.Option>
        {counties.map((county) => (
          <Select.Option key={county} value={county.toLowerCase()}>
            {county}
          </Select.Option>
        ))}
      </Select>
    </Field>
  );
};

export const ReadOnlyEx = () => {
  return (
    <Stack>
      <Dont description="Unngå skrivebeskyttet Select.">
        <ExSelectReadOnly />
      </Dont>
    </Stack>
  );
};

const ExSelectReadOnly = () => {
  return (
    <Field>
      <Label>Fylke</Label>
      <Select defaultValue="" id="do-dont-select-disabled" readOnly>
        <Select.Option value="">Velg et fylke &hellip;</Select.Option>
        {counties.map((county) => (
          <Select.Option key={county} value={county.toLowerCase()}>
            {county}
          </Select.Option>
        ))}
      </Select>
    </Field>
  );
};
