import { Paragraph } from '@digdir/designsystemet-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TasklistIcon } from '@udir-design/icons';
import { FinishPage } from '../../demo/form-demo/pages/FinishPage.tsx';
import { PersonalInfoPage } from '../../demo/form-demo/pages/PersonalInfoPage';
import {
  DATA_ASSERTIONS,
  DATA_RANKINGS,
  RankingPage,
} from '../../demo/form-demo/pages/RankingPage';
import { useFormNavigation } from '../../utilities/hooks/useFormNavigation/useFormNavigation';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import { FieldsetProps } from '../fieldset/Fieldset';
import { Heading } from '../typography/heading/Heading';
import { ErrorSummaryContent } from './ErrorSummaryContent.js';
import { FormNavigation } from './FormNavigation';
import classes from './FormNavigationExample.module.css';
import { FormNavigationItem } from './FormNavigationItem';

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

const pageFields: Record<number, (keyof FormValues)[]> = {
  1: ['firstName', 'lastName', 'county', 'educationLevel', 'ageGroup'],
  2: ['rankings'],
  3: ['addition', 'contactMethods'],
  4: [],
};

const FormSchema = z.object({
  firstName: z.string().min(1, 'Fyll ut fornavn'),
  lastName: z.string().min(1, 'Fyll ut etternavn'),
  county: z.string().min(1, 'Velg et fylke'),
  educationLevel: z.string().min(1, 'Velg et utdanningsnivå'),
  ageGroup: z.string().refine((v) => v !== 'blank', {
    message: 'Velg en aldersgruppe',
  }),
  rankings: z
    .record(z.string(), z.enum(DATA_RANKINGS).optional())
    .superRefine((r, ctx) => {
      for (const assertion of DATA_ASSERTIONS) {
        if (!r[assertion]) {
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

export const FormDemo = ({ page = 1, ...props }) => {
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
    reset,
    formState: { errors },
  } = methods;

  const nav = useFormNavigation({ value: Math.max(0, page - 1) });
  const currentPage = nav.index + 1;
  const totalPages = 4;

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const onSubmit = () => {
    dialogRef.current?.close();
    reset();
    nav.setIndex(0);
    nav.reset();
    setAttemptedSubmit(false);
  };

  const onDeliver = async () => {
    setAttemptedSubmit(true);

    const allValid = await trigger(undefined, {
      shouldFocus: false,
    });

    [1, 2, 3].forEach((p, i) => {
      if (pageHasErrors(p)) nav.markInvalid(i);
      else nav.markCompleted(i);
    });

    if (allValid) dialogRef.current?.showModal();
    else errorSummaryRef.current?.focus();
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const validatePage = async (pageNo: number) => {
    const names = (pageFields[pageNo] ?? []).map(String);
    if (names.length === 0) return true;
    const ok = await methods.trigger(
      names as Parameters<typeof methods.trigger>[0],
      { shouldFocus: false },
    );
    return ok;
  };

  const goToPage = async (targetPage: number) => {
    if (currentPage >= 1 && currentPage < totalPages) {
      const ok = await validatePage(currentPage);
      if (ok) nav.markCompleted(currentPage - 1);
      else if (attemptedSubmit) nav.markInvalid(currentPage - 1);
    }
    nav.setIndex(targetPage - 1);
  };

  const renderCurrentPage = () => {
    const props = { showErrors: attemptedSubmit };
    switch (currentPage) {
      case 1:
        return <PersonalInfoPage {...props} />;
      case 2:
        return <RankingPage {...props} />;
      case 3:
        return <FinishPage {...props} />;
      case 4:
        return <DeliverPage />;
    }
  };

  const pageHasErrors = (pageNo: number) => {
    const names = pageFields[pageNo].map(String);
    const errorKeys = Object.keys(methods.formState.errors);
    return names.some((n) =>
      errorKeys.some((k) => k === n || k.startsWith(`${n}.`)),
    );
  };

  const DeliverPage = () => {
    return (
      <>
        <Heading level={2}>Fullfør</Heading>
        <Paragraph>Send inn skjema til Udir.</Paragraph>
      </>
    );
  };

  return (
    <FormProvider {...methods}>
      <div className={classes.page}>
        <FormNavigation
          title="Skjemanavigasjon"
          icon={<TasklistIcon aria-hidden />}
          state="idle"
          className={classes.navigation}
        >
          <FormNavigationItem
            {...nav.getItemProps({
              index: 0,
              onClick: async () => {
                await goToPage(1);
              },
            })}
          >
            Personopplysninger
          </FormNavigationItem>

          <FormNavigationItem
            {...nav.getItemProps({
              index: 1,
              onClick: async () => {
                await goToPage(2);
              },
            })}
          >
            Rangering
          </FormNavigationItem>

          <FormNavigationItem
            {...nav.getItemProps({
              index: 2,
              onClick: async () => {
                await goToPage(3);
              },
            })}
          >
            Avslutning
          </FormNavigationItem>
          <FormNavigationItem
            {...nav.getItemProps({
              index: 3,
              onClick: async () => {
                await goToPage(4);
              },
            })}
          >
            Fullfør
          </FormNavigationItem>
        </FormNavigation>
        <div {...props} className={classes.container}>
          <Heading level={1} data-size="md">
            Skjema
          </Heading>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {renderCurrentPage()}
            <div className={classes.navigateButtons}>
              {currentPage > 1 && (
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await goToPage(currentPage - 1);
                  }}
                >
                  Forrige
                </Button>
              )}
              {currentPage < totalPages && (
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await goToPage(currentPage + 1);
                  }}
                >
                  Neste
                </Button>
              )}

              {currentPage === totalPages && (
                <Button onClick={onDeliver}>Send inn skjema</Button>
              )}
            </div>
          </form>

          <Dialog ref={dialogRef}>
            <Dialog.Block>
              <Heading data-size="xs">
                Er du sikker på at du vil sende inn skjema?
              </Heading>
            </Dialog.Block>
            <Dialog.Block className={classes.dialogActions}>
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Send inn skjema
              </Button>
              <Button
                onClick={() => dialogRef.current?.close()}
                variant="secondary"
              >
                Avbryt
              </Button>
            </Dialog.Block>
          </Dialog>

          <ErrorSummaryContent
            attemptedSubmit={attemptedSubmit}
            currentPage={currentPage}
            totalPages={totalPages}
            errors={errors}
            errorSummaryRef={errorSummaryRef}
            pageFields={pageFields}
          />
        </div>
      </div>
    </FormProvider>
  );
};
