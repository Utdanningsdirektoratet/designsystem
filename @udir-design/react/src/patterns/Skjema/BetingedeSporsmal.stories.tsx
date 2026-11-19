import {
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { BulletListIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Alert } from 'src/components/alert';
import { Button } from 'src/components/button';
import { Checkbox } from 'src/components/checkbox';
import { Dialog } from 'src/components/dialog';
import { ErrorSummary } from 'src/components/errorSummary';
import { Fieldset } from 'src/components/fieldset';
import { FormNavigation } from 'src/components/formNavigation';
import { FormSummary } from 'src/components/formSummary';
import { Link } from 'src/components/link';
import { Radio } from 'src/components/radio';
import { Textfield } from 'src/components/textfield';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { ValidationMessage } from 'src/components/typography/validationMessage';
import { demoParameters } from 'src/demo/demoParameters';
import { useCheckboxGroup } from 'src/hooks/useCheckboxGroup';
import { useFormNavigation } from 'src/hooks/useFormNavigation';
import { useRadioGroup } from 'src/hooks/useRadioGroup';
import { focusFormField } from 'src/utilities/form/focus';

const meta = preview.meta({
  title: 'patterns/Skjema/Betingede spørsmål',
  tags: ['alpha', 'udir'],
  parameters: {
    layout: 'centered',
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      width: 'min(28rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  decorators: [withResponsiveDataSize],
});

// Play functions should only run in tests and the story view, not on the docs page.
// A Canvas with `inline: false` loads the story in an iframe with viewMode=story, so we also check the parent window.
const isDocsPage = (viewMode: string) =>
  viewMode === 'docs' ||
  window.parent.location.search.includes('viewMode=docs');

type SubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const UnderGruppen = meta.story({
  name: 'Nytt spørsmål under gruppen',
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [previousGrant, setPreviousGrant] = useState('');
    const [caseNumber, setCaseNumber] = useState('');

    const previousGrantError =
      submitted && !previousGrant
        ? 'Velg om skolen har fått tilskudd tidligere'
        : undefined;
    // The follow-up question is only validated when it is shown
    const caseNumberError =
      submitted && previousGrant === 'yes' && !caseNumber.trim()
        ? 'Skriv inn saksnummeret for forrige tilskudd'
        : undefined;

    const { getRadioProps, validationMessageProps } = useRadioGroup({
      name: 'previous-grant',
      value: previousGrant,
      onChange: setPreviousGrant,
      error: previousGrantError,
    });

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="bs-grid">
        <style>{`
.bs-grid {
  display: grid;
  gap: var(--ds-size-6);
}
`}</style>
        <Fieldset>
          <Fieldset.Legend>
            Har skolen fått tilskudd fra Utdanningsdirektoratet tidligere?
          </Fieldset.Legend>
          <Radio label="Ja" {...getRadioProps('yes')} />
          <Radio label="Nei" {...getRadioProps('no')} />
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>

        {previousGrant === 'yes' && (
          <Textfield
            id="case-number"
            label="Saksnummer for forrige tilskudd"
            size={12}
            description="Du finner saksnummeret øverst i vedtaksbrevet, for eksempel 2025/1234."
            value={caseNumber}
            onChange={(event) => setCaseNumber(event.target.value)}
            error={caseNumberError}
          />
        )}

        <Button type="submit">Gå videre</Button>
      </form>
    );
  },
  play: async ({ canvasElement, step, viewMode }) => {
    if (isDocsPage(viewMode)) return;
    const canvas = within(canvasElement);
    const yes = canvas.getByRole('radio', { name: 'Ja' });
    const no = canvas.getByRole('radio', { name: 'Nei' });
    const caseNumberLabel = 'Saksnummer for forrige tilskudd';

    await step('Oppfølgingsspørsmålet er skjult før brukeren svarer', () => {
      expect(canvas.queryByLabelText(caseNumberLabel)).not.toBeInTheDocument();
    });

    await step('Ja viser spørsmålet uten å flytte fokus', async () => {
      await userEvent.click(yes);
      expect(canvas.getByLabelText(caseNumberLabel)).toBeInTheDocument();
      expect(yes).toHaveFocus();
    });

    await step(
      'Svaret beholdes hvis brukeren bytter frem og tilbake',
      async () => {
        await userEvent.type(
          canvas.getByLabelText(caseNumberLabel),
          '2025/1234',
        );
        await userEvent.click(no);
        expect(
          canvas.queryByLabelText(caseNumberLabel),
        ).not.toBeInTheDocument();
        await userEvent.click(yes);
        expect(canvas.getByLabelText(caseNumberLabel)).toHaveValue('2025/1234');
      },
    );

    await step('Skjulte spørsmål valideres ikke', async () => {
      await userEvent.click(no);
      await userEvent.click(canvas.getByRole('button', { name: 'Gå videre' }));
      expect(
        canvas.queryByText('Skriv inn saksnummeret for forrige tilskudd'),
      ).not.toBeInTheDocument();
    });
  },
});

