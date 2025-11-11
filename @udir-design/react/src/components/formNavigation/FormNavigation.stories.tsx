import { ErrorSummary, Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import {
  BriefcaseIcon,
  BulletListIcon,
  CheckmarkCircleIcon,
  ClipboardIcon,
  InformationSquareIcon,
  PaperplaneIcon,
  PersonIcon,
  SealCheckmarkIcon,
  UploadIcon,
} from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { useFormNavigation } from '../../utilities/hooks/useFormNavigation/useFormNavigation';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import classes from './formNavigation.stories.module.css';
import { FormNavigation } from '.';

const meta: Meta<typeof FormNavigation> = {
  component: FormNavigation,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
    },
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof FormNavigation>;

export const Preview: Story = {
  args: {},
  render(args) {
    const { getStepProps } = useFormNavigation({ value: 'infoside' });
    return (
      <FormNavigation {...args}>
        <FormNavigation.Step {...getStepProps('infoside')}>
          <InformationSquareIcon aria-hidden />
          Infoside
        </FormNavigation.Step>
        <FormNavigation.Group title="Navigasjonsgruppe">
          <FormNavigation.Group.Step {...getStepProps('step 1')}>
            Steg 1
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step 2')}>
            Steg 2
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
};

export const Grouping: Story = {
  args: {},
  render(args) {
    const { getStepProps } = useFormNavigation({ value: 'step 1' });
    return (
      <FormNavigation {...args}>
        <FormNavigation.Group title="Navigasjonsgruppe">
          <FormNavigation.Group.Step {...getStepProps('step 1')}>
            Steg 1
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step 2')}>
            Steg 2
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
};

export const SingleStep: Story = {
  args: {},
  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Step>
        <InformationSquareIcon aria-hidden />
        Infoside
      </FormNavigation.Step>
    </FormNavigation>
  ),
};

export const States: Story = {
  args: {},

  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Step>
        <InformationSquareIcon aria-hidden />
        Infoside
      </FormNavigation.Step>
      <FormNavigation.Step state="completed">
        <BriefcaseIcon aria-hidden />
        Skjemaside 1
      </FormNavigation.Step>
      <FormNavigation.Step state="invalid">
        <UploadIcon aria-hidden />
        Skjemaside 2
      </FormNavigation.Step>
      <FormNavigation.Group title="Seksjon 1" state="completed">
        <FormNavigation.Group.Step state="completed">
          Steg 1
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="completed">
          Steg 2
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="completed">
          Steg 3
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="completed">
          Steg 4
        </FormNavigation.Group.Step>
      </FormNavigation.Group>
      <FormNavigation.Group title="Seksjon 2" state="invalid">
        <FormNavigation.Group.Step state="completed">
          Steg 1
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="invalid">
          Steg 2
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="invalid">
          Steg 3
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="invalid">
          Steg 4
        </FormNavigation.Group.Step>
      </FormNavigation.Group>
      <FormNavigation.Group title="Seksjon 3">
        <FormNavigation.Group.Step state="completed">
          Steg 1
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step state="active">
          Steg 2
        </FormNavigation.Group.Step>
        <FormNavigation.Group.Step>Steg 3</FormNavigation.Group.Step>
        <FormNavigation.Group.Step>Steg 4</FormNavigation.Group.Step>
      </FormNavigation.Group>
      <FormNavigation.Step>
        <PaperplaneIcon aria-hidden />
        Innsending
      </FormNavigation.Step>
      <FormNavigation.Step>
        <SealCheckmarkIcon aria-hidden />
        Bekreftelse
      </FormNavigation.Step>
    </FormNavigation>
  ),
};

export type FormValues = {
  firstName: string;
  lastName: string;
};

export const SimpleNavigation: Story = {
  args: { className: classes.navigation },
  render(args) {
    const {
      getStepProps,
      deriveNavigationState,
      id,
      reset,
      setId,
      next,
      prev,
      hasNext,
      hasPrev,
    } = useFormNavigation({
      value: 'fornavn',
    });

    const methods = useForm<FormValues>({
      mode: 'onChange',
      shouldFocusError: false,
      shouldUnregister: false,
      defaultValues: {
        firstName: '',
        lastName: '',
      },
    });
    const {
      register,
      handleSubmit,
      reset: resetForm,
      formState: { errors },
    } = methods;

    const onSubmit = () => {
      resetForm();
      setId('fornavn');
      reset();
    };

    return (
      <FormProvider {...methods}>
        <div className={classes.page}>
          <FormNavigation {...args}>
            <FormNavigation.Group
              title="Personopplysninger"
              state={deriveNavigationState(['fornavn', 'etternavn'])}
            >
              <FormNavigation.Group.Step {...getStepProps('fornavn')}>
                Fornavn
              </FormNavigation.Group.Step>
              <FormNavigation.Group.Step {...getStepProps('etternavn')}>
                Etternavn
              </FormNavigation.Group.Step>
              <FormNavigation.Group.Step {...getStepProps('submit')}>
                Innsending
              </FormNavigation.Group.Step>
            </FormNavigation.Group>
          </FormNavigation>
          <div className={classes.container}>
            <Heading level={2} data-size="sm">
              {id === 'submit' ? 'Innsending' : 'Utfylling'}
            </Heading>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              {id === 'fornavn' && (
                <Textfield
                  id="firstName"
                  label="Fornavn"
                  {...register('firstName', {
                    required: 'Fyll ut fornavn',
                  })}
                  error={errors.firstName?.message}
                />
              )}
              {id === 'etternavn' && (
                <Textfield
                  id="lastName"
                  label="Etternavn"
                  {...register('lastName', {
                    required: 'Fyll ut etternavn',
                  })}
                  error={errors.lastName?.message}
                  autoFocus
                />
              )}
              {id === 'submit' && (
                <Paragraph>Trykk på knappen for å sende inn skjema.</Paragraph>
              )}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--ds-size-2)',
                  width: '100%',
                }}
              >
                {hasPrev() && (
                  <Button
                    variant="secondary"
                    onClick={prev}
                    style={{ flex: 1 }}
                  >
                    Forrige
                  </Button>
                )}
                {hasNext() && (
                  <Button
                    variant="secondary"
                    onClick={next}
                    style={{ flex: 1 }}
                  >
                    Neste
                  </Button>
                )}
                {id === 'submit' && (
                  <Button type="submit" autoFocus>
                    Send inn skjema
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
    );
  },
};

type StepId =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'address'
  | 'confirmation'
  | 'submission';

const Schema = z.object({
  firstName: z.string().min(1, 'Fyll ut fornavn'),
  lastName: z.string().min(1, 'Fyll ut etternavn'),
  email: z.string().min(1, 'Fyll ut e-post'),
  phone: z.string().min(1, 'Fyll ut telefonnummer'),
  address: z.string().min(1, 'Fyll ut adresse'),
});

type FormValuesGroups = z.infer<typeof Schema>;

const stepFieldsById: Record<StepId, (keyof FormValuesGroups)[]> = {
  firstName: ['firstName'],
  lastName: ['lastName'],
  email: ['email'],
  phone: ['phone'],
  address: ['address'],
  confirmation: [],
  submission: [],
};

export const WithGroups: Story = {
  args: { className: classes.navigation },
  render(args) {
    const onStepChange = async (_nextId: StepId, prevId: StepId | null) => {
      if (!prevId) return;
      dialogRef.current?.close();
      const fields = stepFieldsById[prevId];
      if (fields.length === 0) return;
      const ok = await trigger(fields, { shouldFocus: false });
      if (ok) markCompleted(prevId);
      else if (isSubmitted) markInvalid(prevId);
    };

    const {
      getStepProps,
      deriveNavigationState,
      id,
      markCompleted,
      markInvalid,
      reset: resetNavigation,
      setId,
      next,
      prev,
      hasNext,
      hasPrev,
    } = useFormNavigation<StepId>({
      value: 'firstName',
      onChange: onStepChange,
    });

    const methods = useForm<FormValuesGroups>({
      mode: 'onChange',
      shouldFocusError: false,
      shouldUnregister: false,
      resolver: zodResolver(Schema),
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      },
    });

    const {
      register,
      handleSubmit,
      trigger,
      reset: resetForm,
      formState: { errors, isSubmitted, isSubmitSuccessful },
      getFieldState,
    } = methods;

    const stepHasError = (stepId: StepId): boolean => {
      const fields = stepFieldsById[stepId] ?? [];
      return fields.some((name) => !!getFieldState(name).error);
    };

    const onValid = async () => {
      setId('confirmation');
      markCompleted('submission');
    };

    const onInvalid = () => {
      (Object.keys(stepFieldsById) as StepId[]).forEach((id) => {
        if (stepHasError(id)) markInvalid(id);
      });
    };

    const reset = () => {
      resetForm();
      resetNavigation();
      setId('firstName');
    };

    const formErrors = isSubmitted ? errors : {};

    const dialogRef = useRef<HTMLDialogElement>(null);

    const formNavigationContent = (
      <FormNavigation {...args}>
        <FormNavigation.Group
          title="Personopplysninger"
          state={deriveNavigationState(['firstName', 'lastName'])}
        >
          <FormNavigation.Group.Step {...getStepProps('firstName')}>
            Fornavn
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('lastName')}>
            Etternavn
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
        <FormNavigation.Group
          title="Kontaktinformasjon"
          state={deriveNavigationState(['email', 'phone', 'address'])}
        >
          <FormNavigation.Group.Step {...getStepProps('email')}>
            E-post
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('phone')}>
            Telefon
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('address')}>
            Adresse
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
        <FormNavigation.Step {...getStepProps('submission')}>
          <PaperplaneIcon aria-hidden />
          Innsending
        </FormNavigation.Step>
        <FormNavigation.Step {...getStepProps('confirmation')}>
          <SealCheckmarkIcon aria-hidden />
          Bekreftelse
        </FormNavigation.Step>
      </FormNavigation>
    );

    return (
      <FormProvider {...methods}>
        <div className={classes.page}>
          <div className={classes.desktop}>{formNavigationContent}</div>
          <div className={classes.container}>
            <div className={classes.mobile}>
              <Dialog.TriggerContext>
                <Dialog.Trigger
                  data-color={
                    Object.entries(formErrors).length > 0 ? 'danger' : 'neutral'
                  }
                  variant="secondary"
                >
                  <BulletListIcon aria-hidden />
                  Naviger
                </Dialog.Trigger>
                <Dialog
                  closedby="any"
                  ref={dialogRef}
                  style={{ width: 'fit-content', minWidth: '20rem' }}
                >
                  <Heading level={2}>Naviger</Heading>
                  {formNavigationContent}
                </Dialog>
              </Dialog.TriggerContext>
            </div>
            <Heading level={2} data-size="sm">
              {id === 'submission'
                ? 'Innsending'
                : id === 'confirmation'
                  ? 'Bekreftelse'
                  : 'Utfylling'}
            </Heading>
            <form
              className={classes.form}
              onSubmit={handleSubmit(onValid, onInvalid)}
            >
              {id === 'firstName' && (
                <Textfield
                  id="firstName"
                  label="Fornavn"
                  {...register('firstName')}
                  error={formErrors.firstName?.message}
                />
              )}
              {id === 'lastName' && (
                <Textfield
                  id="lastName"
                  label="Etternavn"
                  {...register('lastName')}
                  error={formErrors.lastName?.message}
                  autoFocus
                />
              )}
              {id === 'email' && (
                <Textfield
                  id="email"
                  label="E-post"
                  {...register('email')}
                  error={formErrors.email?.message}
                  autoFocus
                />
              )}
              {id === 'phone' && (
                <Textfield
                  id="phone"
                  label="Telefon"
                  {...register('phone')}
                  error={formErrors.phone?.message}
                  autoFocus
                />
              )}
              {id === 'address' && (
                <Textfield
                  id="address"
                  label="Adresse"
                  {...register('address')}
                  error={formErrors.address?.message}
                  autoFocus
                />
              )}
              {id === 'submission' && (
                <Paragraph>
                  {isSubmitSuccessful
                    ? 'Skjemaet er sendt inn!'
                    : 'Trykk på knappen for å sende inn skjema.'}
                </Paragraph>
              )}
              {id === 'confirmation' ? (
                isSubmitSuccessful ? (
                  <>
                    <CheckmarkCircleIcon aria-hidden fontSize="2rem" />
                    <Paragraph>Skjemaet er sendt inn!</Paragraph>
                    <Button autoFocus variant="secondary" onClick={reset}>
                      Start på nytt
                    </Button>
                  </>
                ) : (
                  <Paragraph>Du har ikke sendt inn skjemaet enda.</Paragraph>
                )
              ) : null}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--ds-size-2)',
                  width: '100%',
                }}
              >
                {hasPrev() && (
                  <Button
                    variant="secondary"
                    onClick={prev}
                    style={{ flex: 1 }}
                  >
                    Forrige
                  </Button>
                )}
                {hasNext() && (
                  <Button
                    variant="secondary"
                    onClick={next}
                    style={{ flex: 1 }}
                  >
                    Neste
                  </Button>
                )}
              </div>
              {id === 'submission' && !isSubmitSuccessful && (
                <>
                  <Button type="submit" autoFocus>
                    Send inn skjema
                  </Button>
                  {Object.entries(formErrors).length > 0 && (
                    <ErrorSummary>
                      <ErrorSummary.Heading>
                        Rett opp følgende feil:
                      </ErrorSummary.Heading>
                      <ErrorSummary.List>
                        {Object.entries(formErrors).map(([field, error]) => (
                          <ErrorSummary.Item key={field}>
                            <ErrorSummary.Link
                              href={`#${field}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setId(field as StepId);
                              }}
                            >
                              {(error as { message?: string })?.message ??
                                'Du må fylle ut dette feltet'}
                            </ErrorSummary.Link>
                          </ErrorSummary.Item>
                        ))}
                      </ErrorSummary.List>
                    </ErrorSummary>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </FormProvider>
    );
  },
};

export const Icons: Story = {
  args: {},
  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Step>
        <InformationSquareIcon aria-hidden />
        Informasjon
      </FormNavigation.Step>
      <FormNavigation.Step>
        <ClipboardIcon aria-hidden />
        Oppsummering
      </FormNavigation.Step>
      <FormNavigation.Step>
        <PaperplaneIcon aria-hidden />
        Innsending
      </FormNavigation.Step>
      <FormNavigation.Step>
        <SealCheckmarkIcon aria-hidden />
        Bekreftelse
      </FormNavigation.Step>
      <FormNavigation.Step>
        <UploadIcon aria-hidden />
        Vedlegg
      </FormNavigation.Step>
      <FormNavigation.Step>
        <BriefcaseIcon aria-hidden />
        Arbeidsrelaterte opplysninger
      </FormNavigation.Step>
      <FormNavigation.Step>
        <PersonIcon aria-hidden />
        Personlige opplysninger
      </FormNavigation.Step>
    </FormNavigation>
  ),
};
