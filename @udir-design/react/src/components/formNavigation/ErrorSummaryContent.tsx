import { ErrorSummary } from '../errorSummary/ErrorSummary';
import { FormValues } from './FormNavigationExample';

type Props = {
  attemptedSubmit: boolean;
  currentPage: number;
  totalPages: number;
  errors: Record<string, { message?: string }>;
  errorSummaryRef: React.RefObject<HTMLDivElement | null>;
  pageFields: Record<number, (keyof FormValues)[]>;
};

export function ErrorSummaryContent({
  attemptedSubmit,
  currentPage,
  totalPages,
  errors,
  errorSummaryRef,
  pageFields,
}: Props) {
  const isFinalPage = currentPage === totalPages;
  const hasAnyErrors = Object.keys(errors).length > 0;

  const fieldsForPage = pageFields[currentPage] ?? [];
  const pageErrors = fieldsForPage.filter((name) => errors[name]);

  // Only show when attempted AND (final page has any errors) OR (this page has errors)
  const shouldShow =
    attemptedSubmit && (isFinalPage ? hasAnyErrors : pageErrors.length > 0);

  if (!shouldShow) return null;

  const renderErrorList = () => {
    if (isFinalPage) {
      return (
        <ErrorSummary.List>
          {errors.rankings && Object.values(errors.rankings)[0] && (
            <ErrorSummary.Item key="rankings">
              <ErrorSummary.Link href="#rankings">
                {typeof Object.values(errors.rankings)[0] === 'object' &&
                Object.values(errors.rankings)[0] !== null
                  ? (Object.values(errors.rankings)[0] as { message?: string })
                      ?.message
                  : 'Du må besvare alle påstandene'}
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
                    : 'Du må besvare alle påstandene'}
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            ))}
        </ErrorSummary.List>
      );
    }

    return (
      <ErrorSummary.List>
        {pageErrors.map((fieldName) => {
          const error = errors[fieldName];
          return (
            <ErrorSummary.Item key={fieldName}>
              <ErrorSummary.Link href={`#${fieldName}`}>
                {typeof error?.message === 'string'
                  ? error.message
                  : 'Du må besvare alle påstandene'}
              </ErrorSummary.Link>
            </ErrorSummary.Item>
          );
        })}
      </ErrorSummary.List>
    );
  };

  return (
    <ErrorSummary ref={errorSummaryRef}>
      <ErrorSummary.Heading>
        For å sende inn skjema må du rette opp følgende feil:
      </ErrorSummary.Heading>
      {renderErrorList()}
    </ErrorSummary>
  );
}
