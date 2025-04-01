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
  useRadioGroup,
  ValidationMessage,
} from '@udir-design/react/alpha';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { FormValues } from '../FormDemo';

type PersonalInfoPageProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, unknown>;
  educationLevel: string | undefined;
  setEducationLevel: (value: string) => void;
};

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

export const PersonalInfoPage = ({
  register,
  errors,
  control,
  educationLevel,
  setEducationLevel,
}: PersonalInfoPageProps) => {
  const { ...radio } = useRadioGroup({
    name: 'radio-group',
    error: errors.educationLevel?.message,
    onChange: (value) => setEducationLevel(value),
    value: educationLevel,
  });
  return (
    <>
      <Heading level={2} data-size="sm">
        Personinformasjon
      </Heading>
      <Textfield
        id="textfield-firstName"
        label="Fornavn"
        {...register('firstName', {
          required: 'Fyll ut fornavn',
        })}
        error={errors.firstName?.message}
      />
      <Field>
        <Label>Etternavn</Label>
        <Input
          id="input-lastName"
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
          render={({ field }) => (
            <Suggestion>
              <Suggestion.Input
                id="suggestion-county"
                {...field}
                aria-invalid={!!errors.county}
              />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Ingen resultater</Suggestion.Empty>
                {DATA_COUNTIES.map((county) => (
                  <Suggestion.Option key={county} value={county}>
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
      <Fieldset>
        <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
        <Controller
          name="educationLevel"
          control={control}
          rules={{ required: 'Velg et utdanningsnivå' }}
          render={({ field }) => (
            <>
              <Radio
                id="radio-kindergarten"
                label="Barnehage"
                {...radio.getRadioProps({
                  ...field,
                  value: 'kindergarten',
                })}
              />
              <Radio
                id="radio-primary"
                label="Grunnskole"
                {...radio.getRadioProps({ ...field, value: 'primary' })}
              />
              <Radio
                id="radio-secondary"
                label="Videregående"
                {...radio.getRadioProps({ ...field, value: 'secondary' })}
              />
              <Radio
                id="radio-higher"
                label="Høyere utdanning"
                {...radio.getRadioProps({
                  ...field,
                  value: 'higher',
                })}
              />
            </>
          )}
        />
        <ValidationMessage {...radio.validationMessageProps} />
      </Fieldset>
      <Field>
        <Label>Aldersgruppe</Label>
        <Select
          id="select-ageGroup"
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
