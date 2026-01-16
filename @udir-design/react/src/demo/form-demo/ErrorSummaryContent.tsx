import type { FieldError, FieldErrors } from 'react-hook-form';
import { ErrorSummary } from 'src/components/errorSummary/ErrorSummary';
import type { FieldId, FormValues, PageFields, PageId } from './FormDemo';
import { findPageForField } from './FormDemo';

type Props = {
  attemptedSubmit: boolean;
  currentPage: PageId | null;
  errors: FieldErrors<FormValues>;
  errorSummaryRef: React.RefObject<HTMLDivElement | null>;
  pageFields: PageFields;
  setId: React.Dispatch<React.SetStateAction<PageId | null>>;
};

const getMessage = (
  err?: string | FieldErrors<FormValues>[FieldId],
): string | undefined => {
  if (!err) {
    return;
  }
  if (typeof err === 'string') {
    return err;
  }
  if (err.message) {
    return getMessage(err.message);
  }
  // nested message
  const nested = Object.values(err as Record<string, string | FieldError>)[0];
  return getMessage(nested);
};

export function ErrorSummaryContent({
  attemptedSubmit,
  currentPage,
  errors,
  errorSummaryRef,
  pageFields,
  setId,
}: Props) {
  if (!currentPage) return null;
  const isFinalPage = currentPage === 'deliver';
  const hasAnyErrors = Object.keys(errors).length > 0;
  const fieldsForPage = pageFields[currentPage] ?? [];
  const pageErrors = fieldsForPage.filter((name) => !!errors[name]);

  const shouldShow =
    attemptedSubmit && (isFinalPage ? hasAnyErrors : pageErrors.length > 0);

  if (!shouldShow) return null;

  const renderErrorList = () => {
    if (isFinalPage) {
      const allKeys = Object.keys(errors) as FieldId[];

      return (
        <ErrorSummary.List>
          {allKeys.map((fieldName) => {
            const err = errors[fieldName];
            return (
              <ErrorSummary.Item key={fieldName}>
                <ErrorSummary.Link
                  href={`#${fieldName}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const pageId = findPageForField(fieldName);
                    if (!pageId) return;
                    setId(pageId);
                    window.setTimeout(() => {
                      const el = document.getElementById(fieldName);
                      el?.focus();
                    }, 50);
                  }}
                >
                  {getMessage(err)}
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            );
          })}
        </ErrorSummary.List>
      );
    }

    return (
      <ErrorSummary.List>
        {pageErrors.map((fieldName) => {
          const err = errors[fieldName];
          return (
            <ErrorSummary.Item key={fieldName}>
              <ErrorSummary.Link href={`#${fieldName}`}>
                {getMessage(err)}
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
