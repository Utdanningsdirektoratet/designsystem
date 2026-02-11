import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Field } from 'src/components/field/Field';
import { FieldNecessity } from 'src/components/fieldNecessity';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Input } from 'src/components/input/Input';
import { Textfield } from 'src/components/textfield/Textfield';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import {
  type FormValues,
  type PageProps,
  focusableFieldsetProps,
} from '../FormDemo';

export const PersonalInfoPage = ({
  showErrors,
  isSubmitSuccessful,
}: PageProps) => {
  const { register, formState } = useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};
  const isInvalid = !!errors.contactMethods;
  return (
    <>
      <Heading level={2} data-size="sm">
        Kontaktinfo
      </Heading>
      <FieldNecessity.Summary />
      <Textfield
        id="firstName"
        label={<span>Fornavn</span>}
        {...register('firstName')}
        autoComplete="given-name"
        error={errors.firstName?.message}
        readOnly={isSubmitSuccessful}
        required
      />
      <Field>
        <Label>
          <span>Etternavn</span>
        </Label>
        <Input
          id="lastName"
          {...register('lastName')}
          required
          autoComplete="family-name"
          aria-invalid={!!errors.lastName}
          readOnly={isSubmitSuccessful}
        />
        {errors.lastName && (
          <ValidationMessage>{errors.lastName.message}</ValidationMessage>
        )}
      </Field>
      <Fieldset id="contactMethods" {...focusableFieldsetProps}>
        <Fieldset.Legend>
          <span>Hvordan ønsker du at vi skal kontakte deg?</span>
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg ett eller flere alternativer
        </Fieldset.Description>
        <Checkbox
          id="contactMethodsEmail"
          label={<span>E-post</span>}
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="epost"
          required
        />
        <Checkbox
          id="contactMethodsTelefon"
          label={<span>Telefon</span>}
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="telefon"
          required
        />
        <Checkbox
          id="contactMethodsSms"
          label={<span>SMS</span>}
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="sms"
          required
        />
        {errors.contactMethods && (
          <ValidationMessage>{errors.contactMethods.message}</ValidationMessage>
        )}
      </Fieldset>
    </>
  );
};
