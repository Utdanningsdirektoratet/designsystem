import { Controller, useFormContext } from 'react-hook-form';
import { counties } from '.storybook/data';
import { Field } from 'src/components/field/Field';
import { FieldNecessity } from 'src/components/fieldNecessity';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Radio } from 'src/components/radio/Radio';
import { ReadMore } from 'src/components/readMore/ReadMore';
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

export const ProjectPage = ({ showErrors, isSubmitSuccessful }: PageProps) => {
  const { register, formState, control } = useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};
  return (
    <>
      <Heading level={2} data-size="sm">
        Prosjektet
      </Heading>
      <FieldNecessity.Summary />
      <Textfield
        id="projectTitle"
        label={<span>Tittel på prosjektet</span>}
        {...register('projectTitle')}
        error={errors.projectTitle?.message}
        readOnly={isSubmitSuccessful}
        required
      />
      <Textfield
        label={<span>Beskrivelse av prosjektet</span>}
        id="projectDescription"
        multiline
        rows={4}
        {...register('projectDescription')}
        error={errors.projectDescription?.message}
        readOnly={isSubmitSuccessful}
        required
      />
      <Fieldset id="projectCategory" {...focusableFieldsetProps}>
        <Fieldset.Legend>
          <span>Kategori</span>
        </Fieldset.Legend>
        <Fieldset.Description>
          Hvilken kategori hører prosjektet til?
        </Fieldset.Description>
        <Radio
          id="radio-learning"
          label={<span>Opplæring</span>}
          value="Learning"
          readOnly={isSubmitSuccessful}
          {...register('projectCategory')}
          required
        />
        <Radio
          id="radio-social"
          label={<span>Sosialt</span>}
          value="social"
          readOnly={isSubmitSuccessful}
          {...register('projectCategory')}
          required
        />
        <Radio
          id="radio-activity"
          label={<span>Aktivitet</span>}
          value="activity"
          readOnly={isSubmitSuccessful}
          {...register('projectCategory')}
          required
        />
        <ReadMore summary="Grunnen til at vi spør om dette">
          Tilskuddsordningen skal dekke et bredt spekter av tilbud. For å ha
          oversikt over fordelingen av budsjettposten trenger vi å vite hvilket
          tilbud det søkes om å utvide.
        </ReadMore>
        {errors.projectCategory && (
          <ValidationMessage>
            {errors.projectCategory.message}
          </ValidationMessage>
        )}
      </Fieldset>
      <Field>
        <Label>
          <span>Gjennomføringssted</span>
        </Label>
        <Field.Description>
          Hvilket fylke vil prosjektet gjennomføres i?
        </Field.Description>
        <Controller
          name="county"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange, ...field } }) => (
            <Suggestion
              {...field}
              selected={value}
              onSelectedChange={(item) => {
                onChange(item?.value);
              }}
            >
              <Suggestion.Input
                aria-invalid={!!errors.county}
                id="county"
                readOnly={isSubmitSuccessful}
                required
              />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Ingen resultater</Suggestion.Empty>
                {counties.map((county) => (
                  <Suggestion.Option key={county} label={county} value={county}>
                    {county}
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
      <Field>
        <Label>
          <span>Aldersgruppe</span>
        </Label>
        <Field.Description>
          Hvilken aldersgruppe er prosjektet rettet mot?
        </Field.Description>
        <Select
          id="ageGroup"
          aria-label="Velg aldersgruppe"
          {...register('ageGroup')}
          aria-invalid={!!errors.ageGroup}
          defaultValue="blank"
          readOnly={isSubmitSuccessful}
          required
        >
          <Select.Option value="blank" disabled>
            Velg aldersgruppe
          </Select.Option>
          <Select.Option value="kindergarten">3-5 år</Select.Option>
          <Select.Option value="kids">6-12 år</Select.Option>
          <Select.Option value="youth">13-15 år</Select.Option>
          <Select.Option value="adult">16-19 år</Select.Option>
        </Select>
        {errors.ageGroup && (
          <ValidationMessage>{errors.ageGroup.message}</ValidationMessage>
        )}
      </Field>
    </>
  );
};
