import { Paragraph, Tooltip } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentRef,
  type RefObject,
  type SyntheticEvent,
  type ReactNode,
} from 'react';
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import z from 'zod';
import {
  BulletListIcon,
  NotePencilIcon,
  PlusIcon,
  TrashIcon,
} from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Dialog } from 'src/components/dialog';
import { ErrorSummary } from 'src/components/errorSummary';
import { Field } from 'src/components/field';
import { FormNavigation } from 'src/components/formNavigation';
import { FormSummary } from 'src/components/formSummary';
import { Table } from 'src/components/table';
import { Textfield } from 'src/components/textfield';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label/Label';
import { demoParameters } from 'src/demo/demoParameters';
import { useFormNavigation } from 'src/hooks/useFormNavigation';
import { focusFormField } from 'src/utilities/form/focus';
import classes from './repeterendeData.stories.module.css';

const meta = preview.meta({
  title: 'patterns/Skjema/Repeterende data',
  tags: ['alpha', 'udir'],
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      margin: '0 1rem',
      // Default overflow: hidden would break the sticky navigation.
      overflow: 'visible',
    },
  },
  decorators: [withResponsiveDataSize],
});

type Foresatt = {
  id: string;
  navn: string;
  fornavn: string;
  epost: string;
  mobilnummer: string;
};

type Avdeling = {
  id: string;
  navn: string;
  foresatte: Foresatt[];
};

// Set by the summary; the target step opens the matching dialog, then clears it.
type EditRequest = { avdelingId: string; foresattId?: string };

const AvdelingSchema = z.object({
  navn: z.string().trim().min(1, 'Fyll ut navn på avdelingen'),
});
type AvdelingValues = z.infer<typeof AvdelingSchema>;

const ForesattSchema = z.object({
  navn: z.string().trim().min(1, 'Fyll ut navn på foresatt'),
  fornavn: z.string().trim().min(1, 'Fyll ut barnets fornavn'),
  epost: z
    .string()
    .trim()
    .min(1, 'Fyll ut e-post')
    .pipe(z.email('Skriv inn en gyldig e-postadresse')),
  mobilnummer: z
    .string()
    .trim()
    .min(1, 'Fyll ut mobilnummer')
    .regex(/^\d{8}$/, 'Mobilnummer må bestå av 8 siffer'),
});
type ForesattValues = z.infer<typeof ForesattSchema>;

type StepId = 'foreldre' | 'send';

const headings: Record<StepId, string> = {
  foreldre: 'Registrer foreldre',
  send: 'Send invitasjon',
};

const foresattNavnId = (avdelingId: string) => `foresatt-navn-${avdelingId}`;
const avdelingNavnId = 'avdeling-navn';
const leggTilAvdelingId = 'legg-til-avdeling';

type SendError<TStep extends string> = {
  id: string;
  step: TStep;
  message: string;
  focusId: string;
};

function validate<TStep extends string>(
  avdelinger: Avdeling[],
  avdelingerStep: TStep,
  foreldreStep: TStep,
  avdelingerFocusId: string,
): SendError<TStep>[] {
  if (avdelinger.length === 0) {
    const errors: SendError<TStep>[] = [
      {
        id: 'avdelinger',
        step: avdelingerStep,
        message: 'Legg til minst én avdeling',
        focusId: avdelingerFocusId,
      },
    ];
    // Foreldre can't be complete without avdelinger.
    if (foreldreStep !== avdelingerStep) {
      errors.push({
        id: 'foreldre',
        step: foreldreStep,
        message: 'Legg til minst én foresatt',
        focusId: avdelingerFocusId,
      });
    }
    return errors;
  }
  return avdelinger
    .filter((avdeling) => avdeling.foresatte.length === 0)
    .map((avdeling) => ({
      id: avdeling.id,
      step: foreldreStep,
      message: `${avdeling.navn}: Legg til minst én foresatt`,
      focusId: foresattNavnId(avdeling.id),
    }));
}

