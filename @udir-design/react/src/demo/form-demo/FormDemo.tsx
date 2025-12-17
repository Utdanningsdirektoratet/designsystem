import { Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { HTMLAttributes } from 'react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BulletListIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';
import { Dialog } from 'src/components/dialog/Dialog';
import type { FieldsetProps } from 'src/components/fieldset/Fieldset';
import { FormNavigation } from 'src/components/formNavigation';
import { Heading } from 'src/components/typography/heading/Heading';
import type { GetStepId } from 'src/utilities/form/navigation';
import { defineSteps, getStepIds } from 'src/utilities/form/navigation';
import { useFormNavigation } from 'src/utilities/hooks/useFormNavigation/useFormNavigation';
import type { DemoProps } from '../demoProps.js';
import { ErrorSummaryContent } from './ErrorSummaryContent';
import classes from './FormDemo.module.css';
import { FinishPage } from './pages/FinishPage.tsx';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import {
  DATA_ASSERTIONS,
  DATA_RANKINGS,
  RankingPage,
} from './pages/RankingPage';

export type PageProps = {
  showErrors: boolean;
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
  personal: ['firstName', 'lastName', 'county', 'educationLevel', 'ageGroup'],
  ranking: ['rankings'],
  finish: ['addition', 'contactMethods'],
  deliver: [],
});
const stepIds = getStepIds(pageFields);

const FormSchema = z.object({
  firstName: z.string().min(1, 'Fyll ut fornavn'),
  lastName: z.string().min(1, 'Fyll ut etternavn'),
  county: z.string().min(1, 'Velg et fylke'),
  educationLevel: z
    .string()
    .nullable()
    .refine((v) => v !== null && v.length > 0, {
      message: 'Velg et utdanningsnivå',
    }),
  ageGroup: z.string().refine((v) => v !== 'blank', {
    message: 'Velg en aldersgruppe',
  }),
  rankings: z
    .record(z.string(), z.enum(DATA_RANKINGS).nullish())
    .superRefine((r, ctx) => {
      for (const assertion of DATA_ASSERTIONS) {
        if (r[assertion] == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Du må besvare alle påstandene',
            path: [assertion],
          });
        }
      }
    }),
  addition: z.string().optional(),
  contactMethods: z.array(z.string()).min(1, 'Velg minst én kontaktmåte'),
});

export type FormValues = z.infer<typeof FormSchema>;

export type PageId = GetStepId<typeof pageFields>;

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
      county: '',
      educationLevel: '',
      ageGroup: 'blank',
      rankings: Object.fromEntries(DATA_ASSERTIONS.map((a) => [a, undefined])),
      addition: '',
      contactMethods: [],
    },
  });
  const {
    handleSubmit,
    trigger,
    reset: resetForm,
    formState: { errors, isSubmitted },
    getFieldState,
  } = methods;

  const onStepChange = async (_nextId: PageId, prevId: PageId | null) => {
    if (!prevId) return;
    dialogMobileRef.current?.close();
    const fields = pageFields[prevId];
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

  const onDeliver = handleSubmit(
    () => {
      dialogDeliverRef.current?.showModal();
    },
    () => {
      stepIds.forEach((stepId) => {
        if (stepHasError(stepId)) markInvalid(stepId);
      });
      errorSummaryRef.current?.focus();
    },
  );

  const onSubmit = () => {
    dialogDeliverRef.current?.close();
    resetForm();
    resetNavigation();
    setId('personal');
  };

  const formNavigationContent = (
    <FormNavigation>
      <FormNavigation.Group
        title="Skoleundersøkelse"
        className={classes.navigation}
        open={true}
        {...getGroupProps(['personal', 'ranking', 'finish', 'deliver'])}
      >
        <FormNavigation.Step {...getStepProps('personal')}>
          Personopplysninger
        </FormNavigation.Step>
        <FormNavigation.Step {...getStepProps('ranking')}>
          Rangering
        </FormNavigation.Step>
        <FormNavigation.Step {...getStepProps('finish')}>
          Avslutning
        </FormNavigation.Step>
        <FormNavigation.Step variant="submission" {...getStepProps('deliver')}>
          Innsending
        </FormNavigation.Step>
      </FormNavigation.Group>
    </FormNavigation>
  );

  const renderCurrentPage = () => {
    const props = { showErrors: isSubmitted };
    switch (id) {
      case 'personal':
        return <PersonalInfoPage {...props} />;
      case 'ranking':
        return <RankingPage {...props} />;
      case 'finish':
        return <FinishPage {...props} />;
      case 'deliver':
        return <DeliverPage />;
    }
  };

  const DeliverPage = () => {
    return (
      <>
        <Heading level={2}>Innsending</Heading>
        <Paragraph>Send inn skjema til Udir.</Paragraph>
      </>
    );
  };

  const hasErrors = isSubmitted && Object.keys(errors).length > 0;

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
            Skoleundersøkelse
          </Heading>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {renderCurrentPage()}
            <div className={classes.navigateButtons}>
              {hasPrev() && (
                <Button variant="secondary" onClick={prev} style={{ flex: 1 }}>
                  Forrige
                </Button>
              )}
              {hasNext() && (
                <Button variant="secondary" onClick={next} style={{ flex: 1 }}>
                  Neste
                </Button>
              )}
              {id === 'deliver' && (
                <Button style={{ flex: 2 }} onClick={onDeliver}>
                  Send inn skjema
                </Button>
              )}
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
                  </Button>
                </div>
              </Dialog.Block>
            </Dialog>
          </form>

          <ErrorSummaryContent
            attemptedSubmit={isSubmitted}
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
