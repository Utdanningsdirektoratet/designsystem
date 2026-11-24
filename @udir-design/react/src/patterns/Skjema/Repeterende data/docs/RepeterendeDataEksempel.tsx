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
    // Accept spaces and a Norwegian country code, since people often write the number that way.
    .transform((value) =>
      value.replace(/\s/g, '').replace(/^(\+|00)47(?=\d{8}$)/, ''),
    )
    .pipe(z.string().regex(/^\d{8}$/, 'Mobilnummer må ha 8 siffer')),
});
type ForesattValues = z.infer<typeof ForesattSchema>;
type ForesattFelt = keyof ForesattValues;
type ForesattErrors = Partial<Record<ForesattFelt, string>>;

// Imported rows may be invalid, so errors are derived from the data and disappear once fixed.
const getForesattErrors = (foresatt: ForesattValues): ForesattErrors => {
  const result = ForesattSchema.safeParse(foresatt);
  const errors: ForesattErrors = {};
  for (const issue of result.error?.issues ?? []) {
    errors[issue.path[0] as ForesattFelt] ??= issue.message;
  }
  return errors;
};

const foresattLabel = (foresatt: ForesattValues) =>
  foresatt.navn || foresatt.fornavn || 'foresatt uten navn';

const foresattFirstFieldId = (avdelingId: string) =>
  `foresatt-fornavn-${avdelingId}`;
const foresattEditId = (foresattId: string) => `rediger-foresatt-${foresattId}`;
const avdelingNavnId = 'avdeling-navn';

// Announces changes that don't move focus. The region is always rendered, so screen readers notice new text.
// A new key replaces the text node, so the same message is read again.
export const useStatusMessage = () => {
  const [status, setStatus] = useState({ key: 0, text: '' });
  const announce = (text: string) =>
    setStatus((prev) => ({ key: prev.key + 1, text }));
  const statusMessage = (
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- `output` isn't announced consistently by screen readers.
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="ds-sr-only"
    >
      <span key={status.key}>{status.text}</span>
    </div>
  );
  return { statusMessage, announce };
};

type SendError<TStep extends string> = {
  id: string;
  step: TStep;
  message: string;
  focusId: string;
};

type DynamiskStegId = 'avdelinger' | 'send' | `avdeling-${string}`;

const avdelingStepId = (avdeling: Avdeling): DynamiskStegId =>
  `avdeling-${avdeling.id}`;

const validate = (avdelinger: Avdeling[]): SendError<DynamiskStegId>[] => {
  if (avdelinger.length === 0) {
    return [
      {
        id: 'avdelinger',
        step: 'avdelinger',
        message: 'Legg til minst én avdeling',
        focusId: avdelingNavnId,
      },
    ];
  }
  return avdelinger.flatMap((avdeling): SendError<DynamiskStegId>[] => {
    const step = avdelingStepId(avdeling);
    if (avdeling.foresatte.length === 0) {
      return [
        {
          id: avdeling.id,
          step,
          message: `${avdeling.navn}: Legg til minst én foresatt`,
          focusId: foresattFirstFieldId(avdeling.id),
        },
      ];
    }
    // Imported rows can be invalid until the user fixes them.
    return avdeling.foresatte.flatMap((foresatt) => {
      const messages = Object.values(getForesattErrors(foresatt));
      if (messages.length === 0) return [];
      return [
        {
          id: foresatt.id,
          step,
          message: `${avdeling.navn}, ${foresattLabel(foresatt)}: ${messages.join(', ')}`,
          focusId: foresattEditId(foresatt.id),
        },
      ];
    });
  });
};

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
  const [sent, setSent] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const submitted = attempt > 0;
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
    setAttempt((n) => n + 1);
    if (errors.length === 0) setSent(true);
  };

  return { submitted, sent, attempt, submit };
}

type AvdelingDialogProps = {
  avdeling: Avdeling;
  onSubmit: (navn: string) => void;
  // Focus returns to the trigger and the change happens elsewhere, so the parent announces it.
  announce: (text: string) => void;
  openRequested: boolean;
  onOpenHandled: () => void;
};