export const AnnetMedCheckbox = meta.story({
  name: 'Annet-alternativ med avkrysningsbokser',
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [accommodations, setAccommodations] = useState<string[]>([]);
    const [other, setOther] = useState('');

    const accommodationsError =
      submitted && accommodations.length === 0
        ? 'Velg minst én tilrettelegging'
        : undefined;
    const otherError =
      submitted && accommodations.includes('other') && !other.trim()
        ? 'Beskriv hvilken annen tilrettelegging eleven trenger'
        : undefined;

    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      name: 'accommodations',
      value: accommodations,
      onChange: setAccommodations,
      error: accommodationsError,
    });

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="bs-grid">
        <style>{`
.bs-grid {
  display: grid;
  gap: var(--ds-size-6);
}
`}</style>
        <Fieldset>
          <Fieldset.Legend>
            Hvilken tilrettelegging trenger eleven på eksamen?
          </Fieldset.Legend>
          <Fieldset.Description>Velg alle som passer.</Fieldset.Description>
          <Checkbox
            label="Utvidet tid"
            {...getCheckboxProps('extended-time')}
          />
          <Checkbox
            label="Opplesing av oppgavene"
            {...getCheckboxProps('read-aloud')}
          />
          <Checkbox
            label="Skrive på datamaskin med retteprogram"
            {...getCheckboxProps('spell-checker')}
          />
          <Checkbox label="Annet" {...getCheckboxProps('other')} />
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>

        {accommodations.includes('other') && (
          <Textfield
            id="other-accommodation"
            label="Beskriv annen tilrettelegging"
            multiline
            rows={3}
            value={other}
            onChange={(event) => setOther(event.target.value)}
            error={otherError}
          />
        )}

        <Button type="submit">Gå videre</Button>
      </form>
    );
  },
});

export const StoppMelding = meta.story({
  name: 'Svar som stopper brukeren',
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [approved, setApproved] = useState('');

    const { getRadioProps, validationMessageProps } = useRadioGroup({
      name: 'approved-school',
      value: approved,
      onChange: setApproved,
      error:
        submitted && !approved
          ? 'Velg om skolen er godkjent etter privatskoleloven'
          : undefined,
    });

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="bs-stop">
        <style>{`
.bs-stop {
  display: grid;
}

.bs-stop-alert,
.bs-stop-button {
  margin-block-start: var(--ds-size-6);
}
`}</style>
        <Fieldset>
          <Fieldset.Legend>
            Er skolen godkjent etter privatskoleloven?
          </Fieldset.Legend>
          <Radio label="Ja" {...getRadioProps('yes')} />
          <Radio label="Nei" {...getRadioProps('no')} />
          <ValidationMessage {...validationMessageProps} />
        </Fieldset>

        {/* The live region must exist before the message is shown */}
        {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <output> only allows phrasing content, and Alert renders a <div> */}
        <div role="status" aria-live="polite" aria-atomic="true">
          {approved === 'no' && (
            <Alert data-color="warning" className="bs-stop-alert">
              <Alert.Heading level={2}>
                Skolen kan ikke søke om dette tilskuddet
              </Alert.Heading>
              Tilskuddet gjelder bare skoler som er godkjent etter
              privatskoleloven. Har du svart feil, kan du endre svaret over.{' '}
              <Link href="https://www.udir.no/">
                Les om godkjenning av private skoler
              </Link>
            </Alert>
          )}
        </div>

        {approved !== 'no' && (
          <Button type="submit" className="bs-stop-button">
            Gå videre
          </Button>
        )}
      </form>
    );
  },
  play: async ({ canvasElement, step, viewMode }) => {
    if (isDocsPage(viewMode)) return;
    const canvas = within(canvasElement);

    await step('Nei viser melding i stedet for Gå videre', async () => {
      await userEvent.click(canvas.getByRole('radio', { name: 'Nei' }));
      expect(canvas.getByRole('status')).toHaveTextContent(
        'Skolen kan ikke søke om dette tilskuddet',
      );
      expect(
        canvas.queryByRole('button', { name: 'Gå videre' }),
      ).not.toBeInTheDocument();
    });

    await step('Brukeren kan endre svaret og gå videre', async () => {
      await userEvent.click(canvas.getByRole('radio', { name: 'Ja' }));
      expect(canvas.getByRole('status')).toBeEmptyDOMElement();
      expect(
        canvas.getByRole('button', { name: 'Gå videre' }),
      ).toBeInTheDocument();
    });
  },
});

