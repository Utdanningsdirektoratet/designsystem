import {
  Details,
  DetailsContent,
  DetailsSummary,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Details.displayName = 'Details';

export { Details, DetailsContent, DetailsSummary };
export type {
  DetailsContentProps,
  DetailsProps,
  DetailsSummaryProps,
} from '@digdir/designsystemet-react';