const AvdelingDialog = ({
  avdeling,
  onSubmit,
  announce,
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
    defaultValues: { navn: avdeling.navn },
  });

  useEffect(() => {
    if (!openRequested) return;
    reset({ navn: avdeling.navn });
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    onOpenHandled();
  }, [openRequested, reset, avdeling.navn, onOpenHandled]);

  const onValid = ({ navn }: AvdelingValues) => {
    onSubmit(navn);
    dialogRef.current?.close();
    announce(`Avdelingen heter nå ${navn}.`);
  };

  return (
    <>
      <Tooltip content={`Rediger ${avdeling.navn}`}>
        <Button
          icon
          variant="tertiary"
          aria-haspopup="dialog"
          onClick={() => {
            reset({ navn: avdeling.navn });
            dialogRef.current?.showModal();
          }}
        >
          <NotePencilIcon aria-hidden />
          <span className="ds-sr-only">Rediger {avdeling.navn}</span>
        </Button>
      </Tooltip>
      <Dialog ref={dialogRef} closedby="any" className={classes.dialog}>
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Heading level={2} data-size="xs">
              Rediger avdeling
            </Heading>
            <Paragraph data-size="sm">Endre navnet på avdelingen.</Paragraph>
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
              <Button type="submit">Lagre</Button>
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

type RegistreringsMetode = 'skjema' | 'fil' | 'lim-inn';

type AvdelingSectionProps = {
  avdeling: Avdeling;
  onChange: (avdeling: Avdeling) => void;
  // Lets the user choose between the form, a CSV file and pasting from a spreadsheet.
  bulkImport?: boolean;
  registreringsMetode: RegistreringsMetode;
  onRegistreringsMetodeChange: (metode: RegistreringsMetode) => void;
  request?: EditRequest;
  onRequestHandled: () => void;
};

const emptyForesatt: ForesattValues = {
  navn: '',
  fornavn: '',
  epost: '',
  mobilnummer: '',
};

const csvHeaderStart = 'barnets fornavn';

// Rows are `Barnets fornavn; Foresatt; E-post; Mobilnummer`, with an optional header row.
// Every row is imported, even with invalid values. Only text that can't be read gives an error.
// Used both for uploaded files and for rows pasted from a spreadsheet, which are tab separated.
const parseForesattCsv = (
  text: string,
): { rows: ForesattValues[] } | { error: string } => {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line, index) => ({ text: line, line: index + 1 }))
    .filter(({ text }) => text.trim() !== '');
  const delimiter =
    [';', '\t', ','].find((d) => lines[0]?.text.includes(d)) ?? ';';
  const rows: ForesattValues[] = [];

  for (const [index, { text, line }] of lines.entries()) {
    const cells = text
      .split(delimiter)
      .map((cell) => cell.trim().replace(/^"(.*)"$/, '$1'));
    if (index === 0 && cells[0].toLowerCase() === csvHeaderStart) continue;
    if (cells.length !== 4) {
      return {
        error: `Rad ${line} har ikke fire kolonner. Sjekk at hver rad har fire verdier atskilt med semikolon, komma eller tabulator.`,
      };
    }
    const [fornavn, navn, epost, mobilnummer] = cells;
    const row = { fornavn, navn, epost, mobilnummer };
    // Store valid rows normalized, like rows added with the form.
    rows.push(ForesattSchema.safeParse(row).data ?? row);
  }

  if (rows.length === 0) return { error: 'Fant ingen foresatte å legge til.' };
  return { rows };
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

type ImportResult = { key: number; imported: number; invalid: number };

const useImportResult = (onImport: (rows: ForesattValues[]) => void) => {
  const [result, setResult] = useState<ImportResult>();
  const importRows = (rows: ForesattValues[]) => {
    onImport(rows);
    setResult((prev) => ({
      key: (prev?.key ?? 0) + 1,
      imported: rows.length,
      invalid: rows.filter(
        (row) => Object.keys(getForesattErrors(row)).length > 0,
      ).length,
    }));
  };
  return { result, importRows, clearResult: () => setResult(undefined) };
};

// The region is rendered before the result, so screen readers announce it. The key makes a repeated import announce again.
const ImportResultMessage = ({ result }: { result?: ImportResult }) => (
  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- `output` isn't announced consistently by screen readers.
  <div role="status" aria-live="polite" aria-atomic="true">
    {result && (
      <Alert
        key={result.key}
        data-color={result.invalid > 0 ? 'warning' : 'success'}
      >
        <Paragraph>
          {result.imported === 1
            ? '1 foresatt ble lagt til.'
            : `${result.imported} foresatte ble lagt til.`}
          {result.invalid > 0 &&
            ` ${result.invalid} av dem har feil som må rettes før du kan sende invitasjonen. Feilene er markert i tabellen. Bruk «Rediger» for å rette dem.`}
        </Paragraph>
      </Alert>
    )}
  </div>
);