const schoolRegister: Record<string, string> = {
  '987654321': 'Eksempel skole, Eksempel kommune',
  '912345678': 'Fjordtun skole, Eksempel kommune',
};

export const SvarITekstfelt = meta.story({
  name: 'Svar i tekstfelt',
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [orgNumber, setOrgNumber] = useState('');

    const digits = orgNumber.replaceAll(' ', '');
    const isComplete = /^\d{9}$/.test(digits);
    // Look up only when the number is complete, not on every keystroke
    const school = isComplete ? schoolRegister[digits] : undefined;

    let orgNumberError: string | undefined;
    if (isComplete && !school) {
      orgNumberError = 'Vi fant ingen skole med dette organisasjonsnummeret';
    } else if (submitted && !digits) {
      orgNumberError = 'Skriv inn organisasjonsnummeret til skolen';
    } else if (submitted && !isComplete) {
      orgNumberError = 'Organisasjonsnummeret må ha 9 siffer';
    }

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="bs-grid">
        <style>{`
.bs-grid {
  display: grid;
  gap: var(--ds-size-6);
}

.bs-field {
  display: grid;
  gap: var(--ds-size-2);
}
`}</style>
        <div className="bs-field">
          <Textfield
            id="school-org-number"
            label="Organisasjonsnummeret til skolen"
            description="Du finner organisasjonsnummeret i Nasjonalt skoleregister."
            inputMode="numeric"
            autoComplete="off"
            size={12}
            value={orgNumber}
            onChange={(event) => setOrgNumber(event.target.value)}
            error={orgNumberError}
          />
          {/* The live region must exist before the result is shown */}
          <Paragraph asChild>
            {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <output> is not announced reliably by every screen reader */}
            <div role="status" aria-live="polite" aria-atomic="true">
              {school && (
                <>
                  Skole: <strong>{school}</strong>
                </>
              )}
            </div>
          </Paragraph>
        </div>

        <Button type="submit">Gå videre</Button>
      </form>
    );
  },
  play: async ({ canvasElement, step, viewMode }) => {
    if (isDocsPage(viewMode)) return;
    const canvas = within(canvasElement);
    const orgNumber = canvas.getByLabelText('Organisasjonsnummeret til skolen');

    await step('Ingenting vises før nummeret er fullstendig', async () => {
      await userEvent.type(orgNumber, '98765');
      expect(canvas.getByRole('status')).toBeEmptyDOMElement();
    });

    await step('Skolen vises når nummeret er fullstendig', async () => {
      await userEvent.type(orgNumber, '4321');
      expect(canvas.getByRole('status')).toHaveTextContent(
        'Skole: Eksempel skole, Eksempel kommune',
      );
      expect(orgNumber).toHaveFocus();
    });
  },
});

type FormField = {
  id: string;
  label: string;
  description?: string;
  multiline?: boolean;
  /** Width in characters, matched to the expected answer */
  size?: number;
  inputMode?: ComponentProps<'input'>['inputMode'];
  type?: 'text' | 'email';
  autoComplete?: string;
  errorMessage: string;
};

type FormStep = { id: string; title: string; fields: FormField[] };

type Answers = Record<string, string>;

type SubmitError = {
  /** Id of the field that should receive focus */
  id: string;
  stepId: string;
  message: string;
};

const findErrors = (step: FormStep, answers: Answers): SubmitError[] =>
  step.fields
    .filter((field) => !answers[field.id]?.trim())
    .map((field) => ({
      id: field.id,
      stepId: step.id,
      message: field.errorMessage,
    }));

const getErrorMessage = (errors: SubmitError[], id: string) =>
  errors.find((f) => f.id === id)?.message;

/**
 * Validates only when the user tries to submit.
 * Until then, a step is marked as completed when the user leaves it with everything filled in.
 */
