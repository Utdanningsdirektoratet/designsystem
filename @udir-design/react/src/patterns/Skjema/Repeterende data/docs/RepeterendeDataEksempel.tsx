import { Paragraph, Tooltip } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import cl from 'clsx/lite';
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
import { useDropzone } from 'react-dropzone';
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
import { Alert } from 'src/components/alert';
import { Button } from 'src/components/button';
import { Dialog } from 'src/components/dialog';
import { ErrorSummary } from 'src/components/errorSummary';
import { Field } from 'src/components/field';
import { FileUpload } from 'src/components/fileUpload';
import { FormNavigation } from 'src/components/formNavigation';
import { FormSummary } from 'src/components/formSummary';
import { List } from 'src/components/list';
import { Table } from 'src/components/table';
import { Textfield } from 'src/components/textfield';
import { ToggleGroup } from 'src/components/toggleGroup';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label/Label';
import { ValidationMessage } from 'src/components/typography/validationMessage';
import { useFormNavigation } from 'src/hooks/useFormNavigation';
import { focusFormField } from 'src/utilities/form/focus';
import classes from '../repeterendeData.stories.module.css';

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

const foresattFirstFieldId = (avdelingId: string) =>
  `foresatt-fornavn-${avdelingId}`;
export const avdelingNavnId = 'avdeling-navn';
export const leggTilAvdelingId = 'legg-til-avdeling';

type SendError<TStep extends string> = {
  id: string;
  step: TStep;
  message: string;
  focusId: string;
};

export function validate<TStep extends string>(
  avdelinger: Avdeling[],
  avdelingerStep: TStep,
  // A function gives each avdeling its own step.
  foreldreStep: TStep | ((avdeling: Avdeling) => TStep),
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
    if (typeof foreldreStep !== 'function' && foreldreStep !== avdelingerStep) {
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
      step:
        typeof foreldreStep === 'function'
          ? foreldreStep(avdeling)
          : foreldreStep,
      message: `${avdeling.navn}: Legg til minst én foresatt`,
      focusId: foresattFirstFieldId(avdeling.id),
    }));
}

