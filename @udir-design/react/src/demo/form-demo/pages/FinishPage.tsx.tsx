import {
  Checkbox,
  Fieldset,
  Heading,
  Textfield,
  useCheckboxGroup,
  ValidationMessage,
} from '@udir-design/react/alpha';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { FormValues } from '../FormDemo';

type FinishPageProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, unknown>;
  contactMethods: string[];
  setContactMethods: (value: string[]) => void;
};

export const FinishPage = ({
  register,
  errors,
  control,
  contactMethods,
  setContactMethods,
}: FinishPageProps) => {
  const { ...checkbox } = useCheckboxGroup({
    name: 'checkbox-group',
    error: errors.contactMethods?.message,
    value: contactMethods,
    onChange: setContactMethods,
  });
  return (
    <>
      <Heading level={2} data-size="sm">
        Avslutning
      </Heading>
      <Textfield
        id="addition"
        label="Har du noe annet du ønsker å nevne?"
        multiline
        rows={4}
        {...register('addition')}
      />
      <Fieldset id="contactMethods">
        <Fieldset.Legend>
          Hvordan ønsker du at vi skal kontakte deg?
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg ett eller flere alternativer
        </Fieldset.Description>
        <Controller
          name="contactMethods"
          control={control}
          rules={{ required: 'Velg hvordan vi kan kontakte deg' }}
          render={({ field }) => (
            <>
              <Checkbox
                label="E-post"
                {...checkbox.getCheckboxProps({
                  ...field,
                  value: 'epost',
                })}
              />
              <Checkbox
                label="Telefon"
                {...checkbox.getCheckboxProps({
                  ...field,
                  value: 'telefon',
                })}
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
    </>
  );
};