function useSubmission({
  errors,
  stepIds,
  activeStep,
  markInvalid,
  markCompleted,
  resetStep,
}: {
  errors: SubmitError[];
  stepIds: string[];
  activeStep: string;
  markInvalid: (id: string) => void;
  markCompleted: (id: string) => void;
  resetStep: (id: string) => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const stepsWithErrors = errors.map((f) => f.stepId).join();

  const previousStep = useRef(activeStep);
  useEffect(() => {
    const left = previousStep.current;
    previousStep.current = activeStep;
    if (left === activeStep || !stepIds.includes(left)) return;
    if (!errors.some((f) => f.stepId === left)) markCompleted(left);
    else if (attempted) markInvalid(left);
    else resetStep(left);
    // Should only run when the user changes step
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    if (!attempted) return;
    stepIds.forEach((id) => {
      if (errors.some((f) => f.stepId === id)) markInvalid(id);
      else markCompleted(id);
    });
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [attempted, stepsWithErrors, stepIds.join()]);

  const send = () => {
    setAttempted(true);
    setAttemptCount((n) => n + 1);
    if (errors.length === 0) setSent(true);
  };

  return { attempted, sent, attemptCount, send };
}

const SubmitErrorSummary = ({
  errors,
  attemptCount,
  onNavigate,
}: {
  errors: SubmitError[];
  attemptCount: number;
  onNavigate: (errors: SubmitError) => void;
}) => {
  const ref = useRef<ComponentRef<typeof ErrorSummary>>(null);

  useEffect(() => {
    if (attemptCount > 0 && errors.length > 0) ref.current?.focus();
    // Move focus only when the user tries to submit, not when the errors change
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptCount]);

  if (errors.length === 0) return null;

  return (
    <ErrorSummary ref={ref} tabIndex={-1}>
      <ErrorSummary.Heading>Rett opp følgende feil:</ErrorSummary.Heading>
      <ErrorSummary.List>
        {errors.map((f) => (
          <ErrorSummary.Item key={f.id}>
            <ErrorSummary.Link
              href={`#${f.id}`}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(f);
              }}
            >
              {f.message}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        ))}
      </ErrorSummary.List>
    </ErrorSummary>
  );
};

type TextStepProps = {
  step: FormStep;
  answers: Answers;
  errors: SubmitError[];
  updateAnswer: (id: string, value: string) => void;
};

const TextStep = ({ step, answers, errors, updateAnswer }: TextStepProps) => (
  <>
    <Heading level={2} data-size="sm">
      {step.title}
    </Heading>
    {step.fields.map((field) =>
      field.multiline ? (
        <Textfield
          key={field.id}
          id={field.id}
          label={field.label}
          description={field.description}
          multiline
          rows={4}
          value={answers[field.id] ?? ''}
          onChange={(event) => updateAnswer(field.id, event.target.value)}
          error={getErrorMessage(errors, field.id)}
        />
      ) : (
        <Textfield
          key={field.id}
          id={field.id}
          label={field.label}
          description={field.description}
          size={field.size}
          inputMode={field.inputMode}
          type={field.type}
          autoComplete={field.autoComplete}
          value={answers[field.id] ?? ''}
          onChange={(event) => updateAnswer(field.id, event.target.value)}
          error={getErrorMessage(errors, field.id)}
        />
      ),
    )}
  </>
);

const StepSummary = ({
  step,
  answers,
  errors,
  onEdit,
}: {
  step: FormStep;
  answers: Answers;
  errors: SubmitError[];
  onEdit: () => void;
}) => (
  <FormSummary.Section title={step.title} onEdit={onEdit}>
    <FormSummary.Fields>
      {step.fields.map((field) => (
        <FormSummary.Field
          key={field.id}
          label={field.label}
          value={answers[field.id]?.trim() || undefined}
          error={getErrorMessage(errors, field.id)}
        />
      ))}
    </FormSummary.Fields>
  </FormSummary.Section>
);

type StepLayoutProps = {
  navigation: ReactNode;
  navDialogRef: RefObject<HTMLDialogElement | null>;
  children: ReactNode;
  onSubmit: SubmitHandler;
  onPrev?: () => void;
  submitLabel: string;
};