export function useInnsending<TStep extends string>({
  errors,
  steps,
  activeStep,
  markInvalid,
  markCompleted,
  resetStep,
}: {
  errors: SendError<TStep>[];
  steps: TStep[];
  activeStep: TStep;
  markInvalid: (step: TStep) => void;
  markCompleted: (step: TStep) => void;
  resetStep: (step: TStep) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const errorSteps = errors.map((error) => error.step).join();

  // Mark a step as completed when the user leaves it with all required data filled in.
  const previousStep = useRef(activeStep);
  useEffect(() => {
    const left = previousStep.current;
    previousStep.current = activeStep;
    if (left === activeStep || !steps.includes(left)) return;
    if (!errors.some((error) => error.step === left)) markCompleted(left);
    else if (submitted) markInvalid(left);
    else resetStep(left);
    // Only run when the user changes step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

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

export const AvdelingDialog = ({
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

type RegistreringsMetode = 'skjema' | 'fil';

type AvdelingSectionProps = {
  avdeling: Avdeling;
  onChange: (avdeling: Avdeling) => void;
  canEditName?: boolean;
  // Hide when the surrounding step heading already names the avdeling.
  showHeading?: boolean;
  // Lets the user choose between the form and a CSV import, with the table below.
  bulkImport?: boolean;
  // Lets a parent that unmounts the section keep the last used method.
  registreringsMetode?: RegistreringsMetode;
  onRegistreringsMetodeChange?: (metode: RegistreringsMetode) => void;
  request?: EditRequest;
  onRequestHandled?: () => void;
};

const emptyForesatt: ForesattValues = {
  navn: '',
  fornavn: '',
  epost: '',
  mobilnummer: '',
};

type CsvRowError = { line: number; text: string; message: string };

const csvHeaderStart = 'barnets fornavn';

// Rows are `Barnets fornavn; Foresatt; E-post; Mobilnummer`, with an optional header row.
const parseForesattCsv = (text: string) => {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line, index) => ({ text: line, line: index + 1 }))
    .filter(({ text }) => text.trim() !== '');
  const delimiter =
    [';', '\t', ','].find((d) => lines[0]?.text.includes(d)) ?? ';';
  const rows: ForesattValues[] = [];
  const errors: CsvRowError[] = [];

  lines.forEach(({ text, line }, index) => {
    const cells = text
      .split(delimiter)
      .map((cell) => cell.trim().replace(/^"(.*)"$/, '$1'));
    if (index === 0 && cells[0].toLowerCase() === csvHeaderStart) return;
    if (cells.length !== 4) {
      errors.push({
        line,
        text,
        message: 'Raden må ha fire kolonner',
      });
      return;
    }
    const [fornavn, navn, epost, mobilnummer] = cells;
    const result = ForesattSchema.safeParse({
      fornavn,
      navn,
      epost,
      mobilnummer,
    });
    if (result.success) rows.push(result.data);
    else errors.push({ line, text, message: result.error.issues[0].message });
  });

  return { rows, errors };
};

const maxCsvSize = 1024 * 1024;

const rejectionMessage = (code: string) => {
  switch (code) {
    case 'file-too-large':
      return 'Filen er for stor. Maks størrelse er 1 MB.';
    case 'file-invalid-type':
      return 'Filen må være en CSV-fil (.csv).';
    default:
      return 'Du kan bare laste opp én fil om gangen.';
  }
};

type ImportResult = { imported: number; errors: CsvRowError[] };

const ForesattImport = ({
  onImport,
}: {
  onImport: (rows: ForesattValues[]) => void;
}) => {
  const [result, setResult] = useState<ImportResult>();
  const [fileError, setFileError] = useState<string>();

  const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
    useDropzone({
      multiple: false,
      maxSize: maxCsvSize,
      accept: {
        'text/csv': ['.csv'],
        'application/vnd.ms-excel': ['.csv'],
        'text/plain': ['.csv', '.txt'],
      },
      onDropAccepted: async ([file]) => {
        setFileError(undefined);
        const { rows, errors } = parseForesattCsv(await file.text());
        if (rows.length === 0 && errors.length === 0) {
          setResult(undefined);
          setFileError('Filen inneholder ingen rader.');
          return;
        }
        if (rows.length > 0) onImport(rows);
        setResult({ imported: rows.length, errors });
      },
      onDropRejected: ([rejection]) => {
        setResult(undefined);
        setFileError(rejectionMessage(rejection.errors[0].code));
      },
    });

  return (
    <div className={classes.addSection}>
      <FileUpload.Dropzone
        label="Last opp CSV-fil"
        description="Én rad per foresatt, med kolonnene Barnets fornavn, Foresatt, E-post og Mobilnummer atskilt med semikolon, komma eller tabulator. Første rad kan være en overskriftsrad."
        inputProps={getInputProps()}
        cardProps={getRootProps()}
        isDragActive={isDragActive}
        isDragGlobal={isDragGlobal}
        error={fileError}
      />
      <output>
        {result && (
          <Alert data-color={result.errors.length > 0 ? 'warning' : 'success'}>
            <Paragraph>
              {result.imported === 1
                ? 'Importerte 1 foresatt.'
                : `Importerte ${result.imported} foresatte.`}
              {result.errors.length > 0 &&
                (result.errors.length === 1
                  ? ' 1 rad hadde feil og ble ikke importert. Rett opp raden i filen og last den opp på nytt.'
                  : ` ${result.errors.length} rader hadde feil og ble ikke importert. Rett opp radene i filen og last den opp på nytt.`)}
            </Paragraph>
            {result.errors.length > 0 && (
              <List.Unordered>
                {result.errors.map(({ line, text, message }) => (
                  <List.Item key={line}>
                    Rad {line}: {message} ({text})
                  </List.Item>
                ))}
              </List.Unordered>
            )}
          </Alert>
        )}
      </output>
    </div>
  );
};

type ForesattFieldsProps = {
  register: UseFormRegister<ForesattValues>;
  errors: FieldErrors<ForesattValues>;
  focusFirst?: boolean;
  firstFieldId?: string;
};

// React's autoFocus prop doesn't work inside a Dialog; the native attribute does.
const nativeAutofocus = { autofocus: 'true' };

const ForesattFields = ({
  register,
  errors,
  focusFirst,
  firstFieldId,
}: ForesattFieldsProps) => (
  <>
    <Textfield
      {...(focusFirst ? nativeAutofocus : {})}
      id={firstFieldId}
      label="Barnets fornavn"
      autoComplete="off"
      {...register('fornavn')}
      error={errors.fornavn?.message}
    />
    <Textfield
      label="Navn på foresatt"
      autoComplete="off"
      {...register('navn')}
      error={errors.navn?.message}
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

export const AvdelingSection = ({
  avdeling,
  onChange,
  canEditName = true,
  showHeading = true,
  bulkImport = false,
  registreringsMetode,
  onRegistreringsMetodeChange,
  request,
  onRequestHandled,
}: AvdelingSectionProps) => {
  const headingId = useId();
  const formHeadingId = useId();
  const tableHeadingId = useId();
  const [localMode, setLocalMode] = useState<RegistreringsMetode>('skjema');
  const mode = registreringsMetode ?? localMode;
  const setMode = (metode: RegistreringsMetode) => {
    setLocalMode(metode);
    onRegistreringsMetodeChange?.(metode);
  };
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
    if (focusRequest > 0) setFocus('fornavn');
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

  const table = avdeling.foresatte.length > 0 && (
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
            <Table.HeaderCell>Barnets fornavn</Table.HeaderCell>
            <Table.HeaderCell>Foresatt</Table.HeaderCell>
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
              <Table.Cell>{foresatt.fornavn}</Table.Cell>
              <Table.Cell>{foresatt.navn}</Table.Cell>
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
  );

  const addForm = (
    <div className={classes.addSection}>
      {!bulkImport && (
        <Heading id={formHeadingId} level={4} data-size="xs">
          Legg til foresatt
        </Heading>
      )}
      <form
        className={classes.form}
        onSubmit={onSubmit}
        noValidate
        aria-labelledby={formHeadingId}
      >
        <ForesattFields
          register={register}
          errors={errors}
          firstFieldId={foresattFirstFieldId(avdeling.id)}
        />
        <Field className={classes.formButtons}>
          <Button type="submit">Legg til</Button>
        </Field>
      </form>
    </div>
  );

  return (
    <section
      className={cl(classes.avdeling, bulkImport && classes.avdelingBulk)}
      aria-labelledby={showHeading ? headingId : undefined}
      aria-label={showHeading ? undefined : avdeling.navn}
    >
      {showHeading && (
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
      )}
      {bulkImport ? (
        <>
          <Heading id={formHeadingId} level={4} data-size="xs">
            Legg til foresatte
          </Heading>
          <ToggleGroup
            aria-label="Hvordan vil du registrere foreldre?"
            value={mode}
            onChange={(value) => setMode(value as RegistreringsMetode)}
          >
            <ToggleGroup.Item value="skjema">Fyll ut skjema</ToggleGroup.Item>
            <ToggleGroup.Item value="fil">Importer fra fil</ToggleGroup.Item>
          </ToggleGroup>
          <div hidden={mode !== 'skjema'}>{addForm}</div>
          <div hidden={mode !== 'fil'}>
            <ForesattImport
              onImport={(rows) =>
                onChange({
                  ...avdeling,
                  foresatte: [
                    ...avdeling.foresatte,
                    ...rows.map((row) => ({ id: crypto.randomUUID(), ...row })),
                  ],
                })
              }
            />
          </div>
          <div className={cl(classes.addSection, classes.registrerte)}>
            <Heading id={tableHeadingId} level={4} data-size="xs">
              Registrerte foresatte ({avdeling.foresatte.length})
            </Heading>
            {table || (
              <Paragraph>Ingen foresatte er registrert ennå.</Paragraph>
            )}
          </div>
        </>
      ) : (
        <>
          {table}
          {addForm}
        </>
      )}
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

type AvdelingRegistreringProps = {
  avdelinger: Avdeling[];
  onCreate: (navn: string) => void;
  onChange: (avdeling: Avdeling) => void;
  onRemove: (avdeling: Avdeling) => void;
  request?: EditRequest;
  onRequestHandled?: () => void;
};

export const AvdelingRegistrering = ({
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
  visning?: 'tabell';
};

const OppsummeringTabell = ({
  avdelinger,
  submitted,
  onEdit,
}: Pick<OppsummeringProps, 'avdelinger' | 'submitted' | 'onEdit'>) => (
  <div className={classes.summaryTables}>
    <Heading level={3} data-size="xs">
      Registrerte foreldre
    </Heading>
    {avdelinger.map((avdeling) => (
      <section
        key={avdeling.id}
        className={classes.avdeling}
        aria-label={avdeling.navn}
      >
        <div className={classes.avdelingHeader}>
          <Heading level={4} data-size="2xs">
            {avdeling.navn}
          </Heading>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => onEdit({ avdelingId: avdeling.id })}
          >
            <NotePencilIcon aria-hidden />
            Rediger
            <span className="ds-sr-only"> {avdeling.navn}</span>
          </Button>
        </div>
        {avdeling.foresatte.length === 0 ? (
          <>
            <Paragraph>Ingen foresatte er registrert.</Paragraph>
            {submitted && (
              <ValidationMessage>Legg til minst én foresatt</ValidationMessage>
            )}
          </>
        ) : (
          <div className={classes.tableScroll}>
            <Table className={classes.table}>
              <caption className="ds-sr-only">
                Foresatte i {avdeling.navn}
              </caption>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col className={classes.actionColumn} />
              </colgroup>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Barnets fornavn</Table.HeaderCell>
                  <Table.HeaderCell>Foresatt</Table.HeaderCell>
                  <Table.HeaderCell>E-post</Table.HeaderCell>
                  <Table.HeaderCell>Mobilnummer</Table.HeaderCell>
                  <Table.HeaderCell>
                    <span className="ds-sr-only">Rediger</span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {avdeling.foresatte.map((foresatt) => (
                  <Table.Row key={foresatt.id}>
                    <Table.Cell>{foresatt.fornavn}</Table.Cell>
                    <Table.Cell>{foresatt.navn}</Table.Cell>
                    <Table.Cell>{foresatt.epost}</Table.Cell>
                    <Table.Cell>{foresatt.mobilnummer}</Table.Cell>
                    <Table.Cell>
                      <Tooltip content="Rediger">
                        <Button
                          icon
                          variant="tertiary"
                          aria-label={`Rediger ${foresatt.navn}`}
                          onClick={() =>
                            onEdit({
                              avdelingId: avdeling.id,
                              foresattId: foresatt.id,
                            })
                          }
                        >
                          <NotePencilIcon aria-hidden />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </section>
    ))}
  </div>
);

const Oppsummering = ({
  avdelinger,
  submitted,
  onEdit,
  onRegister,
  registerLabel,
  visning,
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

  if (visning === 'tabell') {
    return (
      <OppsummeringTabell
        avdelinger={avdelinger}
        submitted={submitted}
        onEdit={onEdit}
      />
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
                title={foresatt.fornavn}
                headingLevel={5}
                onEdit={() =>
                  onEdit({ avdelingId: avdeling.id, foresattId: foresatt.id })
                }
              >
                <FormSummary.Fields>
                  <FormSummary.Field
                    label="Navn på foresatt"
                    value={foresatt.navn}
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

export function Innsending<TStep extends string>({
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

export function useAvdelinger() {
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

export const StepLayout = ({
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

type DynamiskStegId = 'avdelinger' | 'send' | `avdeling-${string}`;

const avdelingStepId = (avdeling: Avdeling): DynamiskStegId =>
  `avdeling-${avdeling.id}`;

export const DynamiskeStegEksempel = ({
  gruppert,
  visning,
}: {
  gruppert?: boolean;
  visning?: 'tabell';
}) => {
  const navDialogRef = useRef<HTMLDialogElement>(null);
  // Each avdeling has its own step, so the last used method is kept here and reused by every step.
  const [metode, setMetode] = useState<RegistreringsMetode>('skjema');
  const {
    avdelinger,
    editRequest,
    setEditRequest,
    clearEditRequest,
    onCreate,
    onChange,
    onRemove,
  } = useAvdelinger();
  const avdelingSteps = avdelinger.map(avdelingStepId);
  const {
    getStepProps,
    getGroupProps,
    id,
    setId,
    markInvalid,
    markCompleted,
    resetStep,
    hasPrev,
    hasNext,
    prev,
    next,
  } = useFormNavigation<DynamiskStegId>({
    value: 'avdelinger',
    // Explicit order, since the steps change as avdelinger are added and removed.
    order: ['avdelinger', ...avdelingSteps, 'send'],
    onChange: () => navDialogRef.current?.close(),
  });
  const errors = validate<DynamiskStegId>(
    avdelinger,
    'avdelinger',
    avdelingStepId,
    avdelingNavnId,
  );
  const { submitted, sent, attempt, submit } = useInnsending({
    errors,
    steps: ['avdelinger', ...avdelingSteps],
    activeStep: id,
    markInvalid,
    markCompleted,
    resetStep,
  });

  const activeAvdeling = avdelinger.find(
    (avdeling) => avdelingStepId(avdeling) === id,
  );
  const heading =
    id === 'avdelinger'
      ? 'Registrer avdelinger'
      : id === 'send'
        ? 'Send invitasjon'
        : activeAvdeling && `Registrer foreldre i ${activeAvdeling.navn}`;

  const avdelingStepElements = avdelinger.map((avdeling) => (
    <FormNavigation.Step
      key={avdeling.id}
      {...getStepProps(avdelingStepId(avdeling))}
    >
      {avdeling.navn}
    </FormNavigation.Step>
  ));

  const navigation = gruppert ? (
    <FormNavigation className={classes.navigation}>
      <FormNavigation.Step {...getStepProps('avdelinger')}>
        Registrer avdelinger
      </FormNavigation.Step>
      {avdelinger.length > 0 && (
        <FormNavigation.Group
          title="Registrer foreldre"
          {...getGroupProps(avdelingSteps)}
        >
          {avdelingStepElements}
        </FormNavigation.Group>
      )}
      <FormNavigation.Step variant="submission" {...getStepProps('send')}>
        Send invitasjon
      </FormNavigation.Step>
    </FormNavigation>
  ) : (
    <FormNavigation className={classes.navigation}>
      <FormNavigation.Group
        title="Invitasjon av foreldre"
        {...getGroupProps(['avdelinger', ...avdelingSteps, 'send'])}
      >
        <FormNavigation.Step {...getStepProps('avdelinger')}>
          Registrer avdelinger
        </FormNavigation.Step>
        {avdelingStepElements}
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
      heading={heading}
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
      {activeAvdeling && (
        <div className={classes.avdelinger}>
          <AvdelingSection
            key={activeAvdeling.id}
            avdeling={activeAvdeling}
            onChange={onChange}
            canEditName={false}
            showHeading={false}
            bulkImport={gruppert}
            registreringsMetode={metode}
            onRegistreringsMetodeChange={setMetode}
            request={editRequest}
            onRequestHandled={clearEditRequest}
          />
        </div>
      )}
      {id === 'send' && (
        <Innsending
          avdelinger={avdelinger}
          visning={visning}
          errors={errors}
          attempt={attempt}
          sent={sent}
          submitted={submitted}
          onEdit={(request) => {
            setEditRequest(request);
            setId(
              request.foresattId
                ? `avdeling-${request.avdelingId}`
                : 'avdelinger',
            );
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
};
