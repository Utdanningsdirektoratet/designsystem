import { ErrorSummary, Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { BulletListIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { useFormNavigation } from '../../utilities/hooks/useFormNavigation/useFormNavigation';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import classes from './formNavigation.stories.module.css';
import { FormNavigation } from '.';

const meta = preview.meta({
  component: FormNavigation,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
      details: 'Inspirert av arbeid gjort i Altinn Studio.',
    },
    customStyles: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
    },
  },
  decorators: [withResponsiveDataSize],
});

export const Preview = meta.story({
  args: {},
  render(args) {
    const { getStepProps, getGroupProps } = useFormNavigation({
      value: 'step',
    });
    return (
      <FormNavigation {...args}>
        <FormNavigation.Step {...getStepProps('step')}>
          Steg
        </FormNavigation.Step>
        <FormNavigation.Group
          title="Seksjon"
          {...getGroupProps(['step-1', 'step-2'])}
        >
          <FormNavigation.Step {...getStepProps('step-1')}>
            Første steg
          </FormNavigation.Step>
          <FormNavigation.Step {...getStepProps('step-2')}>
            Andre steg
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
});

export const Grouping = meta.story({
  args: {},
  render(args) {
    const { getStepProps, getGroupProps } = useFormNavigation({
      value: 'step1',
    });
    const step1 = getStepProps({ stepId: 'step1', label: 'Første steg' });
    const step2 = getStepProps({ stepId: 'step2', label: 'Andre steg' });
    return (
      <FormNavigation {...args}>
        <FormNavigation.Group
          title="Seksjon"
          {...getGroupProps(['step1', 'step2'])}
        >
          <FormNavigation.Step {...step1} />
          <FormNavigation.Step {...step2} />
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
});

export const SingleStep = meta.story({
  args: {},
  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Step>Steg</FormNavigation.Step>
    </FormNavigation>
  ),
});

export const States = meta.story({
  args: {},

  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Step variant="info">Infoside</FormNavigation.Step>
      <FormNavigation.Step state="completed">
        Frittstående steg
      </FormNavigation.Step>
      <FormNavigation.Step state="invalid">
        Frittstående steg
      </FormNavigation.Step>
      <FormNavigation.Group title="Første seksjon" state="completed">
        <FormNavigation.Step variant="info">Infoside</FormNavigation.Step>
        <FormNavigation.Step state="completed">Første steg</FormNavigation.Step>
        <FormNavigation.Step state="completed">Andre steg</FormNavigation.Step>
      </FormNavigation.Group>
      <FormNavigation.Group title="Andre seksjon" state="invalid">
        <FormNavigation.Step state="completed">Første steg</FormNavigation.Step>
        <FormNavigation.Step state="invalid">Andre steg</FormNavigation.Step>
        <FormNavigation.Step state="invalid">Tredje steg</FormNavigation.Step>
      </FormNavigation.Group>
      <FormNavigation.Group
        title="Tredje seksjon"
        activeStepLabel="Tredje steg"
      >
        <FormNavigation.Step state="completed">Første steg</FormNavigation.Step>
        <FormNavigation.Step state="completed">Andre steg</FormNavigation.Step>
        <FormNavigation.Step state="active">Tredje steg</FormNavigation.Step>
      </FormNavigation.Group>
      <FormNavigation.Step variant="submission">Innsending</FormNavigation.Step>
      <FormNavigation.Step variant="confirmation">
        Bekreftelse
      </FormNavigation.Step>
      <FormNavigation.Step variant="summary">Oppsummering</FormNavigation.Step>
    </FormNavigation>
  ),
});

export const AllStates = meta.story({
  args: {},
  render: (args) => (
    <div className={classes.allStatesPage}>
      <div className={classes.allStatesContainer}>
        <FormNavigation {...args}>
          <FormNavigation.Step variant="info">Steg</FormNavigation.Step>
          <FormNavigation.Step state="active">Steg</FormNavigation.Step>
          <FormNavigation.Step state="completed">Steg</FormNavigation.Step>
          <FormNavigation.Step state="invalid">Steg</FormNavigation.Step>
        </FormNavigation>
        <FormNavigation {...args}>
          <FormNavigation.Step variant="info">Infoside</FormNavigation.Step>
          <FormNavigation.Step state="active" variant="info">
            Infoside
          </FormNavigation.Step>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Step variant="summary">
            Oppsummering
          </FormNavigation.Step>
          <FormNavigation.Step state="active" variant="summary">
            Oppsummering
          </FormNavigation.Step>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Step variant="submission">
            Innsending
          </FormNavigation.Step>
          <FormNavigation.Step state="active" variant="submission">
            Innsending
          </FormNavigation.Step>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Step variant="confirmation">
            Bekreftelse
          </FormNavigation.Step>
          <FormNavigation.Step state="active" variant="confirmation">
            Bekreftelse
          </FormNavigation.Step>
        </FormNavigation>
      </div>

      <div className={classes.allStatesContainer}>
        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon">
            <FormNavigation.Step>Første steg</FormNavigation.Step>
            <FormNavigation.Step>Andre steg</FormNavigation.Step>
            <FormNavigation.Step>Tredje steg</FormNavigation.Step>
            <FormNavigation.Step>Fjerde steg</FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon">
            <FormNavigation.Step state="completed">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step>Tredje steg</FormNavigation.Step>
            <FormNavigation.Step>Fjerde steg</FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="completed">
            <FormNavigation.Step state="completed">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="invalid">
            <FormNavigation.Step state="invalid">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="invalid">
            <FormNavigation.Step state="completed">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>
      </div>

      <div className={classes.allStatesContainer}>
        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" open={false}>
            <FormNavigation.Step>Første steg</FormNavigation.Step>
            <FormNavigation.Step>Andre steg</FormNavigation.Step>
            <FormNavigation.Step>Tredje steg</FormNavigation.Step>
            <FormNavigation.Step>Fjerde steg</FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="completed" open={false}>
            <FormNavigation.Step state="completed">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="invalid" open={false}>
            <FormNavigation.Step state="invalid">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group
            title="Seksjon"
            open={false}
            activeStepLabel="Første steg"
          >
            <FormNavigation.Step state="active">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step>Andre steg</FormNavigation.Step>
            <FormNavigation.Step>Tredje steg</FormNavigation.Step>
            <FormNavigation.Step>Fjerde steg</FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group
            title="Seksjon"
            state="completed"
            open={false}
            activeStepLabel="Første steg"
          >
            <FormNavigation.Step state="active">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="completed">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group
            title="Seksjon"
            state="invalid"
            open={false}
            activeStepLabel="Første steg"
          >
            <FormNavigation.Step state="active">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Andre steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Tredje steg
            </FormNavigation.Step>
            <FormNavigation.Step state="invalid">
              Fjerde steg
            </FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>
      </div>
    </div>
  ),
});

type FormValues = {
  step1: string;
  step2: string;
};

export const SimpleNavigation = meta.story({
  args: { className: classes.navigation },
  render(args) {
    const {
      getStepProps,
      getGroupProps,
      id,
      reset,
      setId,
      next,
      prev,
      hasNext,
      hasPrev,
    } = useFormNavigation({
      value: 'step1',
    });

    const methods = useForm<FormValues>({
      mode: 'onChange',
      shouldFocusError: false,
      shouldUnregister: false,
      defaultValues: {
        step1: '',
        step2: '',
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
      setId('step1');
      reset();
    };

    return (
      <FormProvider {...methods}>
        <div className={classes.page}>
          <FormNavigation {...args}>
            <FormNavigation.Group
              title="Seksjon"
              {...getGroupProps(['step1', 'step2'])}
            >
              <FormNavigation.Step {...getStepProps('step1')}>
                Steg 1
              </FormNavigation.Step>
              <FormNavigation.Step {...getStepProps('step2')}>
                Steg 2
              </FormNavigation.Step>
              <FormNavigation.Step {...getStepProps('submit')}>
                Innsending
              </FormNavigation.Step>
            </FormNavigation.Group>
          </FormNavigation>
          <div className={classes.container}>
            <Heading level={2} data-size="sm">
              {id === 'submit' ? 'Innsending' : 'Utfylling'}
            </Heading>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              {id === 'step1' && (
                <Textfield
                  id="step1"
                  label="Steg 1"
                  {...register('step1', {
                    required: 'Fyll ut steg 1',
                  })}
                  error={errors.step1?.message}
                />
              )}
              {id === 'step2' && (
                <Textfield
                  id="step2"
                  label="Steg 2"
                  {...register('step2', {
                    required: 'Fyll ut steg 2',
                  })}
                  error={errors.step2?.message}
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
});

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

const heading = (stepId: StepId) => {
  switch (stepId) {
    case 'submission':
      return 'Innsending';
    case 'confirmation':
      return 'Bekreftelse';
    case 'step1':
    case 'step2':
      return 'Første seksjon';
    case 'step3':
    case 'step4':
    case 'step5':
      return 'Andre seksjon';
  }
};

export const Full = meta.story({
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
      getGroupProps,
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

    const formNavigationContent = (
      <FormNavigation {...args}>
        <FormNavigation.Group
          title="Første seksjon"
          {...getGroupProps(['step1', 'step2'])}
        >
          <FormNavigation.Step
            {...getStepProps({ stepId: 'step1', label: 'Første steg' })}
          ></FormNavigation.Step>
          <FormNavigation.Step
            {...getStepProps({ stepId: 'step2', label: 'Andre steg' })}
          ></FormNavigation.Step>
        </FormNavigation.Group>
        <FormNavigation.Group
          title="Andre seksjon"
          {...getGroupProps(['step3', 'step4', 'step5'])}
        >
          <FormNavigation.Step
            {...getStepProps({ stepId: 'step3', label: 'Første steg' })}
          />
          <FormNavigation.Step
            {...getStepProps({ stepId: 'step4', label: 'Andre steg' })}
          />
          <FormNavigation.Step
            {...getStepProps({ stepId: 'step5', label: 'Tredje steg' })}
          />
        </FormNavigation.Group>
        <FormNavigation.Step
          variant="submission"
          {...getStepProps('submission')}
        >
          Innsending
        </FormNavigation.Step>
        <FormNavigation.Step
          variant="confirmation"
          {...getStepProps('confirmation')}
        >
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
              {id && heading(id)}
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
});
