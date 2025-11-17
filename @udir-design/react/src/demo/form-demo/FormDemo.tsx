import type { HTMLAttributes } from 'react';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert } from 'src/components/alert';
import { Button } from 'src/components/button/Button';
import { Dialog } from 'src/components/dialog/Dialog';
import { ErrorSummary } from 'src/components/errorSummary/ErrorSummary';
import type { FieldsetProps } from 'src/components/fieldset/Fieldset';
import { Heading } from 'src/components/typography/heading/Heading';
import type { DemoProps } from '../demoProps';
import classes from './FormDemo.module.css';
import PaginationControls from './PaginationControls';
import { FinishPage } from './pages/FinishPage.tsx';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { RankingPage } from './pages/RankingPage';

type FormDemo = DemoProps &
  HTMLAttributes<HTMLDivElement> & {
    page?: number;
  };

export type FormValues = {
  firstName: string;
  lastName: string;
  county: string;
  educationLevel: string;
  ageGroup: string;
  rankings: Record<string, string>;
  addition: string;
  contactMethods: string[];
};

export type PageProps = {
  showErrors: boolean;
};

export const focusableFieldsetProps: Partial<FieldsetProps> = {
  tabIndex: -1, // Needed to be focusable from ErrorSummary
  onFocus: (event) => {
    if (event.target === event.currentTarget) {
      // Focus the first input within the fieldset when the fieldset gets focus from the ErrorSummary
      event.target.querySelector('input')?.focus();
    }
  },
};

const pageFields: Record<number, (keyof FormValues)[]> = {
  1: ['firstName', 'lastName', 'county', 'educationLevel', 'ageGroup'],
  2: ['rankings'],
  3: ['addition', 'contactMethods'],
};

export const FormDemo = ({ page = 1, ...props }: FormDemo) => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    shouldFocusError: false, // We focus the ErrorSummary instead
  });
  const {
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = methods;

  const [currentPage, setCurrentPage] = useState(page);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const totalPages = 3;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    dialogRef.current?.close();
    reset();
    setCurrentPage(1);
    setAttemptedNext(false);
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const handleNextPage = async (targetPage: number) => {
    setAttemptedNext(true);
    // Only validate if you're moving forward
    if (targetPage > currentPage) {
      const valid = await trigger(pageFields[currentPage]);
      if (!valid) {
        errorSummaryRef.current?.focus();
        return;
      }
    }
    setCurrentPage(targetPage);
    setAttemptedNext(false);
  };

  const renderCurrentPage = () => {
    const props = { showErrors: attemptedNext };
    switch (currentPage) {
      case 1:
        return <PersonalInfoPage {...props} />;
      case 2:
        return <RankingPage {...props} />;
      case 3:
        return <FinishPage {...props} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div {...props} className={classes.container}>
        <Heading level={1} data-size="md">
          Skjema
        </Heading>
        <Alert>
          Ditt svar i skjemaet lagres automatisk, så du kan fortsette på et
          senere tidspunkt.
        </Alert>

        {/* False positive - https://github.com/facebook/react/pull/35062 */}
        {/* eslint-disable-next-line react-hooks/refs */}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {renderCurrentPage()}
          {currentPage === totalPages && (
            <Button
              onClick={() => {
                setAttemptedNext(true);
                handleSubmit(
                  () => {
                    // onValid
                    dialogRef.current?.showModal();
                  },
                  () => {
                    // onInvalid
                    errorSummaryRef.current?.focus();
                  },
                )();
              }}
            >
              Send inn skjema
            </Button>
          )}
        </form>
        <Dialog ref={dialogRef}>
          <Dialog.Block>
            <Heading data-size="xs">
              Er du sikker på at du vil sende inn skjema?
            </Heading>
          </Dialog.Block>
          <Dialog.Block className={classes.dialogActions}>
            {/* False positive - https://github.com/facebook/react/pull/35062 */}
            {/* eslint-disable-next-line react-hooks/refs */}
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
        {attemptedNext && Object.keys(errors).length > 0 && (
          <ErrorSummary ref={errorSummaryRef}>
            <ErrorSummary.Heading>
              For å gå videre må du rette opp følgende feil:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {errors.rankings && Object.values(errors.rankings)[0] && (
                <ErrorSummary.Item key="rankings">
                  <ErrorSummary.Link href="#rankings">
                    {Object.values(errors.rankings)[0]?.message}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              )}
              {Object.entries(errors)
                .filter(([fieldName]) => fieldName !== 'rankings')
                .map(([fieldName, error]) => (
                  <ErrorSummary.Item key={fieldName}>
                    <ErrorSummary.Link href={`#${fieldName}`}>
                      {typeof error?.message === 'string'
                        ? error.message
                        : 'Feltet er påkrevd'}
                    </ErrorSummary.Link>
                  </ErrorSummary.Item>
                ))}
            </ErrorSummary.List>
          </ErrorSummary>
        )}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={(page) => {
            handleNextPage(page);
          }}
          className={classes.pagination}
        />
      </div>
    </FormProvider>
  );
};