const StepLayout = ({
  navigation,
  navDialogRef,
  children,
  onSubmit,
  onPrev,
  submitLabel,
}: StepLayoutProps) => (
  <div className="bs-root">
    <div className="bs-page">
      <div className="bs-desktop">{navigation}</div>
      <div className="bs-container">
        <div className="bs-mobile">
          <Dialog.TriggerContext>
            <Dialog.Trigger variant="secondary">
              <BulletListIcon aria-hidden />
              Naviger
            </Dialog.Trigger>
            <Dialog closedby="any" ref={navDialogRef} className="bs-nav-dialog">
              <Heading level={2}>Naviger</Heading>
              {navigation}
            </Dialog>
          </Dialog.TriggerContext>
        </div>
        <form onSubmit={onSubmit} className="bs-form">
          {children}
          <div className="bs-navigation-group">
            {onPrev && (
              <Button type="button" variant="secondary" onClick={onPrev}>
                Forrige
              </Button>
            )}
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const stepParameters = {
  ...demoParameters,
  customStyles: {
    // Overrides the width from meta so the form doesn't change width with its content
    width: 'auto',
    maxWidth: 'none',
    margin: '0 1rem',
    // Default overflow: hidden would break the sticky navigation.
    overflow: 'visible',
  },
};

const grantSchemes: FormStep[] = [
  {
    id: 'further-education',
    title: 'Videreutdanning for lærere',
    fields: [
      {
        id: 'teacher-count',
        label: 'Hvor mange lærere skal ta videreutdanning?',
        size: 4,
        inputMode: 'numeric',
        errorMessage: 'Skriv inn antall lærere',
      },
      {
        id: 'further-education-subject',
        label: 'Hvilke fag skal lærerne ta videreutdanning i?',
        size: 40,
        errorMessage: 'Skriv inn fagene',
      },
    ],
  },
  {
    id: 'school-camp',
    title: 'Leirskoleopplæring',
    fields: [
      {
        id: 'student-count',
        label: 'Hvor mange elever skal på leirskole?',
        size: 4,
        inputMode: 'numeric',
        errorMessage: 'Skriv inn antall elever',
      },
      {
        id: 'camp-location',
        label: 'Hvilken leirskole skal elevene til?',
        size: 30,
        errorMessage: 'Skriv inn navnet på leirskolen',
      },
    ],
  },
  {
    id: 'school-library',
    title: 'Skolebibliotek',
    fields: [
      {
        id: 'library-measures',
        label: 'Hva vil skolen bruke tilskuddet til?',
        multiline: true,
        errorMessage: 'Beskriv hva skolen vil bruke tilskuddet til',
      },
    ],
  },
];

export const FlereSteg = meta.story({
  name: 'Nye steg ut fra flere valg',
  parameters: stepParameters,
  render: () => {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [answers, setAnswers] = useState<Answers>({});

    // Steps follow the order of the options, not the order the user checked them in
    const selected = grantSchemes.filter((scheme) =>
      selectedIds.includes(scheme.id),
    );
    const inputSteps = ['select', ...selected.map((s) => s.id)];

    const {
      id,
      setId,
      next,
      prev,
      hasPrev,
      getStepProps,
      getGroupProps,
      markCompleted,
      markInvalid,
      resetStep,
    } = useFormNavigation<string>({
      value: 'select',
      order: [...inputSteps, 'summary'],
      onChange: () => navDialogRef.current?.close(),
    });

    // Hidden steps are not included, so they are not validated
    const errors: SubmitError[] = [
      ...(selectedIds.length === 0
        ? [
            {
              id: `grant-${grantSchemes[0].id}`,
              stepId: 'select',
              message: 'Velg minst ett tilskudd',
            },
          ]
        : []),
      ...selected.flatMap((s) => findErrors(s, answers)),
    ];
    const { attempted, sent, attemptCount, send } = useSubmission({
      errors,
      stepIds: inputSteps,
      activeStep: id,
      markInvalid,
      markCompleted,
      resetStep,
    });
    const visibleErrors = attempted ? errors : [];

    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      name: 'grant-schemes',
      value: selectedIds,
      onChange: setSelectedIds,
      error: getErrorMessage(visibleErrors, `grant-${grantSchemes[0].id}`),
    });

    const activeStep = selected.find((s) => s.id === id);
    const updateAnswer = (field: string, value: string) =>
      setAnswers((previous) => ({ ...previous, [field]: value }));

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      if (id === 'summary') send();
      else next();
    };

    if (sent) {
      return (
        <Alert data-color="success">
          <Alert.Heading level={2}>Søknaden er sendt</Alert.Heading>
          Vi behandler søknaden og gir beskjed når den er ferdig behandlet.
        </Alert>
      );
    }

    const grantSteps = selected.map((s) => (
      <FormNavigation.Step key={s.id} {...getStepProps(s.id)}>
        {s.title}
      </FormNavigation.Step>
    ));

    return (
      <>
        <style>{`
.bs-root {
  container: page / inline-size;
  width: 100%;
}

.bs-page {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
  width: 100%;
}

.bs-desktop {
  display: none;
}

.bs-mobile {
  display: block;
}

.bs-container {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 40rem;
}

.bs-form {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
}

.bs-navigation-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-size-2);
}

@container page (min-width: 50rem) {
  .bs-page {
    flex-direction: row;
  }

  .bs-desktop {
    display: block;
    flex: 0 0 16rem;
    position: sticky;
    top: var(--ds-size-6);
    align-self: flex-start;
    padding-block-start: var(--ds-size-6);
  }

  .bs-mobile {
    display: none;
  }

  .bs-container {
    flex: 1;
    padding: var(--ds-size-6);
  }
}

.bs-nav-dialog {
  width: fit-content;
  min-width: 20rem;
}
`}</style>
        <StepLayout
          navDialogRef={navDialogRef}
          onSubmit={handleSubmit}
          onPrev={hasPrev() ? prev : undefined}
          submitLabel={id === 'summary' ? 'Send søknad' : 'Neste'}
          navigation={
            <FormNavigation>
              <FormNavigation.Step {...getStepProps('select')}>
                Velg tilskudd
              </FormNavigation.Step>
              {/* The group is shown even with one step, so the navigation structure doesn't change when the user checks more */}
              {selected.length > 0 && (
                <FormNavigation.Group
                  title="Tilskudd"
                  {...getGroupProps(selected.map((s) => s.id))}
                >
                  {grantSteps}
                </FormNavigation.Group>
              )}
              <FormNavigation.Step
                variant="summary"
                {...getStepProps('summary')}
              >
                Oppsummering
              </FormNavigation.Step>
            </FormNavigation>
          }
        >
          {id === 'select' && (
            <Fieldset>
              <Fieldset.Legend>
                <Heading level={2} data-size="sm">
                  Hva søker skolen tilskudd til?
                </Heading>
              </Fieldset.Legend>
              <Fieldset.Description>
                Velg alle som passer. Du får egne spørsmål om hvert tilskudd.
              </Fieldset.Description>
              {grantSchemes.map((scheme) => (
                <Checkbox
                  key={scheme.id}
                  label={scheme.title}
                  {...getCheckboxProps({
                    value: scheme.id,
                    id: `grant-${scheme.id}`,
                  })}
                />
              ))}
              <ValidationMessage {...validationMessageProps} />
            </Fieldset>
          )}

          {activeStep && (
            <TextStep
              step={activeStep}
              answers={answers}
              errors={visibleErrors}
              updateAnswer={updateAnswer}
            />
          )}

          {id === 'summary' && (
            <>
              <FormSummary title="Oppsummering">
                <FormSummary.Section
                  title="Tilskudd"
                  onEdit={() => setId('select')}
                >
                  <FormSummary.Fields>
                    <FormSummary.Field
                      label="Hva søker skolen tilskudd til?"
                      value={
                        selected.map((s) => s.title).join(', ') || undefined
                      }
                      error={getErrorMessage(
                        visibleErrors,
                        `grant-${grantSchemes[0].id}`,
                      )}
                    />
                  </FormSummary.Fields>
                </FormSummary.Section>
                {selected.map((s) => (
                  <StepSummary
                    key={s.id}
                    step={s}
                    answers={answers}
                    errors={visibleErrors}
                    onEdit={() => setId(s.id)}
                  />
                ))}
              </FormSummary>
              <SubmitErrorSummary
                errors={visibleErrors}
                attemptCount={attemptCount}
                onNavigate={(f) => {
                  setId(f.stepId);
                  requestAnimationFrame(() => focusFormField(f.id));
                }}
              />
            </>
          )}
        </StepLayout>
      </>
    );
  },
  play: async ({ canvasElement, step, viewMode }) => {
    if (isDocsPage(viewMode)) return;
    const canvas = within(canvasElement);
    const stepNames = () =>
      canvas
        // The navigation is also inside a closed Dialog on small screens
        .getAllByRole('button', { hidden: true })
        .map((button) => button.textContent ?? '');

    await step('Ett valg gir ett steg i en gruppe', async () => {
      await userEvent.click(
        canvas.getByRole('checkbox', { name: 'Skolebibliotek' }),
      );
      expect(stepNames().some((name) => name.includes('Skolebibliotek'))).toBe(
        true,
      );
      expect(canvas.getAllByText('Tilskudd').length).toBeGreaterThan(0);
    });

    await step('Flere valg samles i en gruppe i fast rekkefølge', async () => {
      await userEvent.click(
        canvas.getByRole('checkbox', { name: 'Videreutdanning for lærere' }),
      );
      expect(canvas.getAllByText('Tilskudd').length).toBeGreaterThan(0);
      const names = stepNames();
      expect(
        names.findIndex((name) => name.includes('Videreutdanning')),
      ).toBeLessThan(
        names.findIndex((name) => name.includes('Skolebibliotek')),
      );
    });

    await step('Neste validerer ikke steget', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Neste' }));
      await userEvent.click(canvas.getByRole('button', { name: 'Neste' }));
      expect(
        canvas.getByRole('heading', { name: 'Skolebibliotek' }),
      ).toBeInTheDocument();
      expect(canvas.queryByText('Skriv inn antall lærere')).toBeNull();
    });

    await step('Feilene vises når brukeren prøver å sende inn', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Neste' }));
      await userEvent.click(
        canvas.getByRole('button', { name: 'Send søknad' }),
      );
      expect(
        canvas.getByRole('link', { name: 'Skriv inn antall lærere' }),
      ).toBeInTheDocument();
    });
  },
});

