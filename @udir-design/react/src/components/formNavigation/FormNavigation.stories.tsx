import { ErrorSummary, Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { BulletListIcon, PaperplaneIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import type { FormPlan, GetStepId } from 'src/utilities/form/navigation';
import { defineFormPlan } from 'src/utilities/form/navigation';
import { useFormNavigation } from 'src/utilities/hooks/useFormNavigation/useFormNavigation';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import { FormSummary } from '../formSummary';
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
    return (
      <FormNavigation {...args}>
        <FormNavigation.Group
          title="Seksjon"
          {...getGroupProps(['step1', 'step2'])}
        >
          <FormNavigation.Step {...getStepProps('step1')}>
            Første steg
          </FormNavigation.Step>
          <FormNavigation.Step {...getStepProps('step2')}>
            Andre steg
          </FormNavigation.Step>
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
      <FormNavigation.Group title="Tredje seksjon">
        <FormNavigation.Step state="completed">Første steg</FormNavigation.Step>
        <FormNavigation.Step state="completed">Andre steg</FormNavigation.Step>
        <FormNavigation.Step state="active">Tredje steg</FormNavigation.Step>
      </FormNavigation.Group>
      <FormNavigation.Step variant="summary">Oppsummering</FormNavigation.Step>
      <FormNavigation.Step variant="submission">Innsending</FormNavigation.Step>
      <FormNavigation.Step variant="confirmation">
        Kvittering
      </FormNavigation.Step>
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
            Kvittering
          </FormNavigation.Step>
          <FormNavigation.Step state="active" variant="confirmation">
            Kvittering
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
          <FormNavigation.Group title="Seksjon" open={false}>
            <FormNavigation.Step state="active">
              Første steg
            </FormNavigation.Step>
            <FormNavigation.Step>Andre steg</FormNavigation.Step>
            <FormNavigation.Step>Tredje steg</FormNavigation.Step>
            <FormNavigation.Step>Fjerde steg</FormNavigation.Step>
          </FormNavigation.Group>
        </FormNavigation>

        <FormNavigation {...args}>
          <FormNavigation.Group title="Seksjon" state="completed" open={false}>
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
          <FormNavigation.Group title="Seksjon" state="invalid" open={false}>
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

const {
  plan,
  defaultValues,
  fieldsByStep,
  stepIds,
  findStepForField,
  getStep,
} = defineFormPlan([
  {
    sectionTitle: 'Første seksjon',
    steps: [
      {
        id: 'step1',
        title: 'Første steg',
        fields: [
          { name: 'q1', label: 'Første spørsmål' },
          { name: 'q2', label: 'Andre spørsmål' },
        ],
      },
      {
        id: 'step2',
        title: 'Andre steg',
        fields: [{ name: 'q3', label: 'Tredje spørsmål' }],
      },
    ],
  },
  {
    sectionTitle: 'Andre seksjon',
    steps: [
      {
        id: 'step3',
        title: 'Første steg',
        fields: [
          { name: 'q4', label: 'Fjerde spørsmål' },
          { name: 'q5', label: 'Femte spørsmål' },
        ],
      },
      {
        id: 'step4',
        title: 'Andre steg',
        fields: [{ name: 'q6', label: 'Sjette spørsmål' }],
      },
      {
        id: 'step5',
        title: 'Tredje steg',
        fields: [{ name: 'q7', label: 'Syvende spørsmål' }],
      },
    ],
  },
  { id: 'submission', title: 'Innsending', fields: [], variant: 'submission' },
  {
    id: 'confirmation',
    title: 'Kvittering',
    fields: [],
    variant: 'confirmation',
  },
] as const satisfies FormPlan<string, string, keyof FormValuesGroups>);

type StepId = GetStepId<typeof fieldsByStep>;

const sectionTitleByStepId = new Map<StepId, string>();

const heading = (stepId: StepId) =>
  sectionTitleByStepId.get(stepId) ?? getStep(stepId)?.title ?? 'Skjema';

export const Full = meta.story({
  parameters: { docs: { source: { type: 'code' } } },
  args: { className: classes.navigation },
  render(args) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const methods = useForm<FormValuesGroups>({
      mode: 'onChange',
      shouldFocusError: false,
      shouldUnregister: false,
      resolver: zodResolver(Schema),
      defaultValues,
    });

    const {
      register,
      handleSubmit,
      trigger,
      reset: resetForm,
      formState: { errors, isSubmitted, isSubmitSuccessful },
      getFieldState,
    } = methods;

    const formErrors = isSubmitted ? errors : {};
    const values = useWatch<FormValuesGroups>({ control: methods.control });

    const onStepChange = async (_nextId: StepId, prevId: StepId | null) => {
      if (!prevId) return;
      dialogRef.current?.close();

      const fields = fieldsByStep[prevId];
      if (!fields || fields.length === 0) return;

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

    const stepHasError = (stepId: StepId): boolean => {
      const fields = fieldsByStep[stepId] ?? [];
      return fields.some((name) => !!getFieldState(name).error);
    };

    const onValid = async () => {
      setId('confirmation');
    };

    const onInvalid = () => {
      stepIds.forEach((sid) => {
        if (stepHasError(sid as StepId)) markInvalid(sid as StepId);
      });
    };

    const reset = () => {
      resetForm(defaultValues);
      resetNavigation();
      setId('step1');
    };

    const goToStep = (stepId: StepId) => {
      setId(stepId);

      requestAnimationFrame(() => {
        const fields = fieldsByStep[stepId];
        if (!fields || fields.length === 0) return;
        document.getElementById(fields[0])?.focus();
      });
    };

    const formNavigationContent = (
      <FormNavigation {...args}>
        {plan.map((item) => {
          if ('steps' in item) {
            const stepIds = item.steps.map((s) => s.id) as StepId[];

            return (
              <FormNavigation.Group
                key={item.sectionTitle}
                title={item.sectionTitle}
                {...getGroupProps(stepIds)}
              >
                {stepIds.map((stepId) => {
                  const step = getStep(stepId);
                  return (
                    <FormNavigation.Step
                      key={stepId}
                      variant={step?.variant}
                      {...getStepProps(stepId)}
                    >
                      {step?.title ?? String(stepId)}
                    </FormNavigation.Step>
                  );
                })}
              </FormNavigation.Group>
            );
          }

          const stepId = item.id as StepId;
          const step = getStep(stepId);

          return (
            <FormNavigation.Step
              key={stepId}
              variant={step?.variant}
              {...getStepProps(stepId)}
              disabled={stepId === 'confirmation' && !isSubmitSuccessful}
            >
              {item.title}
            </FormNavigation.Step>
          );
        })}
      </FormNavigation>
    );

    const renderSummary = () => (
      <FormSummary>
        <FormSummary.Section title="Oppsummering" level={1} />

        {plan.map((item) => {
          if ('steps' in item) {
            return (
              <FormSummary.Section
                key={item.sectionTitle}
                title={item.sectionTitle}
                level={2}
              >
                {item.steps
                  .filter((step) => step.fields.length > 0)
                  .map((step) => (
                    <FormSummary.Section
                      key={step.id}
                      title={step.title}
                      level={3}
                      onEdit={() => goToStep(step.id as StepId)}
                    >
                      <FormSummary.Fields>
                        {step.fields.map((f) => {
                          const value = values?.[f.name];
                          const error = formErrors?.[f.name]?.message as
                            | string
                            | undefined;

                          return (
                            <FormSummary.Field key={f.name}>
                              <FormSummary.Field.Label>
                                {f.label}
                              </FormSummary.Field.Label>
                              <FormSummary.Field.Answer error={error}>
                                {typeof value === 'string' && value.trim()
                                  ? value
                                  : 'Ikke besvart'}
                              </FormSummary.Field.Answer>
                            </FormSummary.Field>
                          );
                        })}
                      </FormSummary.Fields>
                    </FormSummary.Section>
                  ))}
              </FormSummary.Section>
            );
          }
          return null;
        })}
      </FormSummary>
    );

    const renderSubmission = () => (
      <Paragraph>
        {isSubmitSuccessful
          ? 'Skjemaet er sendt inn!'
          : 'Se over svarene dine og trykk på knappen for å sende inn skjema.'}
      </Paragraph>
    );

    const renderConfirmation = () =>
      isSubmitSuccessful ? (
        <>
          <Paragraph>Skjemaet er sendt inn!</Paragraph>
          <Button autoFocus variant="secondary" onClick={reset}>
            Start på nytt
          </Button>
        </>
      ) : (
        <Paragraph>Du har ikke sendt inn skjemaet enda.</Paragraph>
      );

    const renderStepContent = (stepId: StepId | null) => {
      if (!stepId) return null;

      if (stepId === 'submission') return renderSubmission();
      if (stepId === 'confirmation') return renderConfirmation();

      const step = getStep(stepId);
      if (!step) return null;

      return (
        <>
          {step.fields.map((f) => (
            <Textfield
              key={f.name}
              id={f.name}
              label={f.label}
              {...register(f.name)}
              error={formErrors?.[f.name]?.message}
              readOnly={isSubmitSuccessful}
            />
          ))}
        </>
      );
    };

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
              {renderStepContent(id)}
              {id === 'submission' && !isSubmitSuccessful && renderSummary()}
              <div className={classes.navigationButtons}>
                {hasPrev() && (
                  <Button variant="secondary" onClick={prev}>
                    Forrige
                  </Button>
                )}
                {hasNext() && (isSubmitSuccessful || id !== 'submission') && (
                  <Button variant="secondary" onClick={next}>
                    Neste
                  </Button>
                )}
                {id === 'submission' && !isSubmitSuccessful && (
                  <Button type="submit" style={{ flex: 2 }}>
                    Send inn skjema <PaperplaneIcon aria-hidden />
                  </Button>
                )}
              </div>
              {id === 'submission' &&
                !isSubmitSuccessful &&
                Object.entries(formErrors).length > 0 && (
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

                              const stepId = findStepForField(field);
                              if (stepId && stepId !== id) setId(stepId);

                              requestAnimationFrame(() => {
                                document.getElementById(field)?.focus();
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
            </form>
          </div>
        </div>
      </FormProvider>
    );
  },
});
