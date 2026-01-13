import { Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { HTMLAttributes } from 'react';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BulletListIcon,
  PaperplaneIcon,
} from '@udir-design/icons';
import { Button } from 'src/components/button/Button';
import { Dialog } from 'src/components/dialog/Dialog';
import type { FieldsetProps } from 'src/components/fieldset/Fieldset';
import { FormNavigation } from 'src/components/formNavigation';
import { Heading } from 'src/components/typography/heading/Heading';
import type { GetFieldId, GetStepId } from 'src/utilities/form/navigation';
import {
  defineSteps,
  getStepIds,
  makeStepFinder,
} from 'src/utilities/form/navigation';
import { useFormNavigation } from 'src/utilities/hooks/useFormNavigation/useFormNavigation';
import type { DemoProps } from '../demoProps.js';
import { ErrorSummaryContent } from './ErrorSummaryContent';
import classes from './FormDemo.module.css';
import { DocumentationPage } from './pages/DocumentationPage';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { ProjectPage } from './pages/ProjectPage.tsx.js';

export type PageProps = {
  showErrors: boolean;
  isSubmitSuccessful: boolean;
};

export const focusableFieldsetProps: Partial<FieldsetProps> = {
  tabIndex: -1,
  onFocus: (event) => {
    if (event.target === event.currentTarget) {
      event.target.querySelector('input')?.focus();
    }
  },
};

const pageFields = defineSteps({
  personal: ['firstName', 'lastName', 'contactMethods'],
  project: [
    'projectTitle',
    'projectDescription',
    'projectCategory',
    'county',
    'ageGroup',
  ],
  documentation: ['documentation', 'addition'],
  deliver: [],
  confirmation: [],
});
export type PageFields = typeof pageFields;

export const findPageForField = makeStepFinder(pageFields);

const stepIds = getStepIds(pageFields);