function useInnsending<TStep extends string>({
  errors,
  steps,
  markInvalid,
  markCompleted,
}: {
  errors: SendError<TStep>[];
  steps: TStep[];
  markInvalid: (step: TStep) => void;
  markCompleted: (step: TStep) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const errorSteps = errors.map((error) => error.step).join();

  // Keep step states in sync with the errors once the user has tried to send.
  useEffect(() => {
    if (!submitted) return;
    steps.forEach((step) => {
      if (errors.some((error) => error.step === step)) markInvalid(step);
      else markCompleted(step);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, errorSteps]);

  const submit = () => {
    setSubmitted(true);
    setAttempt((n) => n + 1);
    if (errors.length === 0) setSent(true);
  };

  return { submitted, sent, attempt, submit };
}

type AvdelingDialogProps = {
  title: string;
  description: string;
  triggerLabel: string;
  triggerVariant: 'primary' | 'secondary' | 'tertiary';
  triggerIcon?: ReactNode;
  iconOnly?: boolean;
  submitLabel: string;
  currentName?: string;
  onSubmit: (navn: string) => void;
  triggerId?: string;
  openRequested?: boolean;
  onOpenHandled?: () => void;
};

const AvdelingDialog = ({
  title,
  description,
  triggerLabel,
  triggerVariant,
  triggerIcon,
  iconOnly,
  submitLabel,
  currentName = '',
  onSubmit,
  triggerId,
  openRequested,
  onOpenHandled,
}: AvdelingDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvdelingValues>({
    resolver: zodResolver(AvdelingSchema),
    defaultValues: { navn: currentName },
  });

  useEffect(() => {
    if (!openRequested) return;
    reset({ navn: currentName });
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    onOpenHandled?.();
  }, [openRequested, reset, currentName, onOpenHandled]);

  const onValid = ({ navn }: AvdelingValues) => {
    onSubmit(navn);
    dialogRef.current?.close();
  };

  const trigger = (
    <Button
      id={triggerId}
      variant={triggerVariant}
      icon={iconOnly}
      aria-label={iconOnly ? triggerLabel : undefined}
      aria-haspopup="dialog"
      onClick={() => {
        reset({ navn: currentName });
        dialogRef.current?.showModal();
      }}
    >
      {triggerIcon}
      {!iconOnly && triggerLabel}
    </Button>
  );

  return (
    <>
      {iconOnly ? <Tooltip content={triggerLabel}>{trigger}</Tooltip> : trigger}
      <Dialog ref={dialogRef} closedby="any" className={classes.dialog}>
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Heading level={2} data-size="xs">
              {title}
            </Heading>
            <Paragraph data-size="sm">{description}</Paragraph>
          </div>
          <form
            className={classes.dialogForm}
            onSubmit={(event) => handleSubmit(onValid)(event)}
            noValidate
          >
            <Textfield
              {...nativeAutofocus}
              label="Navn på avdeling"
              autoComplete="off"
              {...register('navn')}
              error={errors.navn?.message}
            />
            <div className={classes.buttons}>
              <Button type="submit">{submitLabel}</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => dialogRef.current?.close()}
              >
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

type AvdelingSectionProps = {
  avdeling: Avdeling;
  onChange: (avdeling: Avdeling) => void;
  canEditName?: boolean;
  request?: EditRequest;
  onRequestHandled?: () => void;
};

const emptyForesatt: ForesattValues = {
  navn: '',
  fornavn: '',
  epost: '',
  mobilnummer: '',
};

type ForesattFieldsProps = {
  register: UseFormRegister<ForesattValues>;
  errors: FieldErrors<ForesattValues>;
  focusFirst?: boolean;
  navnId?: string;
};

// React's autoFocus prop doesn't work inside a Dialog; the native attribute does.
const nativeAutofocus = { autofocus: 'true' };

const ForesattFields = ({
  register,
  errors,
  focusFirst,
  navnId,
}: ForesattFieldsProps) => (
  <>
    <Textfield
      {...(focusFirst ? nativeAutofocus : {})}
      id={navnId}
      label="Navn på foresatt"
      autoComplete="off"
      {...register('navn')}
      error={errors.navn?.message}
    />
    <Textfield
      label="Barnets fornavn"
      autoComplete="off"
      {...register('fornavn')}
      error={errors.fornavn?.message}
    />
    <Textfield
      label="E-post"
      type="email"
      autoComplete="off"
      {...register('epost')}
      error={errors.epost?.message}
    />
    <Textfield
      label="Mobilnummer"
      type="tel"
      inputMode="numeric"
      autoComplete="off"
      {...register('mobilnummer')}
      error={errors.mobilnummer?.message}
    />
  </>
);

const AvdelingSection = ({
  avdeling,
  onChange,
  canEditName = true,
  request,
  onRequestHandled,
}: AvdelingSectionProps) => {
  const headingId = useId();
  const formHeadingId = useId();
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const editForm = useForm<ForesattValues>({
    resolver: zodResolver(ForesattSchema),
    defaultValues: emptyForesatt,
  });
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ForesattValues>({
    resolver: zodResolver(ForesattSchema),
    defaultValues: emptyForesatt,
  });

  // Focus after the re-render so it isn't lost when the list updates.
  useEffect(() => {
    if (focusRequest > 0) setFocus('navn');
  }, [focusRequest, setFocus]);

  const onSubmit = async (event: SyntheticEvent) => {
    let saved = false;
    await handleSubmit((values) => {
      onChange({
        ...avdeling,
        foresatte: [
          ...avdeling.foresatte,
          { id: crypto.randomUUID(), ...values },
        ],
      });
      saved = true;
    })(event);
    // handleSubmit marks the form as submitted after the callback, so reset must come after it.
    if (saved) {
      reset(emptyForesatt);
      setFocusRequest((n) => n + 1);
    }
  };

  const onEditValid = (values: ForesattValues) => {
    onChange({
      ...avdeling,
      foresatte: avdeling.foresatte.map((f) =>
        f.id === editingId ? { ...f, ...values } : f,
      ),
    });
    editDialogRef.current?.close();
  };

  const startEdit = (foresatt: Foresatt) => {
    setEditingId(foresatt.id);
    editForm.reset({
      navn: foresatt.navn,
      fornavn: foresatt.fornavn,
      epost: foresatt.epost,
      mobilnummer: foresatt.mobilnummer,
    });
    editDialogRef.current?.showModal();
  };

  const ownRequest = request?.avdelingId === avdeling.id ? request : undefined;
  const foresattRequest = avdeling.foresatte.find(
    (f) => f.id === ownRequest?.foresattId,
  );

  useEffect(() => {
    if (!foresattRequest) return;
    if (!editDialogRef.current?.open) startEdit(foresattRequest);
    onRequestHandled?.();
    // startEdit is recreated every render; only a new request should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foresattRequest, onRequestHandled]);

  const remove = (foresatt: Foresatt) => {
    onChange({
      ...avdeling,
      foresatte: avdeling.foresatte.filter((f) => f.id !== foresatt.id),
    });
    setFocusRequest((n) => n + 1);
  };

  return (
    <section className={classes.avdeling} aria-labelledby={headingId}>
      <div className={classes.avdelingHeader}>
        <Heading id={headingId} level={3} data-size="sm">
          {avdeling.navn}
        </Heading>
        {canEditName && (
          <AvdelingDialog
            title="Rediger navn"
            description="Navnet vises som overskrift for avdelingen."
            triggerLabel="Rediger navn"
            triggerVariant="tertiary"
            triggerIcon={<NotePencilIcon aria-hidden />}
            submitLabel="Lagre navn"
            currentName={avdeling.navn}
            onSubmit={(navn) => onChange({ ...avdeling, navn })}
            openRequested={!!ownRequest && !ownRequest.foresattId}
            onOpenHandled={onRequestHandled}
          />
        )}
      </div>
      {avdeling.foresatte.length > 0 && (
        <div className={classes.tableScroll}>
          <Table className={classes.table}>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col className={classes.actionColumn} />
              <col className={classes.actionColumn} />
            </colgroup>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Foresatt</Table.HeaderCell>
                <Table.HeaderCell>Barnets fornavn</Table.HeaderCell>
                <Table.HeaderCell>E-post</Table.HeaderCell>
                <Table.HeaderCell>Mobilnummer</Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="ds-sr-only">Rediger</span>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="ds-sr-only">Slett</span>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {avdeling.foresatte.map((foresatt) => (
                <Table.Row key={foresatt.id}>
                  <Table.Cell>{foresatt.navn}</Table.Cell>
                  <Table.Cell>{foresatt.fornavn}</Table.Cell>
                  <Table.Cell>{foresatt.epost}</Table.Cell>
                  <Table.Cell>{foresatt.mobilnummer}</Table.Cell>
                  <Table.Cell>
                    <Tooltip content="Rediger">
                      <Button
                        icon
                        variant="tertiary"
                        aria-label={`Rediger ${foresatt.navn}`}
                        aria-haspopup="dialog"
                        onClick={() => startEdit(foresatt)}
                      >
                        <NotePencilIcon aria-hidden />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip content="Slett">
                      <Button
                        icon
                        variant="tertiary"
                        data-color="danger"
                        aria-label={`Slett ${foresatt.navn}`}
                        onClick={() => remove(foresatt)}
                      >
                        <TrashIcon aria-hidden />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <div className={classes.addSection}>
        <Heading id={formHeadingId} level={4} data-size="xs">
          Legg til foresatt
        </Heading>
        <form
          className={classes.form}
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={formHeadingId}
        >
          <ForesattFields
            register={register}
            errors={errors}
            navnId={foresattNavnId(avdeling.id)}
          />
          <Field className={classes.formButtons}>
            {/* Invisible label keeps the button level with the labelled inputs. */}
            <Label aria-hidden>&nbsp;</Label>
            <Button type="submit">Lagre</Button>
          </Field>
        </form>
      </div>
      <Dialog
        ref={editDialogRef}
        closedby="any"
        className={classes.dialog}
        onClose={() => setEditingId(null)}
      >
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Heading level={2} data-size="xs">
              Rediger foresatt
            </Heading>
          </div>
          <form
            className={classes.dialogForm}
            onSubmit={(event) => editForm.handleSubmit(onEditValid)(event)}
            noValidate
          >
            <ForesattFields
              focusFirst
              register={editForm.register}
              errors={editForm.formState.errors}
            />
            <div className={classes.buttons}>
              <Button type="submit">Lagre</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => editDialogRef.current?.close()}
              >
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </section>
  );
};

type EgneStegId = 'avdelinger' | 'foreldre' | 'send';

const egneStegHeadings: Record<EgneStegId, string> = {
  avdelinger: 'Registrer avdelinger',
  foreldre: 'Registrer foreldre',
  send: 'Send invitasjon',
};

type AvdelingRegistreringProps = {
  avdelinger: Avdeling[];
  onCreate: (navn: string) => void;
  onChange: (avdeling: Avdeling) => void;
  onRemove: (avdeling: Avdeling) => void;
  request?: EditRequest;
  onRequestHandled?: () => void;
};

const AvdelingRegistrering = ({
  avdelinger,
  onCreate,
  onChange,
  onRemove,
  request,
  onRequestHandled,
}: AvdelingRegistreringProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<AvdelingValues>({
    resolver: zodResolver(AvdelingSchema),
    defaultValues: { navn: '' },
  });

  const onSubmit = async (event: SyntheticEvent) => {
    let saved = false;
    await handleSubmit(({ navn }) => {
      onCreate(navn);
      saved = true;
    })(event);
    if (saved) {
      reset({ navn: '' });
      setFocus('navn');
    }
  };

  return (
    <div className={classes.avdeling}>
      <form
        className={classes.avdelingForm}
        onSubmit={onSubmit}
        noValidate
        aria-label="Legg til avdeling"
      >
        <Textfield
          id={avdelingNavnId}
          label="Navn på avdeling"
          autoComplete="off"
          {...register('navn')}
          error={errors.navn?.message}
        />
        <Field>
          {/* Invisible label keeps the button level with the labelled input. */}
          <Label aria-hidden>&nbsp;</Label>
          <Button type="submit">
            <PlusIcon aria-hidden />
            Legg til
          </Button>
        </Field>
      </form>
      {avdelinger.length > 0 && (
        <div className={classes.tableScroll}>
          <Table className={classes.avdelingTable}>
            <colgroup>
              <col />
              <col className={classes.actionColumn} />
              <col className={classes.actionColumn} />
            </colgroup>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Avdeling</Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="ds-sr-only">Rediger</span>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <span className="ds-sr-only">Slett</span>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {avdelinger.map((avdeling) => (
                <Table.Row key={avdeling.id}>
                  <Table.Cell>{avdeling.navn}</Table.Cell>
                  <Table.Cell>
                    <AvdelingDialog
                      title="Rediger avdeling"
                      description="Endre navnet på avdelingen."
                      triggerLabel={`Rediger ${avdeling.navn}`}
                      triggerVariant="tertiary"
                      triggerIcon={<NotePencilIcon aria-hidden />}
                      iconOnly
                      submitLabel="Lagre"
                      currentName={avdeling.navn}
                      onSubmit={(navn) => onChange({ ...avdeling, navn })}
                      openRequested={request?.avdelingId === avdeling.id}
                      onOpenHandled={onRequestHandled}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip content={`Slett ${avdeling.navn}`}>
                      <Button
                        icon
                        variant="tertiary"
                        data-color="danger"
                        aria-label={`Slett ${avdeling.navn}`}
                        onClick={() => {
                          onRemove(avdeling);
                          setFocus('navn');
                        }}
                      >
                        <TrashIcon aria-hidden />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

type OppsummeringProps = {
  avdelinger: Avdeling[];
  submitted: boolean;
  onEdit: (request: EditRequest) => void;
  onRegister: () => void;
  registerLabel: string;
};

const Oppsummering = ({
  avdelinger,
  submitted,
  onEdit,
  onRegister,
  registerLabel,
}: OppsummeringProps) => {
  if (avdelinger.length === 0) {
    return (
      <div className={classes.avdelinger}>
        <Paragraph>Du har ikke registrert noen avdelinger ennå.</Paragraph>
        <Button variant="secondary" onClick={onRegister}>
          {registerLabel}
        </Button>
      </div>
    );
  }

  return (
    <FormSummary
      className={classes.summary}
      title="Registrerte foreldre"
      headingLevel={3}
    >
      {avdelinger.map((avdeling) => (
        <FormSummary.Section
          key={avdeling.id}
          title={avdeling.navn}
          headingLevel={4}
          onEdit={() => onEdit({ avdelingId: avdeling.id })}
        >
          {avdeling.foresatte.length === 0 ? (
            <FormSummary.Fields>
              <FormSummary.Field
                label="Foresatte"
                error={submitted ? 'Legg til minst én foresatt' : undefined}
              />
            </FormSummary.Fields>
          ) : (
            avdeling.foresatte.map((foresatt) => (
              <FormSummary.Section
                key={foresatt.id}
                title={foresatt.navn}
                headingLevel={5}
                onEdit={() =>
                  onEdit({ avdelingId: avdeling.id, foresattId: foresatt.id })
                }
              >
                <FormSummary.Fields>
                  <FormSummary.Field
                    label="Barnets fornavn"
                    value={foresatt.fornavn}
                  />
                  <FormSummary.Field label="E-post" value={foresatt.epost} />
                  <FormSummary.Field
                    label="Mobilnummer"
                    value={foresatt.mobilnummer}
                  />
                </FormSummary.Fields>
              </FormSummary.Section>
            ))
          )}
        </FormSummary.Section>
      ))}
    </FormSummary>
  );
};

type InnsendingProps<TStep extends string> = OppsummeringProps & {
  errors: SendError<TStep>[];
  attempt: number;
  sent: boolean;
  onNavigateToError: (error: SendError<TStep>) => void;
};

function Innsending<TStep extends string>({
  errors,
  attempt,
  sent,
  onNavigateToError,
  ...oppsummering
}: InnsendingProps<TStep>) {
  const errorSummaryRef = useRef<ComponentRef<typeof ErrorSummary>>(null);

  useEffect(() => {
    if (attempt > 0 && errors.length > 0) errorSummaryRef.current?.focus();
    // Only move focus when the user presses send, not when the errors change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  if (sent) {
    return <Paragraph>Invitasjonene er sendt.</Paragraph>;
  }

  return (
    <>
      <Oppsummering {...oppsummering} />
      {oppsummering.submitted && errors.length > 0 && (
        <ErrorSummary ref={errorSummaryRef} tabIndex={-1}>
          <ErrorSummary.Heading>Rett opp følgende feil:</ErrorSummary.Heading>
          <ErrorSummary.List>
            {errors.map((error) => (
              <ErrorSummary.Item key={error.id}>
                <ErrorSummary.Link
                  href={`#${error.focusId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigateToError(error);
                  }}
                >
                  {error.message}
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            ))}
          </ErrorSummary.List>
        </ErrorSummary>
      )}
    </>
  );
}

function useAvdelinger() {
  const [avdelinger, setAvdelinger] = useState<Avdeling[]>([]);
  const [editRequest, setEditRequest] = useState<EditRequest | null>(null);

  return {
    avdelinger,
    editRequest: editRequest ?? undefined,
    setEditRequest,
    clearEditRequest: () => setEditRequest(null),
    onCreate: (navn: string) =>
      setAvdelinger((prev) => [
        ...prev,
        { id: crypto.randomUUID(), navn, foresatte: [] },
      ]),
    onChange: (updated: Avdeling) =>
      setAvdelinger((prev) =>
        prev.map((avdeling) =>
          avdeling.id === updated.id ? updated : avdeling,
        ),
      ),
    onRemove: (removed: Avdeling) =>
      setAvdelinger((prev) =>
        prev.filter((avdeling) => avdeling.id !== removed.id),
      ),
  };
}

type StepLayoutProps = {
  navigation: ReactNode;
  navDialogRef: RefObject<HTMLDialogElement | null>;
  heading?: string;
  hasPrev: boolean;
  hasNext: boolean;
  prev: () => void;
  next: () => void;
  // Shown between the heading and the content.
  actions?: ReactNode;
  // Shows the send button when provided.
  onSend?: () => void;
  children: ReactNode;
};

const StepLayout = ({
  navigation,
  navDialogRef,
  heading,
  hasPrev,
  hasNext,
  prev,
  next,
  actions,
  onSend,
  children,
}: StepLayoutProps) => (
  <div className={classes.root}>
    <div className={classes.page}>
      <div className={classes.desktop}>{navigation}</div>
      <div className={classes.container}>
        <div className={classes.mobile}>
          <Dialog.TriggerContext>
            <Dialog.Trigger variant="secondary">
              <BulletListIcon aria-hidden />
              Naviger
            </Dialog.Trigger>
            <Dialog
              closedby="any"
              ref={navDialogRef}
              style={{ width: 'fit-content', minWidth: '20rem' }}
            >
              <Heading level={2}>Naviger</Heading>
              {navigation}
            </Dialog>
          </Dialog.TriggerContext>
        </div>
        <Heading level={2} data-size="md">
          {heading}
        </Heading>
        {actions}
        {children}
        <div className={classes.navigationGroup}>
          {hasPrev && (
            <Button variant="secondary" onClick={prev}>
              Forrige
            </Button>
          )}
          {hasNext && (
            <Button variant="secondary" onClick={next}>
              Neste
            </Button>
          )}
          {onSend && <Button onClick={onSend}>Send invitasjon</Button>}
        </div>
      </div>
    </div>
  </div>
);

export const Preview = meta.story({
  render() {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const {
      getStepProps,
      getGroupProps,
      id,
      setId,
      markInvalid,
      markCompleted,
      hasPrev,
      hasNext,
      prev,
      next,
    } = useFormNavigation<StepId>({
      value: 'foreldre',
      onChange: () => navDialogRef.current?.close(),
    });
    const {
      avdelinger,
      editRequest,
      setEditRequest,
      clearEditRequest,
      onCreate,
      onChange,
    } = useAvdelinger();
    const errors = validate<StepId>(
      avdelinger,
      'foreldre',
      'foreldre',
      leggTilAvdelingId,
    );
    const { submitted, sent, attempt, submit } = useInnsending({
      errors,
      steps: ['foreldre'],
      markInvalid,
      markCompleted,
    });

    const navigation = (
      <FormNavigation className={classes.navigation}>
        <FormNavigation.Group
          title="Invitasjon av foreldre"
          {...getGroupProps(['foreldre', 'send'])}
        >
          <FormNavigation.Step {...getStepProps('foreldre')}>
            Registrer foreldre
          </FormNavigation.Step>
          <FormNavigation.Step variant="submission" {...getStepProps('send')}>
            Send invitasjon
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );

    return (
      <StepLayout
        navigation={navigation}
        navDialogRef={navDialogRef}
        heading={id && headings[id]}
        hasPrev={hasPrev()}
        hasNext={hasNext()}
        prev={prev}
        next={next}
        actions={
          id === 'foreldre' ? (
            <AvdelingDialog
              title="Legg til avdeling"
              description="Gi avdelingen et navn. Du kan endre det senere."
              triggerLabel="Legg til avdeling"
              triggerVariant={avdelinger.length === 0 ? 'primary' : 'secondary'}
              triggerIcon={<PlusIcon aria-hidden />}
              submitLabel="Opprett avdeling"
              onSubmit={onCreate}
              triggerId={leggTilAvdelingId}
            />
          ) : null
        }
        onSend={id === 'send' && !sent ? submit : undefined}
      >
        {id === 'foreldre' ? (
          <div className={classes.avdelinger}>
            {avdelinger.length === 0 && (
              <Paragraph>
                Du har ikke lagt til noen avdelinger ennå. Start med å legge til
                en avdeling, så kan du registrere foresatte under den.
              </Paragraph>
            )}
            {avdelinger.map((avdeling) => (
              <AvdelingSection
                key={avdeling.id}
                avdeling={avdeling}
                onChange={onChange}
                request={editRequest}
                onRequestHandled={clearEditRequest}
              />
            ))}
          </div>
        ) : (
          <Innsending
            avdelinger={avdelinger}
            errors={errors}
            attempt={attempt}
            sent={sent}
            submitted={submitted}
            onEdit={(request) => {
              setEditRequest(request);
              setId('foreldre');
            }}
            onRegister={() => setId('foreldre')}
            registerLabel="Registrer foreldre"
            onNavigateToError={(error) => {
              setId(error.step);
              requestAnimationFrame(() => focusFormField(error.focusId));
            }}
          />
        )}
      </StepLayout>
    );
  },
});

export const EgneSteg = meta.story({
  name: 'Repeterende data i egne steg',
  render() {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const {
      getStepProps,
      getGroupProps,
      id,
      setId,
      markInvalid,
      markCompleted,
      hasPrev,
      hasNext,
      prev,
      next,
    } = useFormNavigation<EgneStegId>({
      value: 'avdelinger',
      onChange: () => navDialogRef.current?.close(),
    });
    const {
      avdelinger,
      editRequest,
      setEditRequest,
      clearEditRequest,
      onCreate,
      onChange,
      onRemove,
    } = useAvdelinger();
    const errors = validate<EgneStegId>(
      avdelinger,
      'avdelinger',
      'foreldre',
      avdelingNavnId,
    );
    const { submitted, sent, attempt, submit } = useInnsending({
      errors,
      steps: ['avdelinger', 'foreldre'],
      markInvalid,
      markCompleted,
    });

    const navigation = (
      <FormNavigation className={classes.navigation}>
        <FormNavigation.Group
          title="Invitasjon av foreldre"
          {...getGroupProps(['avdelinger', 'foreldre', 'send'])}
        >
          <FormNavigation.Step {...getStepProps('avdelinger')}>
            Registrer avdelinger
          </FormNavigation.Step>
          <FormNavigation.Step {...getStepProps('foreldre')}>
            Registrer foreldre
          </FormNavigation.Step>
          <FormNavigation.Step variant="submission" {...getStepProps('send')}>
            Send invitasjon
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );

    return (
      <StepLayout
        navigation={navigation}
        navDialogRef={navDialogRef}
        heading={id && egneStegHeadings[id]}
        hasPrev={hasPrev()}
        hasNext={hasNext()}
        prev={prev}
        next={next}
        onSend={id === 'send' && !sent ? submit : undefined}
      >
        {id === 'avdelinger' && (
          <AvdelingRegistrering
            avdelinger={avdelinger}
            onCreate={onCreate}
            onChange={onChange}
            onRemove={onRemove}
            request={editRequest}
            onRequestHandled={clearEditRequest}
          />
        )}
        {id === 'foreldre' && (
          <div className={classes.avdelinger}>
            {avdelinger.length === 0 ? (
              <>
                <Paragraph>
                  Du må registrere minst én avdeling før du kan registrere
                  foresatte.
                </Paragraph>
                <Button variant="secondary" onClick={() => setId('avdelinger')}>
                  Registrer avdelinger
                </Button>
              </>
            ) : (
              avdelinger.map((avdeling) => (
                <AvdelingSection
                  key={avdeling.id}
                  avdeling={avdeling}
                  onChange={onChange}
                  canEditName={false}
                  request={editRequest}
                  onRequestHandled={clearEditRequest}
                />
              ))
            )}
          </div>
        )}
        {id === 'send' && (
          <Innsending
            avdelinger={avdelinger}
            errors={errors}
            attempt={attempt}
            sent={sent}
            submitted={submitted}
            onEdit={(request) => {
              setEditRequest(request);
              setId(request.foresattId ? 'foreldre' : 'avdelinger');
            }}
            onRegister={() => setId('avdelinger')}
            registerLabel="Registrer avdelinger"
            onNavigateToError={(error) => {
              setId(error.step);
              requestAnimationFrame(() => focusFormField(error.focusId));
            }}
          />
        )}
      </StepLayout>
    );
  },
});