const appealPaths: Record<
  'termGrade' | 'exam',
  { title: string; steps: FormStep[] }
> = {
  termGrade: {
    title: 'Klage på standpunktkarakter',
    steps: [
      {
        id: 'subject-and-school',
        title: 'Fag og skole',
        fields: [
          {
            id: 'term-grade-subject',
            label: 'Fag',
            size: 20,
            errorMessage: 'Skriv inn faget',
          },
          {
            id: 'term-grade-school',
            label: 'Skole',
            size: 30,
            errorMessage: 'Skriv inn skolen',
          },
        ],
      },
      {
        id: 'reasoning',
        title: 'Begrunnelse',
        fields: [
          {
            id: 'reasoning-text',
            label: 'Hvorfor mener du karakteren er feil?',
            description: 'Skriv hva du mener læreren ikke har tatt hensyn til.',
            multiline: true,
            errorMessage: 'Skriv hvorfor du mener karakteren er feil',
          },
        ],
      },
    ],
  },
  exam: {
    title: 'Klage på eksamenskarakter',
    steps: [
      {
        id: 'exam',
        title: 'Eksamen',
        fields: [
          {
            id: 'exam-subject',
            label: 'Fag',
            size: 20,
            errorMessage: 'Skriv inn faget',
          },
          {
            id: 'candidate-number',
            label: 'Kandidatnummer',
            size: 12,
            description: 'Du finner kandidatnummeret på eksamensbekreftelsen.',
            errorMessage: 'Skriv inn kandidatnummeret ditt',
          },
        ],
      },
      {
        id: 'contact',
        title: 'Kontaktinformasjon',
        fields: [
          {
            id: 'email',
            label: 'E-postadresse',
            size: 30,
            type: 'email',
            autoComplete: 'email',
            description: 'Vi sender svaret på klagen hit.',
            errorMessage: 'Skriv inn e-postadressen din',
          },
        ],
      },
    ],
  },
};

