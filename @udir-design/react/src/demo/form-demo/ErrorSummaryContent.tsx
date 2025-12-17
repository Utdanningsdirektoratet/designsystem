import type { FieldErrors } from 'react-hook-form';
import { ErrorSummary } from 'src/components/errorSummary/ErrorSummary';
import type { FormValues, PageId } from './FormDemo';

type Props = {
  attemptedSubmit: boolean;
  currentPage: PageId | null;
  errors: FieldErrors<FormValues>;
  errorSummaryRef: React.RefObject<HTMLDivElement | null>;
  pageFields: Partial<Record<PageId, (keyof FormValues)[]>>;
  setId: React.Dispatch<React.SetStateAction<PageId | null>>;
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

  const getMessage = (msg?: unknown) =>
    typeof msg === 'string' && msg.trim()
      ? msg
      : 'Du må besvare alle påstandene';

  const findPageForField = (field: string): PageId | undefined => {
    return (Object.entries(pageFields).find(([_, fields]) =>
      fields.includes(field as keyof FormValues),
    )?.[0] ?? undefined) as PageId | undefined;
  };

  const renderErrorList = () => {
    if (isFinalPage) {
      const allKeys = Object.keys(errors) as (keyof FormValues)[];
      const rankings = errors.rankings as
        | Record<string, { message?: string } | undefined>
        | undefined;

      return (
        <ErrorSummary.List>
          {allKeys.map((fieldName) => {
            if (fieldName === 'rankings') {
              return rankings && Object.values(rankings)[0] ? (
                <ErrorSummary.Item key="rankings">
                  <ErrorSummary.Link
                    href="#rankings"
                    onClick={(e) => {
                      e.preventDefault();
                      setId('ranking');
                    }}
                  >
                    {getMessage(
                      (Object.values(rankings)[0] as { message?: string })
                        ?.message,
                    )}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              ) : null;
            } else {
              const err = errors[fieldName] as { message?: string } | undefined;
              return (
                <ErrorSummary.Item key={fieldName}>
                  <ErrorSummary.Link
                    href={`#${fieldName}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const pageId = findPageForField(fieldName);
                      if (!pageId) return;
                      setId(pageId);
                      setTimeout(() => {
                        const el = document.getElementById(fieldName);
                        el?.focus();
                      }, 50);
                    }}
                  >
                    {getMessage(err?.message)}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              );
            }
          })}
        </ErrorSummary.List>
      );
    }

    return (
      <ErrorSummary.List>
        {pageErrors.map((fieldName) => {
          const err = errors[fieldName] as { message?: string } | undefined;
          return (
            <ErrorSummary.Item key={fieldName}>
              <ErrorSummary.Link href={`#${fieldName}`}>
                {getMessage(err?.message)}
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
