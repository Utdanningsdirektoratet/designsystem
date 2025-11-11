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
              <div className={classes.navigationButtons}>
                {hasPrev() && (
                  <Button variant="secondary" onClick={prev}>
                    Forrige
                  </Button>
                )}
                {hasNext() && (
                  <Button variant="secondary" onClick={next}>
                    Neste
                  </Button>
                )}
                {id === 'submit' && (
                  <Button type="submit" autoFocus style={{ flex: 2 }}>
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
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'step5'
  | 'submission'
  | 'confirmation';

const Schema = z.object({
  q1: z.string().min(1, 'Fyll ut første spørsmål'),
  q2: z.string().min(1, 'Fyll ut andre spørsmål'),
  q3: z.string().min(1, 'Fyll ut tredje spørsmål'),
  q4: z.string().min(1, 'Fyll ut fjerde spørsmål'),
  q5: z.string().min(1, 'Fyll ut femte spørsmål'),
  q6: z.string().min(1, 'Fyll ut sjette spørsmål'),
  q7: z.string().min(1, 'Fyll ut syvende spørsmål'),
});

type FormValuesGroups = z.infer<typeof Schema>;

const stepFieldsById: Record<StepId, (keyof FormValuesGroups)[]> = {
  step1: ['q1', 'q2'],
  step2: ['q3'],
  step3: ['q4', 'q5'],
  step4: ['q6'],
  step5: ['q7'],
  submission: [],
  confirmation: [],
};

const findStepForField = (
  field: keyof FormValuesGroups,
): StepId | undefined => {
  for (const [stepId, fields] of Object.entries(stepFieldsById) as [
    StepId,
    (keyof FormValuesGroups)[],
  ][]) {
    if (fields.includes(field)) return stepId;
  }
};

export const Full: Story = {
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
      value: 'step1',
      onChange: onStepChange,
    });

    const methods = useForm<FormValuesGroups>({
      mode: 'onChange',
      shouldFocusError: false,
      shouldUnregister: false,
      resolver: zodResolver(Schema),
      defaultValues: {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
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
      setId('step1');
    };

    const formErrors = isSubmitted ? errors : {};

    const dialogRef = useRef<HTMLDialogElement>(null);

    const heading =
      id === 'submission'
        ? 'Innsending'
        : id === 'confirmation'
          ? 'Bekreftelse'
          : 'Steg ' + (id?.replace('step', '') ?? '');

    const formNavigationContent = (
      <FormNavigation {...args}>
        <FormNavigation.Group
          title="Seksjon 1"
          state={deriveNavigationState(['step1', 'step2'])}
        >
          <FormNavigation.Group.Step {...getStepProps('step1')}>
            Steg 1
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step2')}>
            Steg 2
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
        <FormNavigation.Group
          title="Seksjon 2"
          state={deriveNavigationState(['step3', 'step4', 'step5'])}
        >
          <FormNavigation.Group.Step {...getStepProps('step3')}>
            Steg 1
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step4')}>
            Steg 2
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step5')}>
            Steg 3
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
              {heading}
            </Heading>
            <form
              className={classes.form}
              onSubmit={handleSubmit(onValid, onInvalid)}
            >
              {id === 'step1' && (
                <>
                  <Textfield
                    id="q1"
                    label="Første spørsmål"
                    {...register('q1')}
                    error={formErrors.q1?.message}
                  />
                  <Textfield
                    id="q2"
                    label="Andre spørsmål"
                    {...register('q2')}
                    error={formErrors.q2?.message}
                  />
                </>
              )}
              {id === 'step2' && (
                <Textfield
                  id="q3"
                  label="Tredje spørsmål"
                  {...register('q3')}
                  error={formErrors.q3?.message}
                  autoFocus
                />
              )}
              {id === 'step3' && (
                <>
                  <Textfield
                    id="q4"
                    label="Fjerde spørsmål"
                    {...register('q4')}
                    error={formErrors.q4?.message}
                    autoFocus
                  />
                  <Textfield
                    id="q5"
                    label="Femte spørsmål"
                    {...register('q5')}
                    error={formErrors.q5?.message}
                  />
                </>
              )}
              {id === 'step4' && (
                <Textfield
                  id="q6"
                  label="Sjette spørsmål"
                  {...register('q6')}
                  error={formErrors.q6?.message}
                  autoFocus
                />
              )}
              {id === 'step5' && (
                <Textfield
                  id="q7"
                  label="Syvende spørsmål"
                  {...register('q7')}
                  error={formErrors.q7?.message}
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
              <div className={classes.navigationButtons}>
                {hasPrev() && (
                  <Button variant="secondary" onClick={prev}>
                    Forrige
                  </Button>
                )}
                {hasNext() && (
                  <Button variant="secondary" onClick={next}>
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
                                const stepId = findStepForField(
                                  field as keyof FormValuesGroups,
                                );
                                if (stepId && stepId !== id) {
                                  setId(stepId);
                                }
                                requestAnimationFrame(() => {
                                  const el = document.getElementById(field);
                                  el?.focus();
                                });
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