export const UlikeVeier = meta.story({
  name: 'Ulike veier gjennom skjemaet',
  parameters: stepParameters,
  render: () => {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const [appealType, setAppealType] = useState('');
    const [answers, setAnswers] = useState<Answers>({});

    // Steps for the other path are removed, but the answers are kept in state
    const path =
      appealType === 'termGrade' || appealType === 'exam'
        ? appealPaths[appealType]
        : undefined;
    const pathSteps = path?.steps ?? [];
    const inputSteps = ['start', ...pathSteps.map((s) => s.id)];

    const {
      id,
      setId,
      next,
      prev,
      hasPrev,
      getStepProps,
      getGroupProps,
      markCompleted,
      markInvalid,
      resetStep,
    } = useFormNavigation<string>({
      value: 'start',
      order: [...inputSteps, 'summary'],
      onChange: () => navDialogRef.current?.close(),
    });

    // Only the steps in the chosen path are validated
    const errors: SubmitError[] = [
      ...(path
        ? []
        : [
            {
              id: 'appeal-term-grade',
              stepId: 'start',
              message: 'Velg hva du vil klage på',
            },
          ]),
      ...pathSteps.flatMap((s) => findErrors(s, answers)),
    ];
    const { attempted, sent, attemptCount, send } = useSubmission({
      errors,
      stepIds: inputSteps,
      activeStep: id,
      markInvalid,
      markCompleted,
      resetStep,
    });
    const visibleErrors = attempted ? errors : [];

    const { getRadioProps, validationMessageProps } = useRadioGroup({
      name: 'appeal-type',
      value: appealType,
      onChange: setAppealType,
      error: getErrorMessage(visibleErrors, 'appeal-term-grade'),
    });

    const activeStep = pathSteps.find((s) => s.id === id);
    const updateAnswer = (field: string, value: string) =>
      setAnswers((previous) => ({ ...previous, [field]: value }));

    const handleSubmit: SubmitHandler = (event) => {
      event.preventDefault();
      if (id === 'summary') send();
      else next();
    };

    if (sent) {
      return (
        <Alert data-color="success">
          <Alert.Heading level={2}>Klagen er sendt</Alert.Heading>
          Du får svar på klagen så snart den er behandlet.
        </Alert>
      );
    }

    return (
      <>
        <style>{`
.bs-root {
  container: page / inline-size;
  width: 100%;
}

.bs-page {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
  width: 100%;
}

.bs-desktop {
  display: none;
}

.bs-mobile {
  display: block;
}

.bs-container {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 40rem;
}

.bs-form {
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
}

.bs-navigation-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-size-2);
}

@container page (min-width: 50rem) {
  .bs-page {
    flex-direction: row;
  }

  .bs-desktop {
    display: block;
    flex: 0 0 16rem;
    position: sticky;
    top: var(--ds-size-6);
    align-self: flex-start;
    padding-block-start: var(--ds-size-6);
  }

  .bs-mobile {
    display: none;
  }

  .bs-container {
    flex: 1;
    padding: var(--ds-size-6);
  }
}

.bs-nav-dialog {
  width: fit-content;
  min-width: 20rem;
}
`}</style>
        <StepLayout
          navDialogRef={navDialogRef}
          onSubmit={handleSubmit}
          onPrev={hasPrev() ? prev : undefined}
          submitLabel={id === 'summary' ? 'Send klage' : 'Neste'}
          navigation={
            <FormNavigation>
              <FormNavigation.Step {...getStepProps('start')}>
                Hva vil du klage på?
              </FormNavigation.Step>
              {path && (
                <FormNavigation.Group
                  title={path.title}
                  {...getGroupProps(pathSteps.map((s) => s.id))}
                >
                  {pathSteps.map((s) => (
                    <FormNavigation.Step key={s.id} {...getStepProps(s.id)}>
                      {s.title}
                    </FormNavigation.Step>
                  ))}
                </FormNavigation.Group>
              )}
              <FormNavigation.Step
                variant="summary"
                {...getStepProps('summary')}
              >
                Oppsummering
              </FormNavigation.Step>
            </FormNavigation>
          }
        >
          {id === 'start' && (
            <Fieldset>
              <Fieldset.Legend>
                <Heading level={2} data-size="sm">
                  Hva vil du klage på?
                </Heading>
              </Fieldset.Legend>
              <Radio
                label="Standpunktkarakter"
                description="Karakteren du fikk av læreren din i faget."
                {...getRadioProps({
                  value: 'termGrade',
                  id: 'appeal-term-grade',
                })}
              />
              <Radio
                label="Eksamenskarakter"
                description="Karakteren du fikk av sensorene på eksamen."
                {...getRadioProps({ value: 'exam', id: 'appeal-exam' })}
              />
              <ValidationMessage {...validationMessageProps} />
            </Fieldset>
          )}

          {activeStep && (
            <TextStep
              step={activeStep}
              answers={answers}
              errors={visibleErrors}
              updateAnswer={updateAnswer}
            />
          )}

          {id === 'summary' && (
            <>
              <FormSummary title="Oppsummering">
                <FormSummary.Section
                  title="Type klage"
                  onEdit={() => setId('start')}
                >
                  <FormSummary.Fields>
                    <FormSummary.Field
                      label="Hva vil du klage på?"
                      value={path?.title}
                      error={getErrorMessage(
                        visibleErrors,
                        'appeal-term-grade',
                      )}
                    />
                  </FormSummary.Fields>
                </FormSummary.Section>
                {/* Only the path the user has chosen is shown in the summary */}
                {pathSteps.map((s) => (
                  <StepSummary
                    key={s.id}
                    step={s}
                    answers={answers}
                    errors={visibleErrors}
                    onEdit={() => setId(s.id)}
                  />
                ))}
              </FormSummary>
              <SubmitErrorSummary
                errors={visibleErrors}
                attemptCount={attemptCount}
                onNavigate={(f) => {
                  setId(f.stepId);
                  requestAnimationFrame(() => focusFormField(f.id));
                }}
              />
            </>
          )}
        </StepLayout>
      </>
    );
  },
  play: async ({ canvasElement, step, viewMode }) => {
    if (isDocsPage(viewMode)) return;
    const canvas = within(canvasElement);

    await step(
      'Valget bestemmer hvilken gruppe med steg som vises',
      async () => {
        await userEvent.click(
          canvas.getByRole('radio', { name: /Standpunktkarakter/ }),
        );
        expect(
          canvas.getAllByText('Klage på standpunktkarakter').length,
        ).toBeGreaterThan(0);

        await userEvent.click(
          canvas.getByRole('radio', { name: /Eksamenskarakter/ }),
        );
        expect(
          canvas.queryAllByText('Klage på standpunktkarakter'),
        ).toHaveLength(0);
        expect(
          canvas.getAllByText('Klage på eksamenskarakter').length,
        ).toBeGreaterThan(0);
      },
    );

    await step('Neste går til første steg i valgt vei', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Neste' }));
      expect(
        canvas.getByRole('heading', { name: 'Eksamen' }),
      ).toBeInTheDocument();
    });
  },
});
