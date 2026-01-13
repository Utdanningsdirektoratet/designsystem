import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Field } from 'src/components/field/Field';
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
      <Textfield
        id="firstName"
        label="Fornavn"
        {...register('firstName')}
        autoComplete="given-name"
        error={errors.firstName?.message}
        readOnly={isSubmitSuccessful}
      />
      <Field>
        <Label>Etternavn</Label>
        <Input
          id="lastName"
          {...register('lastName')}
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
          Hvordan ønsker du at vi skal kontakte deg?
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg ett eller flere alternativer
        </Fieldset.Description>
        <Checkbox
          id="contactMethodsEmail"
          label="E-post"
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="epost"
        />
        <Checkbox
          id="contactMethodsTelefon"
          label="Telefon"
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="telefon"
        />
        <Checkbox
          id="contactMethodsSms"
          label="SMS"
          {...register('contactMethods')}
          aria-invalid={isInvalid}
          readOnly={isSubmitSuccessful}
          value="sms"
        />
        {errors.contactMethods && (
          <ValidationMessage>{errors.contactMethods.message}</ValidationMessage>
        )}
      </Fieldset>
    </>
  );
};