type ImportProps = { onImport: (rows: ForesattValues[]) => void };

const ForesattFileImport = ({ onImport }: ImportProps) => {
  const { result, importRows, clearResult } = useImportResult(onImport);
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
        const parsed = parseForesattCsv(await file.text());
        if ('error' in parsed) {
          clearResult();
          setFileError(parsed.error);
          return;
        }
        setFileError(undefined);
        importRows(parsed.rows);
      },
      onDropRejected: ([rejection]) => {
        clearResult();
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
      <ImportResultMessage result={result} />
    </div>
  );
};

const ForesattPaste = ({ onImport }: ImportProps) => {
  const { result, importRows, clearResult } = useImportResult(onImport);
  const [text, setText] = useState('');
  const [error, setError] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const parsed = text.trim()
      ? parseForesattCsv(text)
      : { error: 'Lim inn minst én rad fra regnearket' };
    if ('error' in parsed) {
      clearResult();
      setError(parsed.error);
      textareaRef.current?.focus();
      return;
    }
    setError(undefined);
    setText('');
    importRows(parsed.rows);
  };

  return (
    <form className={classes.addSection} onSubmit={onSubmit} noValidate>
      <Textfield
        ref={textareaRef}
        multiline
        rows={6}
        label="Lim inn fra regneark"
        description="Kopier radene fra for eksempel Excel og lim dem inn her. Kolonnene må komme i rekkefølgen Barnets fornavn, Foresatt, E-post og Mobilnummer."
        value={text}
        onChange={(event) => setText(event.target.value)}
        error={error}
      />
      <Button type="submit">Legg til foresatte</Button>
      <ImportResultMessage result={result} />
    </form>
  );
};

type ForesattFieldsProps = {
  register: UseFormRegister<ForesattValues>;
  errors: FieldErrors<ForesattValues>;
  focusFirst?: boolean;
  firstFieldId?: string;
};

const foresattColumns = [
  ['fornavn', 'Barnets fornavn'],
  ['navn', 'Foresatt'],
  ['epost', 'E-post'],
  ['mobilnummer', 'Mobilnummer'],
] as const;

const foresattFieldProps: Record<
  ForesattFelt,
  { label: string; type?: 'email' | 'tel' }
> = {
  fornavn: { label: 'Barnets fornavn' },
  navn: { label: 'Navn på foresatt' },
  epost: { label: 'E-post', type: 'email' },
  mobilnummer: { label: 'Mobilnummer', type: 'tel' },
};

// Shorter than the form messages, so they fit in a narrow cell. The full messages are in the dialog and error summary.
const shortError = (field: ForesattFelt, value: string) => {
  if (!value.trim()) return 'Mangler';
  return field === 'epost' ? 'Ugyldig e-post' : 'Må ha 8 siffer';
};

// Imported rows can be invalid, so the row is tinted and each invalid field shows a short message.
const ForesattRow = ({
  foresatt,
  children,
}: {
  foresatt: ForesattValues;
  children: ReactNode;
}) => {
  const errors = getForesattErrors(foresatt);
  const invalid = Object.keys(errors).length > 0;
  return (
    <Table.Row className={invalid ? classes.invalidRow : undefined}>
      {foresattColumns.map(([field]) => (
        <Table.Cell
          key={field}
          className={field === 'epost' ? classes.epostCell : undefined}
        >
          {errors[field] ? (
            <div className={classes.invalidCell}>
              {foresatt[field] && <span>{foresatt[field]}</span>}
              <ValidationMessage data-size="sm">
                {shortError(field, foresatt[field])}
              </ValidationMessage>
            </div>
          ) : (
            foresatt[field]
          )}
        </Table.Cell>
      ))}
      {children}
    </Table.Row>
  );
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
    {foresattColumns.map(([field], index) => (
      <Textfield
        key={field}
        {...(focusFirst && index === 0 ? nativeAutofocus : {})}
        id={index === 0 ? firstFieldId : undefined}
        label={foresattFieldProps[field].label}
        type={foresattFieldProps[field].type}
        autoComplete="off"
        {...register(field)}
        error={errors[field]?.message}
      />
    ))}
  </>
);

