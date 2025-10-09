import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Textfield } from 'src/components/textfield/Textfield';
import { Heading } from 'src/components/typography/heading/Heading';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import {
  type FormValues,
  type PageProps,
  focusableFieldsetProps,
} from '../FormDemo';

export const FinishPage = ({ showErrors }: PageProps) => {
  const { register, formState } = useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};
  const contactMethodsRules = { required: 'Velg hvordan vi kan kontakte deg' };
  const isInvalid = !!errors.contactMethods;
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
      <Fieldset id="contactMethods" {...focusableFieldsetProps}>
        <Fieldset.Legend>
          Hvordan ønsker du at vi skal kontakte deg?
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg ett eller flere alternativer
        </Fieldset.Description>
        <Checkbox
          id="contactMethodsEmail"
          label="E-post"
          {...register('contactMethods', contactMethodsRules)}
          aria-invalid={isInvalid}
          value="epost"
        />
        <Checkbox
          id="contactMethodsTelefon"
          label="Telefon"
          {...register('contactMethods', contactMethodsRules)}
          aria-invalid={isInvalid}
          value="telefon"
        />
        <Checkbox
          id="contactMethodsSms"
          label="SMS"
          {...register('contactMethods', contactMethodsRules)}
          aria-invalid={isInvalid}
          value="sms"
        />
        {errors.contactMethods && (
          <ValidationMessage>{errors.contactMethods.message}</ValidationMessage>
        )}
      </Fieldset>
    </>
  );
};
