import {
  Field,
  Fieldset,
  Heading,
  Input,
  Label,
  Radio,
  Select,
  Suggestion,
  Textfield,
  ValidationMessage,
} from '@udir-design/react/alpha';
import { Controller, useFormContext } from 'react-hook-form';
import {
  focusableFieldsetProps,
  type FormValues,
  type PageProps,
} from '../FormDemo';

const DATA_COUNTIES = [
  'Oslo',
  'Viken',
  'Innlandet',
  'Vestfold og Telemark',
  'Agder',
  'Rogaland',
  'Vestland',
  'Møre og Romsdal',
  'Trøndelag',
  'Nordland',
  'Troms og Finnmark',
];

export const PersonalInfoPage = ({ showErrors }: PageProps) => {
  const { register, control, formState } = useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};

  const educationLevelRules = { required: 'Velg et utdanningsnivå' };
  return (
    <>
      <Heading level={2} data-size="sm">
        Personinformasjon
      </Heading>
      <Textfield
        id="firstName"
        label="Fornavn"
        {...register('firstName', {
          required: 'Fyll ut fornavn',
        })}
        error={errors.firstName?.message}
      />
      <Field>
        <Label>Etternavn</Label>
        <Input
          id="lastName"
          {...register('lastName', {
            required: 'Fyll ut etternavn',
          })}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && (
          <ValidationMessage>{errors.lastName.message}</ValidationMessage>
        )}
      </Field>
      <Field>
        <Label>Fylke</Label>
        <Controller
          name="county"
          control={control}
          rules={{ required: 'Velg et fylke' }}
          defaultValue=""
          render={({ field: { value, onChange, name: __name, ...field } }) => (
            <Suggestion
              {...field}
              selected={value}
              onSelectedChange={(v) => {
                onChange(v.at(0)?.value);
              }}
            >
              <Suggestion.Input aria-invalid={!!errors.county} id="county" />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Ingen resultater</Suggestion.Empty>
                {DATA_COUNTIES.map((county) => (
                  <Suggestion.Option key={county} label={county} value={county}>
                    {county}
                    <div>Fylke</div>
                  </Suggestion.Option>
                ))}
              </Suggestion.List>
            </Suggestion>
          )}
        />
        {errors.county && (
          <ValidationMessage>{errors.county.message}</ValidationMessage>
        )}
      </Field>
      <Fieldset id="educationLevel" {...focusableFieldsetProps}>
        <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
        <Radio
          id="radio-kindergarten"
          label="Barnehage"
          value="kindergarten"
          {...register('educationLevel', educationLevelRules)}
        />
        <Radio
          id="radio-primary"
          label="Grunnskole"
          value="primary"
          {...register('educationLevel', educationLevelRules)}
        />
        <Radio
          id="radio-secondary"
          label="Videregående"
          value="secondary"
          {...register('educationLevel', educationLevelRules)}
        />
        <Radio
          id="radio-higher"
          label="Høyere utdanning"
          value="higher"
          {...register('educationLevel', educationLevelRules)}
        />
        {errors.educationLevel && (
          <ValidationMessage>{errors.educationLevel.message}</ValidationMessage>
        )}
      </Fieldset>
      <Field>
        <Label>Aldersgruppe</Label>
        <Select
          id="ageGroup"
          aria-label="Velg aldersgruppe"
          {...register('ageGroup', {
            validate: (value) => value !== 'blank' || 'Velg en aldersgruppe',
          })}
          aria-invalid={!!errors.ageGroup}
          defaultValue="blank"
        >
          <Select.Option value="blank" disabled>
            Velg aldersgruppe
          </Select.Option>
          <Select.Option value="kindergarten">3-5 år</Select.Option>
          <Select.Option value="kids">6-12 år</Select.Option>
          <Select.Option value="youth">13-20 år</Select.Option>
          <Select.Option value="adult">21 år og eldre</Select.Option>
        </Select>
        {errors.ageGroup && (
          <ValidationMessage>{errors.ageGroup.message}</ValidationMessage>
        )}
      </Field>
    </>
  );
};
