import { HTMLAttributes, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  ErrorSummary,
  Heading,
} from '@udir-design/react/alpha';
import classes from './FormDemo.module.css';
import { useForm } from 'react-hook-form';
import PaginationControls from './PaginationControls';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { RankingPage } from './pages/RankingPage';
import { FinishPage } from './pages/FinishPage.tsx';

type FormDemo = HTMLAttributes<HTMLDivElement>;

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

const pageFields: Record<number, (keyof FormValues)[]> = {
  1: ['firstName', 'lastName', 'county', 'educationLevel', 'ageGroup'],
  2: ['rankings'],
  3: ['addition', 'contactMethods'],
};

export const FormDemo = ({ ...props }: FormDemo) => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const totalPages = 3;
  const [educationLevel, setEducationLevel] = useState<string | undefined>(
    undefined,
  );
  const [contactMethods, setContactMethods] = useState<string[]>([]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    dialogRef.current?.close();
    reset();
    setCurrentPage(1);
    setAttemptedNext(false);
    setEducationLevel(undefined);
    setContactMethods([]);
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleNextPage = async (targetPage: number) => {
    setAttemptedNext(true);
    // Only validate if you're moving forward
    if (targetPage > currentPage) {
      const valid = await trigger(pageFields[currentPage]);
      if (!valid) {
        return;
      }
    }
    setCurrentPage(targetPage);
    setAttemptedNext(false);
  };

  const renderCurrentPage = () => {
    const renderErrors = attemptedNext ? errors : {};
    switch (currentPage) {
      case 1:
        return (
          <PersonalInfoPage
            register={register}
            errors={renderErrors}
            control={control}
            educationLevel={educationLevel}
            setEducationLevel={setEducationLevel}
          />
        );
      case 2:
        return <RankingPage control={control} errors={renderErrors} />;
      case 3:
        return (
          <FinishPage
            register={register}
            errors={renderErrors}
            control={control}
            contactMethods={contactMethods}
            setContactMethods={setContactMethods}
          />
        );
    }
  };

  return (
    <div {...props} className={classes.container}>
      <Heading level={1} data-size="md">
        Skjema
      </Heading>
      <Alert>
        Ditt svar i skjemaet lagres automatisk, så du kan fortsette på et senere
        tidspunkt.
      </Alert>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {renderCurrentPage()}
        {currentPage === totalPages && (
          <Button
            onClick={() => {
              setAttemptedNext(true);
              handleSubmit(() => {
                dialogRef.current?.showModal();
              })();
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
        <ErrorSummary>
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
  );
};