const FormSchema = z.object({
  firstName: z.string().min(1, 'Fyll ut fornavn'),
  lastName: z.string().min(1, 'Fyll ut etternavn'),
  contactMethods: z.array(z.string()).min(1, 'Velg minst én kontaktmåte'),
  projectTitle: z.string().min(1, 'Fyll ut tittel på prosjektet'),
  projectDescription: z.string().min(1, 'Fyll ut beskrivelse av prosjektet'),
  projectCategory: z
    .string()
    .nullable()
    .refine((v) => v !== null && v.length > 0, {
      message: 'Velg en kategori for prosjektet',
    }),
  county: z.string().min(1, 'Velg et gjennomføringsfylke'),
  ageGroup: z.string().refine((v) => v !== 'blank', {
    message: 'Velg en aldersgruppe',
  }),
  documentation: z.array(z.instanceof(File)).min(1, 'Last opp dokumentasjon'),
  addition: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;
export type PageId = GetStepId<typeof pageFields>;
export type FieldId = GetFieldId<typeof pageFields>;

export const FormDemo = ({
  page = 'personal',
  ...props
}: {
  page?: PageId;
} & HTMLAttributes<HTMLDivElement> &
  DemoProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    shouldFocusError: false,
    shouldUnregister: false,
    defaultValues: {
      firstName: '',
      lastName: '',
      contactMethods: [],
      projectTitle: '',
      projectDescription: '',
      projectCategory: '',
      county: '',
      ageGroup: 'blank',
      documentation: [],
      addition: '',
    },
  });
  const {
    handleSubmit,
    trigger,
    formState: { errors, isSubmitSuccessful },
    getFieldState,
  } = methods;

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const onStepChange = async (_nextId: PageId, prevId: PageId | null) => {
    if (!prevId) return;
    dialogMobileRef.current?.close();
    const fields = pageFields[prevId];
    if (fields.length === 0) return;
    const ok = await trigger(fields, { shouldFocus: false });
    if (ok) markCompleted(prevId);
    else if (attemptedSubmit) markInvalid(prevId);
  };

  const {
    getStepProps,
    getGroupProps,
    id,
    markCompleted,
    markInvalid,
    setId,
    next,
    prev,
    hasNext,
    hasPrev,
  } = useFormNavigation<PageId>({
    value: page,
    onChange: onStepChange,
  });

  const dialogMobileRef = useRef<HTMLDialogElement>(null);
  const dialogDeliverRef = useRef<HTMLDialogElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const stepHasError = (pageId: PageId): boolean => {
    const fields = pageFields[pageId] ?? [];
    return fields.some((name) => !!getFieldState(name).error);
  };

  const onDeliver = async () => {
    setAttemptedSubmit(true);
    const isValid = await trigger(undefined, { shouldFocus: false });

    if (isValid) {
      dialogDeliverRef.current?.showModal();
    } else {
      stepIds.forEach((stepId) => {
        if (stepHasError(stepId)) markInvalid(stepId);
      });
      errorSummaryRef.current?.focus();
    }
  };

  const onSubmit = () => {
    dialogDeliverRef.current?.close();
    setId('confirmation');
  };

  const formNavigationContent = (
    <FormNavigation>
      <FormNavigation.Group
        title="Testsøknad"
        className={classes.navigation}
        open={true}
        {...getGroupProps([
          'personal',
          'project',
          'documentation',
          'deliver',
          'confirmation',
        ])}
      >
        <FormNavigation.Step {...getStepProps('personal')}>
          Kontaktinfo
        </FormNavigation.Step>
        <FormNavigation.Step {...getStepProps('project')}>
          Prosjektet
        </FormNavigation.Step>
        <FormNavigation.Step {...getStepProps('documentation')}>
          Dokumentasjon
        </FormNavigation.Step>
        <FormNavigation.Step variant="submission" {...getStepProps('deliver')}>
          Innsending
        </FormNavigation.Step>
        <FormNavigation.Step
          variant="confirmation"
          {...getStepProps('confirmation')}
          disabled={!isSubmitSuccessful}
        >
          Kvittering
        </FormNavigation.Step>
      </FormNavigation.Group>
    </FormNavigation>
  );

  const renderCurrentPage = () => {
    const props = {
      showErrors: attemptedSubmit,
      isSubmitSuccessful: isSubmitSuccessful,
    };
    switch (id) {
      case 'personal':
        return <PersonalInfoPage {...props} />;
      case 'project':
        return <ProjectPage {...props} />;
      case 'documentation':
        return <DocumentationPage {...props} />;
      case 'deliver':
        return <DeliverPage />;
      case 'confirmation':
        return <ConfirmationPage />;
    }
  };

  const DeliverPage = () => {
    return (
      <>
        <Heading level={2}>Innsending</Heading>
        <Paragraph>
          {isSubmitSuccessful
            ? 'Du har allerede sendt inn søknaden.'
            : 'Send inn søknaden.'}
        </Paragraph>
      </>
    );
  };

  const ConfirmationPage = () => (
    <div className={classes.confirmation}>
      <Heading level={2} data-size="sm">
        Kvittering
      </Heading>
      <Paragraph data-size="xl">Takk!</Paragraph>
      <Paragraph>
        Vi har mottatt din søknad. Du hører tilbake innen en måned.
      </Paragraph>
    </div>
  );

  const hasErrors = attemptedSubmit && Object.keys(errors).length > 0;

  return (
    <FormProvider {...methods}>
      <div className={classes.page} data-size="auto">
        <div className={classes.desktop}>{formNavigationContent}</div>
        <div className={classes.mobile}>
          <Dialog.TriggerContext>
            <Dialog.Trigger
              data-color={hasErrors ? 'danger' : 'neutral'}
              variant="secondary"
            >
              <BulletListIcon aria-hidden />
              Naviger
            </Dialog.Trigger>
            <Dialog
              closedby="any"
              ref={dialogMobileRef}
              style={{ width: 'fit-content', minWidth: '20rem' }}
            >
              <Heading level={2}>Skjemanavigasjon</Heading>
              {formNavigationContent}
            </Dialog>
          </Dialog.TriggerContext>
        </div>
        <div {...props} className={classes.container}>
          <Heading level={1} data-size="md">
            Testsøknad
          </Heading>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {renderCurrentPage()}
            <div className={classes.navigateButtons}>
              {hasPrev() && id !== 'confirmation' && (
                <Button variant="secondary" onClick={prev} style={{ flex: 1 }}>
                  <ArrowLeftIcon aria-hidden />
                  Forrige
                </Button>
              )}
              {hasNext() && id !== 'deliver' && id !== 'confirmation' && (
                <Button variant="secondary" onClick={next} style={{ flex: 1 }}>
                  Neste
                  <ArrowRightIcon aria-hidden />
                </Button>
              )}
              {id === 'deliver' &&
                (!isSubmitSuccessful ? (
                  <Button style={{ flex: 2 }} onClick={onDeliver}>
                    Send inn skjema
                    <PaperplaneIcon aria-hidden />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={next}
                    style={{ flex: 1 }}
                  >
                    Neste
                    <ArrowRightIcon aria-hidden />
                  </Button>
                ))}
            </div>
            <Dialog
              closeButton={false}
              ref={dialogDeliverRef}
              style={{ width: 'fit-content' }}
            >
              <Dialog.Block className={classes.dialog}>
                <Heading data-size="xs">
                  Er du sikker på at du vil sende inn skjema?
                </Heading>
                <div className={classes.dialogActions}>
                  <Button
                    onClick={() => dialogDeliverRef.current?.close()}
                    variant="secondary"
                    style={{ flex: 1 }}
                  >
                    Avbryt
                  </Button>
                  <Button autoFocus type="submit" style={{ flex: 2 }}>
                    Send inn
                    <PaperplaneIcon aria-hidden />
                  </Button>
                </div>
              </Dialog.Block>
            </Dialog>
          </form>

          <ErrorSummaryContent
            attemptedSubmit={attemptedSubmit}
            currentPage={id}
            errors={errors}
            errorSummaryRef={errorSummaryRef}
            pageFields={pageFields}
            setId={setId}
          />
        </div>
      </div>
    </FormProvider>
  );
};
