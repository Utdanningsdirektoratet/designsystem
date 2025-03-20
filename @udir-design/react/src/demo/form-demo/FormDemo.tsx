import { HTMLAttributes, useRef } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  ErrorSummary,
  Field,
  Fieldset,
  Heading,
  Input,
  Label,
  Radio,
  Select,
  Suggestion,
  Textfield,
  useCheckboxGroup,
  useRadioGroup,
  ValidationMessage,
} from '../../alpha';
import classes from './FormDemo.module.css';
import cl from 'clsx/lite';
import { useForm, Controller } from 'react-hook-form';

type FormDemo = HTMLAttributes<HTMLDivElement>;

type FormValues = {
  kortBeskrivelse: string;
  previewText: string;
  multiline: string;
  education: string;
  destination: string;
  favoriteIceCream: string;
  contactMethods: string[];
};

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
];

export const FormDemo = ({ ...props }: FormDemo) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      kortBeskrivelse: '',
      previewText: '',
      multiline: '',
      education: 'blank',
      destination: '',
      favoriteIceCream: 'vanilje',
      contactMethods: ['epost'],
    },
  });

  const { ...radio } = useRadioGroup({
    name: 'radio-group',
    value: 'vanilje',
    error: errors.favoriteIceCream?.message,
  });
  const { ...checkbox } = useCheckboxGroup({
    name: 'checkbox-group',
    value: ['epost'],
    error: errors.contactMethods?.message,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    dialogRef.current?.close();
    reset();
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div {...props} className={cl(classes.card, classes.container)}>
      <Heading level={1} data-size="md">
        Skjema
      </Heading>
      <form className={classes.components} onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Fieldset.Legend>Legend</Fieldset.Legend>
          <Fieldset.Description>Description</Fieldset.Description>
          <Field data-my-field>
            <Label>Kort beskrivelse</Label>
            <Field.Description>Beskrivelse</Field.Description>
            <Input
              {...register('kortBeskrivelse', {
                required: 'Dette feltet er påkrevd',
              })}
            />
            {errors.kortBeskrivelse && (
              <ValidationMessage>
                {errors.kortBeskrivelse.message}
              </ValidationMessage>
            )}
          </Field>
          <Textfield
            counter={0}
            description=""
            id="textfield-preview"
            label="Label"
            {...register('previewText', {
              required: 'Dette feltet er påkrevd',
            })}
            error={errors.previewText?.message}
          />
          <Textfield
            id="textfield-rows"
            label="Label"
            multiline
            rows={4}
            {...register('multiline', {
              required: 'Dette feltet er påkrevd',
            })}
            error={errors.multiline?.message}
          />
        </Fieldset>
        <Field>
          <Label>Velg utdanningsnivå</Label>
          <Select
            aria-label="Velg utdanningsnivå"
            {...register('education', {
              validate: (value) =>
                value !== 'blank' || 'Vennligst velg et utdanningsnivå',
            })}
          >
            <Select.Option value="blank">Alle nivåer</Select.Option>
            <Select.Option value="Barneskole">Barneskole</Select.Option>
            <Select.Option value="Ungdomsskole">Ungdomsskole</Select.Option>
            <Select.Option value="Videregående skole">
              Videregående skole
            </Select.Option>
          </Select>
          {errors.education && (
            <ValidationMessage>{errors.education.message}</ValidationMessage>
          )}
        </Field>
        <Fieldset>
          <Fieldset.Legend>Hvilken iskremsmak er best?</Fieldset.Legend>
          <Fieldset.Description>
            Velg din favorittsmak blant alternativene.
          </Fieldset.Description>
          <Controller
            name="favoriteIceCream"
            control={control}
            rules={{ required: 'Vennligst velg en smak' }}
            render={({ field }) => (
              <>
                <Radio
                  label="Vanilje"
                  {...radio.getRadioProps({ ...field, value: 'vanilje' })}
                />
                <Radio
                  label="Jordbær"
                  description="Jordbær er best"
                  {...radio.getRadioProps('jordbær')}
                />
                <Radio
                  label="Sjokolade"
                  {...radio.getRadioProps({ ...field, value: 'sjokolade' })}
                />
                <Radio
                  label="Jeg spiser ikke iskrem"
                  {...radio.getRadioProps({
                    ...field,
                    value: 'spiser-ikke-is',
                  })}
                />
              </>
            )}
          />
          <ValidationMessage {...radio.validationMessageProps} />
        </Fieldset>
        <Field>
          <Label>Velg en destinasjon</Label>
          <Controller
            name="destination"
            control={control}
            rules={{ required: 'Vennligst velg en destinasjon' }}
            render={({ field }) => (
              <Suggestion>
                <Suggestion.Input {...field} />
                <Suggestion.Clear />
                <Suggestion.List>
                  <Suggestion.Empty>Tomt</Suggestion.Empty>
                  {DATA_PLACES.map((place) => (
                    <Suggestion.Option key={place} value={place}>
                      {place}
                      <div>Kommune</div>
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            )}
          />
          {errors.destination && (
            <ValidationMessage>{errors.destination.message}</ValidationMessage>
          )}
        </Field>
        <Fieldset>
          <Fieldset.Legend>
            Hvordan vil du helst at vi skal kontakte deg?
          </Fieldset.Legend>
          <Fieldset.Description>
            Velg alle alternativene som er relevante for deg.
          </Fieldset.Description>
          <Controller
            name="contactMethods"
            control={control}
            rules={{ required: 'Vennligst velg minst ett alternativ' }}
            render={({ field }) => (
              <>
                <Checkbox
                  label="E-post"
                  {...checkbox.getCheckboxProps({ ...field, value: 'epost' })}
                />
                <Checkbox
                  label="Telefon"
                  {...checkbox.getCheckboxProps({ ...field, value: 'telefon' })}
                />
                <Checkbox
                  label="SMS"
                  {...checkbox.getCheckboxProps({ ...field, value: 'sms' })}
                />
              </>
            )}
          />
          <ValidationMessage {...checkbox.validationMessageProps} />
        </Fieldset>
        {Object.keys(errors).length > 0 && (
          <ErrorSummary>
            <ErrorSummary.Heading>
              For å gå videre må du rette opp følgende feil:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {Object.entries(errors).map(([fieldName, error]) => (
                <ErrorSummary.Item key={fieldName}>
                  <ErrorSummary.Link href={`#${fieldName}`}>
                    {error?.message}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              ))}
            </ErrorSummary.List>
          </ErrorSummary>
        )}
        <Button onClick={handleSubmit(() => dialogRef.current?.showModal())}>
          Send
        </Button>
        <Dialog ref={dialogRef}>
          <Dialog.Block>
            <Heading data-size="xs">Er du sikker på at du vil levere?</Heading>
          </Dialog.Block>
          <Dialog.Block className={classes.dialogActions}>
            <Button type="submit">Send inn skjema</Button>
            <Button
              onClick={() => dialogRef.current?.close()}
              variant="secondary"
            >
              Avbryt
            </Button>
          </Dialog.Block>
        </Dialog>
      </form>
    </div>
  );
};
