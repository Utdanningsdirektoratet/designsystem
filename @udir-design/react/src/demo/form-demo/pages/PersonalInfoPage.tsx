import { Controller, useFormContext } from 'react-hook-form';
import { Field } from 'src/components/field/Field';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Input } from 'src/components/input/Input';
import { Radio } from 'src/components/radio/Radio';
import { Select } from 'src/components/select/Select';
import { Suggestion } from 'src/components/suggestion/Suggestion';
import { Textfield } from 'src/components/textfield/Textfield';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import {
  type FormValues,
  type PageProps,
  focusableFieldsetProps,
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
        autoComplete="given-name"
        error={errors.firstName?.message}
      />
      <Field>
        <Label>Etternavn</Label>
        <Input
          id="lastName"
          {...register('lastName', {
            required: 'Fyll ut etternavn',
          })}
          autoComplete="family-name"
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
          render={({ field: { value, onChange, ...field } }) => (
            <Suggestion
              {...field}
              selected={value}
              onSelectedChange={(item) => {
                onChange(item?.value);
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
