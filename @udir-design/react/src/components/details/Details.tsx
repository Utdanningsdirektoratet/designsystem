import {
  Details as DetailsRoot,
  DetailsContent,
  DetailsSummary,
} from '@digdir/designsystemet-react';

type Details = typeof DetailsRoot & {
  Summary: typeof DetailsSummary;
  Content: typeof DetailsContent;
};

const Details: Details = Object.assign(DetailsRoot, {
  Summary: DetailsSummary,
  Content: DetailsContent,
});

Details.displayName = 'Details';

export { Details, DetailsContent, DetailsSummary };
export type {
  DetailsContentProps,
  DetailsProps,
  DetailsSummaryProps,
} from '@digdir/designsystemet-react';
