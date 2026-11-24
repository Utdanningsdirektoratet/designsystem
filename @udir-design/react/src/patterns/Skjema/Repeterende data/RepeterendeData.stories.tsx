import { Paragraph, Tooltip } from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import {
  type ComponentRef,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { NotePencilIcon, PlusIcon, TrashIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Dialog } from 'src/components/dialog';
import { ErrorSummary } from 'src/components/errorSummary';
import { Field } from 'src/components/field';
import { Fieldset } from 'src/components/fieldset';
import { FormNavigation } from 'src/components/formNavigation';
import { FormSummary } from 'src/components/formSummary';
import { Radio } from 'src/components/radio';
import { Select } from 'src/components/select';
import { Table } from 'src/components/table';
import { Textfield } from 'src/components/textfield';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label/Label';
import { ValidationMessage } from 'src/components/typography/validationMessage';
import { demoParameters } from 'src/demo/demoParameters';
import { useFormNavigation } from 'src/hooks/useFormNavigation';
import { useRadioGroup } from 'src/hooks/useRadioGroup';
import { focusFormField } from 'src/utilities/form/focus';
import {
  DynamiskeStegEksempel,
  StepLayout,
  useInnsending,
  useStatusMessage,
} from './docs/RepeterendeDataEksempel';
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

type Teacher = { id: string; name: string; email: string };
type TeacherDraft = Omit<Teacher, 'id'>;
type TeacherErrors = Partial<Record<keyof TeacherDraft, string>>;
type SubjectGroup = { subject: string; teachers: Teacher[] };

const subjects = [
  'Engelsk',
  'Kroppsøving',
  'KRLE',
  'Kunst og håndverk',
  'Mat og helse',
  'Matematikk',
  'Musikk',
  'Naturfag',
  'Norsk',
  'Samfunnsfag',
];
const emptyTeacher: TeacherDraft = { name: '', email: '' };
const subjectId = (subject: string) => `subject-${subjects.indexOf(subject)}`;

// Keeps the page where it is when focus moves after adding or removing something.
const focusWithoutScrolling = (id: string) =>
  document.getElementById(id)?.focus({ preventScroll: true });

const validateTeacher = (teacher: TeacherDraft) => {
  const errors: TeacherErrors = {};
  if (!teacher.name.trim()) errors.name = 'Skriv inn navnet på læreren';
  if (!teacher.email.trim()) {
    errors.email = 'Skriv inn e-postadressen til læreren';
  } else if (!teacher.email.includes('@')) {
    errors.email = 'E-postadresse må inneholde krøllalfa';
  }
  return errors;
};

// After a failed submit, only the fields that already show an error are revalidated while typing.
const revalidateTeacher = (value: TeacherDraft, current: TeacherErrors) => {
  const next = validateTeacher(value);
  return Object.fromEntries(
    Object.entries(next).filter(([field]) => field in current),
  ) as TeacherErrors;
};

type TeacherFieldsProps = {
  idPrefix: string;
  value: TeacherDraft;
  errors: TeacherErrors;
  onChange: (value: TeacherDraft) => void;
  autofocus?: boolean;
};

const TeacherFields = ({
  idPrefix,
  value,
  errors,
  onChange,
  autofocus,
}: TeacherFieldsProps) => (
  <>
    <Textfield
      // React's autoFocus doesn't work inside a Dialog; the native attribute does.
      {...(autofocus ? { autofocus: 'true' } : {})}
      id={`${idPrefix}-name`}
      label="Navn på lærer"
      autoComplete="off"
      value={value.name}
      onChange={(event) => onChange({ ...value, name: event.target.value })}
      error={errors.name}
    />
    <Textfield
      id={`${idPrefix}-email`}
      label="E-postadresse"
      type="email"
      autoComplete="off"
      value={value.email}
      onChange={(event) => onChange({ ...value, email: event.target.value })}
      error={errors.email}
    />
  </>
);

type SubjectSectionProps = {
  group: SubjectGroup;
  onChange: (teachers: Teacher[]) => void;
  onRemove: () => void;
  announce: (text: string) => void;
};

const SubjectSection = ({
  group: { subject, teachers },
  onChange,
  onRemove,
  announce,
}: SubjectSectionProps) => {
  const id = subjectId(subject);
  const formHeadingId = useId();
  const tableHeadingId = useId();
  const tableHeadingRef = useRef<HTMLHeadingElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(emptyTeacher);
  const [errors, setErrors] = useState<TeacherErrors>({});
  const [editing, setEditing] = useState<Teacher>({ id: '', ...emptyTeacher });
  const [editErrors, setEditErrors] = useState<TeacherErrors>({});

  const addTeacher = (event: SyntheticEvent) => {
    event.preventDefault();
    const nextErrors = validateTeacher(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusWithoutScrolling(`${id}-${nextErrors.name ? 'name' : 'email'}`);
      return;
    }
    onChange([...teachers, { ...draft, id: crypto.randomUUID() }]);
    setDraft(emptyTeacher);
    // The user is likely to add more, so focus goes back to the first field.
    focusWithoutScrolling(`${id}-name`);
    announce(`${draft.name} er lagt til i ${subject}.`);
  };

  const saveEdit = (event: SyntheticEvent) => {
    event.preventDefault();
    const nextErrors = validateTeacher(editing);
    setEditErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onChange(
      teachers.map((teacher) =>
        teacher.id === editing.id ? editing : teacher,
      ),
    );
    editDialogRef.current?.close();
    announce(`Endringene for ${editing.name} er lagret.`);
  };

  const deleteTeacher = (teacher: Teacher) => {
    onChange(teachers.filter(({ id }) => id !== teacher.id));
    // The delete button disappears, so focus moves to the heading with the new count.
    tableHeadingRef.current?.focus({ preventScroll: true });
    announce(`${teacher.name} er slettet fra ${subject}.`);
  };

  return (
    <section className={classes.avdeling} aria-labelledby={id}>
      <div className={classes.avdelingHeader}>
        <Heading id={id} level={3} data-size="sm" tabIndex={-1}>
          {subject}
        </Heading>
        <Button
          variant="tertiary"
          data-color="danger"
          data-size="sm"
          aria-haspopup="dialog"
          onClick={onRemove}
        >
          <TrashIcon aria-hidden />
          Fjern fag<span className="ds-sr-only"> {subject}</span>
        </Button>
      </div>
      <div className={classes.addSection}>
        <Heading id={formHeadingId} level={4} data-size="xs">
          Legg til lærer<span className="ds-sr-only"> i {subject}</span>
        </Heading>
        <form
          className={classes.form}
          onSubmit={addTeacher}
          noValidate
          aria-labelledby={formHeadingId}
        >
          <TeacherFields
            idPrefix={id}
            value={draft}
            errors={errors}
            onChange={(value) => {
              setDraft(value);
              setErrors(revalidateTeacher(value, errors));
            }}
          />
          <Field className={classes.formButtons}>
            <Button type="submit">Legg til lærer</Button>
          </Field>
        </form>
      </div>
      <div className={cl(classes.addSection, classes.registrerte)}>
        <Heading
          ref={tableHeadingRef}
          id={tableHeadingId}
          level={4}
          data-size="xs"
          tabIndex={-1}
        >
          Registrerte lærere ({teachers.length})
        </Heading>
        {teachers.length === 0 ? (
          <Paragraph>Ingen lærere er registrert ennå.</Paragraph>
        ) : (
          <div className={classes.tableScroll}>
            <Table className={classes.table} aria-labelledby={tableHeadingId}>
              <colgroup>
                <col />
                <col />
                <col className={classes.actionColumn} />
                <col className={classes.actionColumn} />
              </colgroup>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Navn</Table.HeaderCell>
                  <Table.HeaderCell>E-postadresse</Table.HeaderCell>
                  <Table.HeaderCell>
                    <span className="ds-sr-only">Rediger</span>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <span className="ds-sr-only">Slett</span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {teachers.map((teacher) => (
                  <Table.Row key={teacher.id}>
                    <Table.Cell>{teacher.name}</Table.Cell>
                    <Table.Cell className={classes.epostCell}>
                      {teacher.email}
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip content="Rediger">
                        <Button
                          icon
                          variant="tertiary"
                          aria-haspopup="dialog"
                          onClick={() => {
                            setEditing(teacher);
                            setEditErrors({});
                            editDialogRef.current?.showModal();
                          }}
                        >
                          <NotePencilIcon aria-hidden />
                          <span className="ds-sr-only">
                            Rediger {teacher.name}
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
                          onClick={() => deleteTeacher(teacher)}
                        >
                          <TrashIcon aria-hidden />
                          <span className="ds-sr-only">
                            Slett {teacher.name}
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
      {/* The form is always rendered, so the native autofocus works when the dialog opens. */}
      <Dialog ref={editDialogRef} closedby="any" className={classes.dialog}>
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Heading level={2} data-size="xs">
              Rediger lærer
            </Heading>
          </div>
          <form className={classes.dialogForm} onSubmit={saveEdit} noValidate>
            <TeacherFields
              idPrefix={`${id}-edit`}
              value={editing}
              errors={editErrors}
              onChange={(value) => {
                const next = { ...editing, ...value };
                setEditing(next);
                setEditErrors(revalidateTeacher(next, editErrors));
              }}
              autofocus
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

type StepId = 'laerere' | 'send';

const headings: Record<StepId, string> = {
  laerere: 'Registrer lærere',
  send: 'Send søknad',
};

const addSubjectId = 'add-subject';

const validateApplication = (groups: SubjectGroup[]) => {
  if (groups.length === 0) {
    return [
      {
        id: 'subjects',
        step: 'laerere' as const,
        message: 'Legg til minst ett fag',
        focusId: addSubjectId,
      },
    ];
  }
  return groups
    .filter((group) => group.teachers.length === 0)
    .map((group) => ({
      id: group.subject,
      step: 'laerere' as const,
      message: `${group.subject}: Legg til minst én lærer`,
      focusId: `${subjectId(group.subject)}-name`,
    }));
};

export const Preview = meta.story({
  render() {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const subjectDialogRef = useRef<HTMLDialogElement>(null);
    const confirmDialogRef = useRef<HTMLDialogElement>(null);
    const errorSummaryRef = useRef<ComponentRef<typeof ErrorSummary>>(null);
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
    } = useFormNavigation<StepId>({
      value: 'laerere',
      onChange: () => navDialogRef.current?.close(),
    });
    const [groups, setGroups] = useState<SubjectGroup[]>([]);
    const [selected, setSelected] = useState('');
    const [subjectError, setSubjectError] = useState<string>();
    const [pendingRemoval, setPendingRemoval] = useState<SubjectGroup>();
    const { statusMessage, announce } = useStatusMessage();
    const errors = validateApplication(groups);
    const { submitted, sent, attempt, submit } = useInnsending({
      errors,
      steps: ['laerere'],
      activeStep: id,
      markInvalid,
      markCompleted,
      resetStep,
    });

    useEffect(() => {
      if (attempt > 0 && errors.length > 0) errorSummaryRef.current?.focus();
      // Only move focus when the user presses send, not when the errors change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attempt]);

    const available = subjects.filter(
      (subject) => !groups.some((group) => group.subject === subject),
    );

    const addSubject = (event: SyntheticEvent) => {
      event.preventDefault();
      if (!selected) {
        setSubjectError('Velg et fag');
        return;
      }
      setGroups([...groups, { subject: selected, teachers: [] }]);
      subjectDialogRef.current?.close();
      announce(`${selected} er lagt til. Legg til lærerne under faget.`);
    };

    const removeSubject = (subject: string) => {
      setGroups(groups.filter((group) => group.subject !== subject));
      confirmDialogRef.current?.close();
      // The section is gone, so focus moves to the button for adding a new one.
      // It may be hidden until the removed subject is available again, so wait for the render.
      requestAnimationFrame(() => focusWithoutScrolling(addSubjectId));
      announce(`${subject} er fjernet.`);
    };

    const goToSubject = (subject: string) => {
      setId('laerere');
      requestAnimationFrame(() =>
        document.getElementById(subjectId(subject))?.focus(),
      );
    };

    const navigation = (
      <FormNavigation className={classes.navigation}>
        <FormNavigation.Group
          title="Søknad om videreutdanning"
          {...getGroupProps(['laerere', 'send'])}
        >
          <FormNavigation.Step {...getStepProps('laerere')}>
            Registrer lærere
          </FormNavigation.Step>
          <FormNavigation.Step variant="submission" {...getStepProps('send')}>
            Send søknad
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );

    return (
      <>
        <StepLayout
          navigation={navigation}
          navDialogRef={navDialogRef}
          heading={id && headings[id]}
          hasPrev={hasPrev()}
          hasNext={hasNext()}
          prev={prev}
          next={next}
          sendLabel="Send søknad"
          actions={
            id !== 'laerere' ? null : available.length === 0 ? (
              // Hidden rather than disabled, with the reason next to where the button was.
              <Paragraph>Du har lagt til alle fagene du kan søke om.</Paragraph>
            ) : (
              <Button
                id={addSubjectId}
                variant={groups.length === 0 ? 'primary' : 'secondary'}
                aria-haspopup="dialog"
                onClick={() => {
                  setSelected('');
                  setSubjectError(undefined);
                  subjectDialogRef.current?.showModal();
                }}
              >
                <PlusIcon aria-hidden />
                Legg til fag
              </Button>
            )
          }
          onSend={id === 'send' && !sent ? submit : undefined}
        >
          {id === 'laerere' ? (
            <div className={classes.avdelinger}>
              {groups.length === 0 && (
                <Paragraph>
                  Du har ikke lagt til noen fag ennå. Start med å legge til et
                  fag, så kan du registrere lærerne som skal ta videreutdanning
                  i det.
                </Paragraph>
              )}
              {groups.map((group) => (
                <SubjectSection
                  key={group.subject}
                  group={group}
                  announce={announce}
                  onChange={(teachers) =>
                    setGroups(
                      groups.map((existing) =>
                        existing.subject === group.subject
                          ? { ...existing, teachers }
                          : existing,
                      ),
                    )
                  }
                  onRemove={() => {
                    setPendingRemoval(group);
                    confirmDialogRef.current?.showModal();
                  }}
                />
              ))}
            </div>
          ) : sent ? (
            <Paragraph>Søknaden er sendt.</Paragraph>
          ) : (
            <>
              {groups.length === 0 ? (
                <div className={classes.avdelinger}>
                  <Paragraph>Du har ikke lagt til noen fag ennå.</Paragraph>
                  <Button variant="secondary" onClick={() => setId('laerere')}>
                    Registrer lærere
                  </Button>
                </div>
              ) : (
                <FormSummary
                  className={classes.summary}
                  title="Fag og lærere"
                  headingLevel={3}
                >
                  {groups.map((group) => (
                    <FormSummary.Section
                      key={group.subject}
                      title={group.subject}
                      headingLevel={4}
                      onEdit={() => goToSubject(group.subject)}
                    >
                      <FormSummary.Fields>
                        {group.teachers.length === 0 ? (
                          <FormSummary.Field
                            label="Lærere"
                            error={
                              submitted ? 'Legg til minst én lærer' : undefined
                            }
                          />
                        ) : (
                          group.teachers.map((teacher) => (
                            <FormSummary.Field
                              key={teacher.id}
                              label={teacher.name}
                              value={teacher.email}
                            />
                          ))
                        )}
                      </FormSummary.Fields>
                    </FormSummary.Section>
                  ))}
                </FormSummary>
              )}
              {submitted && errors.length > 0 && (
                <ErrorSummary ref={errorSummaryRef} tabIndex={-1}>
                  <ErrorSummary.Heading>
                    Rett opp følgende feil:
                  </ErrorSummary.Heading>
                  <ErrorSummary.List>
                    {errors.map((error) => (
                      <ErrorSummary.Item key={error.id}>
                        <ErrorSummary.Link
                          href={`#${error.focusId}`}
                          onClick={(event) => {
                            event.preventDefault();
                            setId(error.step);
                            requestAnimationFrame(() =>
                              focusFormField(error.focusId),
                            );
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
          )}
        </StepLayout>
        {statusMessage}
        <Dialog
          ref={subjectDialogRef}
          closedby="any"
          className={classes.dialog}
        >
          <div className={classes.dialogContent}>
            <div className={classes.dialogHeader}>
              <Heading level={2} data-size="xs">
                Legg til fag
              </Heading>
            </div>
            <form
              className={classes.dialogForm}
              onSubmit={addSubject}
              noValidate
            >
              <Field>
                <Label>Fag</Label>
                <Select
                  // React's autoFocus doesn't work inside a Dialog; the native attribute does.
                  {...{ autofocus: 'true' }}
                  value={selected}
                  aria-invalid={subjectError ? true : undefined}
                  onChange={(event) => {
                    setSelected(event.target.value);
                    if (event.target.value) setSubjectError(undefined);
                  }}
                >
                  <Select.Option value="">Velg et fag &hellip;</Select.Option>
                  {available.map((subject) => (
                    <Select.Option key={subject} value={subject}>
                      {subject}
                    </Select.Option>
                  ))}
                </Select>
                {subjectError && (
                  <ValidationMessage>{subjectError}</ValidationMessage>
                )}
              </Field>
              <div className={classes.buttons}>
                <Button type="submit">Legg til fag</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => subjectDialogRef.current?.close()}
                >
                  Avbryt
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
        <Dialog
          ref={confirmDialogRef}
          closedby="any"
          className={classes.dialog}
        >
          <div className={classes.dialogContent}>
            <div className={classes.dialogHeader}>
              <Heading level={2} data-size="xs">
                Vil du fjerne {pendingRemoval?.subject}?
              </Heading>
              <Paragraph data-size="sm">
                {!pendingRemoval?.teachers.length
                  ? 'Faget blir fjernet fra søknaden.'
                  : pendingRemoval.teachers.length === 1
                    ? 'Læreren du har lagt til i faget, blir også fjernet fra søknaden.'
                    : `De ${pendingRemoval.teachers.length} lærerne du har lagt til i faget, blir også fjernet fra søknaden.`}
              </Paragraph>
            </div>
            <div className={classes.buttons}>
              <Button
                data-color="danger"
                onClick={() =>
                  pendingRemoval && removeSubject(pendingRemoval.subject)
                }
              >
                Fjern fag
              </Button>
              {/* React's autoFocus doesn't work inside a Dialog; the native attribute does. */}
              <Button
                {...{ autofocus: 'true' }}
                variant="secondary"
                onClick={() => confirmDialogRef.current?.close()}
              >
                Avbryt
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
});

export const DynamiskeSteg = meta.story({
  name: 'Repeterende data i dynamiske steg',
  render: () => <DynamiskeStegEksempel />,
});

export const DynamiskeStegIGruppe = meta.story({
  name: 'Repeterende data i dynamiske steg med gruppe',
  render: () => <DynamiskeStegEksempel gruppert />,
});

export const DynamiskeStegIGruppeMedTabell = meta.story({
  name: 'Repeterende data i dynamiske steg med gruppe og tabell',
  render: () => <DynamiskeStegEksempel gruppert visning="tabell" />,
});

type BoardMember = {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  role: string;
};

type BoardMemberField = Exclude<keyof BoardMember, 'id'>;
type BoardMemberErrors = Partial<Record<BoardMemberField, string>>;

type Page =
  | { type: 'member'; id?: string }
  | { type: 'list' }
  | { type: 'done' };

const roles = ['Styreleder', 'Nestleder', 'Styremedlem', 'Varamedlem'];
const minMembers = 3;
const emptyMember = { name: '', birthDate: '', email: '', role: '' };

// Accepts common ways of writing a date (17.05.1980, 17/5/1980, 17-05-1980,
// 17 05 1980, 17051980) and returns it as dd.mm.yyyy, or undefined if it isn't
// a real date.
const parseBirthDate = (input: string) => {
  const value = input.trim();
  const match =
    /^(\d{1,2})\D+(\d{1,2})\D+(\d{4})$/.exec(value) ??
    /^(\d{2})(\d{2})(\d{4})$/.exec(value);
  if (!match) return undefined;
  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1) return undefined;
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
};

const validateBirthDate = (input: string) => {
  if (!input.trim()) return 'Skriv inn fødselsdato';
  const formatted = parseBirthDate(input);
  if (!formatted)
    return 'Fødselsdato må være en gyldig dato, for eksempel 17.05.1980';
  const [day, month, year] = formatted.split('.').map(Number);
  if (new Date(year, month - 1, day) > new Date()) {
    return 'Fødselsdato kan ikke være fram i tid';
  }
  return undefined;
};

const validateMember = (member: Omit<BoardMember, 'id'>) => {
  const errors: BoardMemberErrors = {};
  if (!member.name.trim()) errors.name = 'Skriv inn fullt navn';
  const birthDateError = validateBirthDate(member.birthDate);
  if (birthDateError) errors.birthDate = birthDateError;
  if (!member.email.trim()) {
    errors.email = 'Skriv inn e-postadresse';
  } else if (!member.email.includes('@')) {
    errors.email = 'E-postadresse må inneholde krøllalfa';
  }
  if (!member.role) errors.role = 'Velg rollen i styret';
  return errors;
};

export const EnOmGangen = meta.story({
  name: 'Én oppføring om gangen',
  render() {
    const [members, setMembers] = useState<BoardMember[]>([]);
    const [page, setPage] = useState<Page>({ type: 'member' });
    const [draft, setDraft] = useState(emptyMember);
    const [errors, setErrors] = useState<BoardMemberErrors>({});
    const [listError, setListError] = useState<string>();
    const [pendingRemoval, setPendingRemoval] = useState<BoardMember>();
    const headingRef = useRef<HTMLHeadingElement>(null);
    const listHeadingId = useId();
    const errorSummaryRef = useRef<ComponentRef<typeof ErrorSummary>>(null);
    const confirmDialogRef = useRef<HTMLDialogElement>(null);
    const isFirstRender = useRef(true);

    // Every page change acts like a new page, so focus moves to its heading.
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      headingRef.current?.focus();
    }, [page, members.length]);

    // useRadioGroup only reads `value` on mount, so the hook owns the role and
    // showMember sets it with setValue.
    const role = useRadioGroup({ name: 'role', error: errors.role });

    const showMember = (member?: BoardMember) => {
      setDraft(member ?? emptyMember);
      role.setValue(member?.role ?? '');
      setErrors({});
      setPage({ type: 'member', id: member?.id });
    };

    const saveMember = (event: SyntheticEvent) => {
      event.preventDefault();
      const member = {
        ...draft,
        birthDate: parseBirthDate(draft.birthDate) ?? draft.birthDate,
        role: role.value,
      };
      const nextErrors = validateMember(member);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      const id = page.type === 'member' ? page.id : undefined;
      setMembers(
        id
          ? members.map((existing) =>
              existing.id === id ? { ...member, id } : existing,
            )
          : [...members, { ...member, id: crypto.randomUUID() }],
      );
      setListError(undefined);
      setPage({ type: 'list' });
    };

    const continueFromList = (event: SyntheticEvent) => {
      event.preventDefault();
      if (members.length < minMembers) {
        setListError(
          `Styret må ha minst ${minMembers} medlemmer. Du har lagt til ${members.length}.`,
        );
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      setPage({ type: 'done' });
    };

    const remove = () => {
      if (!pendingRemoval) return;
      const remaining = members.filter(
        (member) => member.id !== pendingRemoval.id,
      );
      setMembers(remaining);
      confirmDialogRef.current?.close();
      if (remaining.length === 0) showMember();
    };

    const errorList = Object.entries(errors);
    const isEditing = page.type === 'member' && page.id !== undefined;

    return (
      <>
        <style>
          {`
            .one-at-a-time,
            .one-at-a-time__form {
              display: grid;
              gap: var(--ds-size-6);
              justify-items: start;
            }
            .one-at-a-time {
              max-width: 40rem;
              padding-block: var(--ds-size-4);
            }
            .one-at-a-time__form {
              width: 100%;
            }
            .one-at-a-time__buttons {
              display: flex;
              flex-wrap: wrap;
              gap: var(--ds-size-3);
            }
            .one-at-a-time__stack {
              display: grid;
              gap: var(--ds-size-2);
            }
            .one-at-a-time__dialog {
              display: grid;
              gap: var(--ds-size-6);
              padding: var(--ds-size-2);
            }
            .one-at-a-time__table {
              width: 100%;
            }
            .one-at-a-time__action {
              width: 3.5rem;
            }
          `}
        </style>
        <div className="one-at-a-time">
          <div className="one-at-a-time__stack">
            <Heading level={2} data-size="md">
              Styremedlemmer
            </Heading>
            {members.length === 0 && (
              <Paragraph>
                Legg til alle som sitter i styret for skolen. Styret må ha minst{' '}
                {minMembers} medlemmer.
              </Paragraph>
            )}
          </div>
          {page.type === 'member' && (
            <form
              className="one-at-a-time__form"
              onSubmit={saveMember}
              noValidate
            >
              <Heading ref={headingRef} level={3} data-size="sm" tabIndex={-1}>
                {isEditing
                  ? 'Endre styremedlem'
                  : `Styremedlem ${members.length + 1}`}
              </Heading>
              <Textfield
                id="name"
                label="Fullt navn"
                autoComplete="off"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                error={errors.name}
              />
              <Textfield
                id="birthDate"
                label="Fødselsdato"
                description="dd.mm.åååå, for eksempel 17.05.1980"
                autoComplete="off"
                value={draft.birthDate}
                onChange={(event) =>
                  setDraft({ ...draft, birthDate: event.target.value })
                }
                onBlur={() => {
                  const formatted = parseBirthDate(draft.birthDate);
                  if (formatted) setDraft({ ...draft, birthDate: formatted });
                }}
                error={errors.birthDate}
              />
              <Textfield
                id="email"
                label="E-postadresse"
                type="email"
                autoComplete="off"
                value={draft.email}
                onChange={(event) =>
                  setDraft({ ...draft, email: event.target.value })
                }
                error={errors.email}
              />
              <Fieldset>
                <Fieldset.Legend>Rolle i styret</Fieldset.Legend>
                {roles.map((value, index) => (
                  <Radio
                    key={value}
                    id={`role-${index}`}
                    label={value}
                    {...role.getRadioProps(value)}
                  />
                ))}
                <ValidationMessage {...role.validationMessageProps} />
              </Fieldset>
              {errorList.length > 0 && (
                <ErrorSummary ref={errorSummaryRef} tabIndex={-1}>
                  <ErrorSummary.Heading>
                    Rett opp følgende feil:
                  </ErrorSummary.Heading>
                  <ErrorSummary.List>
                    {errorList.map(([field, message]) => (
                      <ErrorSummary.Item key={field}>
                        <ErrorSummary.Link
                          href={`#${field === 'role' ? 'role-0' : field}`}
                        >
                          {message}
                        </ErrorSummary.Link>
                      </ErrorSummary.Item>
                    ))}
                  </ErrorSummary.List>
                </ErrorSummary>
              )}
              <div className="one-at-a-time__buttons">
                <Button type="submit">
                  {isEditing ? 'Lagre endringene' : 'Gå videre'}
                </Button>
                {members.length > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setPage({ type: 'list' })}
                  >
                    Avbryt
                  </Button>
                )}
              </div>
            </form>
          )}

          {page.type === 'list' && (
            <form
              className="one-at-a-time__form"
              onSubmit={continueFromList}
              noValidate
            >
              <Heading
                ref={headingRef}
                id={listHeadingId}
                level={3}
                data-size="sm"
                tabIndex={-1}
              >
                {members.length < minMembers
                  ? `Du har lagt til ${members.length} av minst ${minMembers} styremedlemmer`
                  : `Du har lagt til ${members.length} styremedlemmer`}
              </Heading>
              <Table
                className="one-at-a-time__table"
                aria-labelledby={listHeadingId}
              >
                <colgroup>
                  <col />
                  <col />
                  <col className="one-at-a-time__action" />
                  <col className="one-at-a-time__action" />
                </colgroup>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>Navn</Table.HeaderCell>
                    <Table.HeaderCell>Rolle</Table.HeaderCell>
                    <Table.HeaderCell>
                      <span className="ds-sr-only">Rediger</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span className="ds-sr-only">Slett</span>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {members.map((member) => (
                    <Table.Row key={member.id}>
                      <Table.Cell>{member.name}</Table.Cell>
                      <Table.Cell>{member.role}</Table.Cell>
                      <Table.Cell>
                        <Tooltip content="Rediger">
                          <Button
                            icon
                            variant="tertiary"
                            onClick={() => showMember(member)}
                          >
                            <NotePencilIcon aria-hidden />
                            <span className="ds-sr-only">
                              Rediger {member.name}
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
                            aria-haspopup="dialog"
                            onClick={() => {
                              setPendingRemoval(member);
                              confirmDialogRef.current?.showModal();
                            }}
                          >
                            <TrashIcon aria-hidden />
                            <span className="ds-sr-only">
                              Slett {member.name}
                            </span>
                          </Button>
                        </Tooltip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Button
                id="add-member"
                type="button"
                variant="secondary"
                onClick={() => showMember()}
              >
                <PlusIcon aria-hidden />
                Legg til styremedlem
              </Button>
              {listError && (
                <ErrorSummary ref={errorSummaryRef} tabIndex={-1}>
                  <ErrorSummary.Heading>
                    Rett opp følgende feil:
                  </ErrorSummary.Heading>
                  <ErrorSummary.List>
                    <ErrorSummary.Item>
                      <ErrorSummary.Link href="#add-member">
                        {listError}
                      </ErrorSummary.Link>
                    </ErrorSummary.Item>
                  </ErrorSummary.List>
                </ErrorSummary>
              )}
              <Button type="submit">Gå videre</Button>
            </form>
          )}

          {page.type === 'done' && (
            <>
              <Heading ref={headingRef} level={3} data-size="sm" tabIndex={-1}>
                Styremedlemmene er registrert
              </Heading>
              <Paragraph>
                Du har registrert {members.length} styremedlemmer.
              </Paragraph>
              <Button
                variant="secondary"
                onClick={() => setPage({ type: 'list' })}
              >
                Endre styremedlemmene
              </Button>
            </>
          )}
        </div>
        <Dialog ref={confirmDialogRef} closedby="any">
          <div className="one-at-a-time__dialog">
            <div className="one-at-a-time__stack">
              <Heading level={2} data-size="xs">
                Vil du slette {pendingRemoval?.name}?
              </Heading>
              <Paragraph data-size="sm">
                Opplysningene om styremedlemmet blir slettet fra søknaden.
              </Paragraph>
            </div>
            <div className="one-at-a-time__buttons">
              <Button data-color="danger" onClick={remove}>
                Slett styremedlem
              </Button>
              {/* React's autoFocus doesn't work inside a Dialog; the native attribute does. */}
              <Button
                {...{ autofocus: 'true' }}
                variant="secondary"
                onClick={() => confirmDialogRef.current?.close()}
              >
                Avbryt
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
});
