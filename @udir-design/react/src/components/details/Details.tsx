import {
  Details,
  DetailsContent,
  type DetailsContentProps,
  type DetailsProps,
  DetailsSummary,
  type DetailsSummaryProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Details.displayName = 'Details';

export type { DetailsContentProps, DetailsProps, DetailsSummaryProps };
export { Details, DetailsContent, DetailsSummary };