const AvdelingSection = ({
  avdeling,
  onChange,
  bulkImport,
  registreringsMetode,
  onRegistreringsMetodeChange,
  request,
  onRequestHandled,
}: AvdelingSectionProps) => {
  const formHeadingId = useId();
  const tableHeadingId = useId();
  const tableHeadingRef = useRef<HTMLHeadingElement>(null);
  const { statusMessage, announce } = useStatusMessage();
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  // Validate on change, since startEdit shows errors before the form is submitted.
  const editForm = useForm<ForesattValues>({
    resolver: zodResolver(ForesattSchema),
    defaultValues: emptyForesatt,
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForesattValues>({
    resolver: zodResolver(ForesattSchema),
    defaultValues: emptyForesatt,
  });

  const onSubmit = async (event: SyntheticEvent) => {
    let saved: ForesattValues | undefined;
    await handleSubmit((values) => {
      onChange({
        ...avdeling,
        foresatte: [
          ...avdeling.foresatte,
          { id: crypto.randomUUID(), ...values },
        ],
      });
      saved = values;
    })(event);
    // handleSubmit marks the form as submitted after the callback, so reset must come after it.
    if (saved) {
      reset(emptyForesatt);
      // The user is likely to add more, so focus goes back to the first field.
      document
        .getElementById(foresattFirstFieldId(avdeling.id))
        ?.focus({ preventScroll: true });
      announce(`${foresattLabel(saved)} er lagt til.`);
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
    announce(`Endringene for ${foresattLabel(values)} er lagret.`);
  };

  const startEdit = (foresatt: Foresatt) => {
    setEditingId(foresatt.id);
    editForm.reset(foresatt);
    editDialogRef.current?.showModal();
    // Show errors right away for imported rows that are invalid.
    void editForm.trigger();
  };

  const foresattRequest = avdeling.foresatte.find(
    (f) => f.id === request?.foresattId,
  );

  useEffect(() => {
    if (!foresattRequest) return;
    if (!editDialogRef.current?.open) startEdit(foresattRequest);
    onRequestHandled();
    // startEdit is recreated every render; only a new request should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foresattRequest, onRequestHandled]);

  // A row is quick to add again, so it's deleted without confirmation.
  const remove = (foresatt: Foresatt) => {
    onChange({
      ...avdeling,
      foresatte: avdeling.foresatte.filter((f) => f.id !== foresatt.id),
    });
    // The button is gone, so focus moves to the heading, which also reads the new count.
    tableHeadingRef.current?.focus({ preventScroll: true });
    announce(`${foresattLabel(foresatt)} er slettet.`);
  };

  const importRows = (rows: ForesattValues[]) =>
    onChange({
      ...avdeling,
      foresatte: [
        ...avdeling.foresatte,
        ...rows.map((row) => ({ id: crypto.randomUUID(), ...row })),
      ],
    });

  const addForm = (
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
        <Button type="submit">Legg til foresatt</Button>
      </Field>
    </form>
  );

  return (
    <section
      className={cl(classes.avdeling, bulkImport && classes.avdelingBulk)}
      aria-label={avdeling.navn}
    >
      <div className={classes.addSection}>
        <Heading id={formHeadingId} level={4} data-size="xs">
          {bulkImport ? 'Legg til foresatte' : 'Legg til foresatt'}
          {/* Each section has its own form, so the name keeps the form landmarks unique. */}
          <span className="ds-sr-only"> i {avdeling.navn}</span>
        </Heading>
        {bulkImport ? (
          <>
            <ToggleGroup
              aria-label="Hvordan vil du legge til foresatte?"
              value={registreringsMetode}
              onChange={(value) =>
                onRegistreringsMetodeChange(value as RegistreringsMetode)
              }
            >
              <ToggleGroup.Item value="skjema">Fyll ut skjema</ToggleGroup.Item>
              <ToggleGroup.Item value="fil">Last opp fil</ToggleGroup.Item>
              <ToggleGroup.Item value="lim-inn">Lim inn</ToggleGroup.Item>
            </ToggleGroup>
            <div hidden={registreringsMetode !== 'skjema'}>{addForm}</div>
            <div hidden={registreringsMetode !== 'fil'}>
              <ForesattFileImport onImport={importRows} />
            </div>
            <div hidden={registreringsMetode !== 'lim-inn'}>
              <ForesattPaste onImport={importRows} />
            </div>
          </>
        ) : (
          addForm
        )}
      </div>
      <div className={cl(classes.addSection, classes.registrerte)}>
        <Heading
          ref={tableHeadingRef}
          id={tableHeadingId}
          level={4}
          data-size="xs"
          tabIndex={-1}
        >
          Registrerte foresatte ({avdeling.foresatte.length})
        </Heading>
        {avdeling.foresatte.length === 0 ? (
          <Paragraph>Ingen foresatte er registrert ennå.</Paragraph>
        ) : (
          <div className={classes.tableScroll}>
            <Table className={classes.table} aria-labelledby={tableHeadingId}>
              <colgroup>
                {foresattColumns.map(([field]) => (
                  <col key={field} />
                ))}
                <col className={classes.actionColumn} />
                <col className={classes.actionColumn} />
              </colgroup>
              <Table.Head>
                <Table.Row>
                  {foresattColumns.map(([field, label]) => (
                    <Table.HeaderCell key={field}>{label}</Table.HeaderCell>
                  ))}
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
                  <ForesattRow key={foresatt.id} foresatt={foresatt}>
                    <Table.Cell>
                      <Tooltip content="Rediger">
                        <Button
                          id={foresattEditId(foresatt.id)}
                          icon
                          variant="tertiary"
                          aria-haspopup="dialog"
                          onClick={() => startEdit(foresatt)}
                        >
                          <NotePencilIcon aria-hidden />
                          <span className="ds-sr-only">
                            Rediger {foresattLabel(foresatt)}
                          </span>
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip content="Slett">
                        <Button
                          icon
                          variant="tertiary"
                          data-color="danger"
                          onClick={() => remove(foresatt)}
                        >
                          <TrashIcon aria-hidden />
                          <span className="ds-sr-only">
                            Slett {foresattLabel(foresatt)}
                          </span>
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </ForesattRow>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
      {statusMessage}
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
  onRequestHandled: () => void;
};

const AvdelingRegistrering = ({
  avdelinger,
  onCreate,
  onChange,
  onRemove,
  request,
  onRequestHandled,
}: AvdelingRegistreringProps) => {
  const tableHeadingId = useId();
  const tableHeadingRef = useRef<HTMLHeadingElement>(null);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [pendingRemoval, setPendingRemoval] = useState<Avdeling>();
  const { statusMessage, announce } = useStatusMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvdelingValues>({
    resolver: zodResolver(AvdelingSchema),
    defaultValues: { navn: '' },
  });

  const onSubmit = async (event: SyntheticEvent) => {
    let saved: string | undefined;
    await handleSubmit(({ navn }) => {
      onCreate(navn);
      saved = navn;
    })(event);
    if (saved) {
      reset({ navn: '' });
      document.getElementById(avdelingNavnId)?.focus({ preventScroll: true });
      announce(`${saved} er lagt til.`);
    }
  };

  const remove = (avdeling: Avdeling) => {
    onRemove(avdeling);
    // The button is gone, so focus moves to the heading, which also reads the new count.
    tableHeadingRef.current?.focus({ preventScroll: true });
    announce(`${avdeling.navn} er slettet.`);
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
      <div className={cl(classes.addSection, classes.registrerte)}>
        <Heading
          ref={tableHeadingRef}
          id={tableHeadingId}
          level={3}
          data-size="xs"
          tabIndex={-1}
        >
          Registrerte avdelinger ({avdelinger.length})
        </Heading>
        {avdelinger.length === 0 ? (
          <Paragraph>Ingen avdelinger er registrert ennå.</Paragraph>
        ) : (
          <div className={classes.tableScroll}>
            <Table
              className={classes.avdelingTable}
              aria-labelledby={tableHeadingId}
            >
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
                        avdeling={avdeling}
                        announce={announce}
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
                          aria-haspopup="dialog"
                          // Deleting an avdeling also deletes its foresatte, so ask first.
                          onClick={() => {
                            setPendingRemoval(avdeling);
                            confirmDialogRef.current?.showModal();
                          }}
                        >
                          <TrashIcon aria-hidden />
                          <span className="ds-sr-only">
                            Slett {avdeling.navn}
                          </span>
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
      {statusMessage}
      <Dialog
        ref={confirmDialogRef}
        closedby="any"
        className={classes.dialog}
        onClose={() => setPendingRemoval(undefined)}
      >
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Heading level={2} data-size="xs">
              Vil du slette {pendingRemoval?.navn}?
            </Heading>
            <Paragraph data-size="sm">
              {!pendingRemoval?.foresatte.length
                ? 'Avdelingen blir slettet fra invitasjonen.'
                : pendingRemoval.foresatte.length === 1
                  ? 'Den registrerte foresatte i avdelingen blir også slettet.'
                  : `De ${pendingRemoval.foresatte.length} registrerte foresatte i avdelingen blir også slettet.`}
            </Paragraph>
          </div>
          <div className={classes.buttons}>
            <Button
              data-color="danger"
              onClick={() => {
                // Close first, so focus can move out of the modal dialog.
                confirmDialogRef.current?.close();
                if (pendingRemoval) remove(pendingRemoval);
              }}
            >
              Slett avdeling
            </Button>
            {/* Start on the safe choice, so a quick Enter doesn't delete anything. */}
            <Button
              {...nativeAutofocus}
              variant="secondary"
              onClick={() => confirmDialogRef.current?.close()}
            >
              Avbryt
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

type OppsummeringProps = {
  avdelinger: Avdeling[];
  submitted: boolean;
  onEdit: (request: EditRequest) => void;
  onRegister: () => void;
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
                {foresattColumns.map(([field]) => (
                  <col key={field} />
                ))}
                <col className={classes.actionColumn} />
              </colgroup>
              <Table.Head>
                <Table.Row>
                  {foresattColumns.map(([field, label]) => (
                    <Table.HeaderCell key={field}>{label}</Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>
                    <span className="ds-sr-only">Rediger</span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {avdeling.foresatte.map((foresatt) => (
                  <ForesattRow key={foresatt.id} foresatt={foresatt}>
                    <Table.Cell>
                      <Tooltip content="Rediger">
                        <Button
                          icon
                          variant="tertiary"
                          onClick={() =>
                            onEdit({
                              avdelingId: avdeling.id,
                              foresattId: foresatt.id,
                            })
                          }
                        >
                          <NotePencilIcon aria-hidden />
                          <span className="ds-sr-only">
                            Rediger {foresattLabel(foresatt)}
                          </span>
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </ForesattRow>
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
  visning,
}: OppsummeringProps) => {
  if (avdelinger.length === 0) {
    return (
      <div className={classes.avdelinger}>
        <Paragraph>Du har ikke registrert noen avdelinger ennå.</Paragraph>
        <Button variant="secondary" onClick={onRegister}>
          Registrer avdelinger
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
            avdeling.foresatte.map((foresatt) => {
              const fieldErrors = getForesattErrors(foresatt);
              return (
                <FormSummary.Section
                  key={foresatt.id}
                  title={foresatt.fornavn || 'Barn uten navn'}
                  headingLevel={5}
                  onEdit={() =>
                    onEdit({ avdelingId: avdeling.id, foresattId: foresatt.id })
                  }
                >
                  <FormSummary.Fields>
                    {foresattColumns
                      // The child's first name is the title, so it's only listed when it has an error.
                      .map(([field]) => field)
                      .filter(
                        (field) => field !== 'fornavn' || fieldErrors.fornavn,
                      )
                      .map((field) => (
                        <FormSummary.Field
                          key={field}
                          label={foresattFieldProps[field].label}
                          value={foresatt[field]}
                          error={fieldErrors[field]}
                        />
                      ))}
                  </FormSummary.Fields>
                </FormSummary.Section>
              );
            })
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
  sendLabel?: string;
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
  sendLabel = 'Send invitasjon',
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
          {onSend && <Button onClick={onSend}>{sendLabel}</Button>}
        </div>
      </div>
    </div>
  </div>
);

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
  const [avdelinger, setAvdelinger] = useState<Avdeling[]>([]);
  // Set by the summary; the target step opens the matching dialog, then clears it.
  const [editRequest, setEditRequest] = useState<EditRequest>();
  const clearEditRequest = () => setEditRequest(undefined);
  const onChange = (updated: Avdeling) =>
    setAvdelinger((prev) =>
      prev.map((avdeling) => (avdeling.id === updated.id ? updated : avdeling)),
    );
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
  const errors = validate(avdelinger);
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
          onCreate={(navn) =>
            setAvdelinger((prev) => [
              ...prev,
              { id: crypto.randomUUID(), navn, foresatte: [] },
            ])
          }
          onChange={onChange}
          onRemove={(removed) =>
            setAvdelinger((prev) =>
              prev.filter((avdeling) => avdeling.id !== removed.id),
            )
          }
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
          onNavigateToError={(error) => {
            setId(error.step);
            requestAnimationFrame(() => focusFormField(error.focusId));
          }}
        />
      )}
    </StepLayout>
  );
};
