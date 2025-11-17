import {
  ErrorSummary,
  ErrorSummaryHeading,
  type ErrorSummaryHeadingProps,
  ErrorSummaryItem,
  type ErrorSummaryItemProps,
  ErrorSummaryList,
  type ErrorSummaryListProps,
  type ErrorSummaryProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ErrorSummary.displayName = 'ErrorSummary';

export type {
  ErrorSummaryHeadingProps,
  ErrorSummaryItemProps,
  ErrorSummaryListProps,
  ErrorSummaryProps,
};
export {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryList,
};
