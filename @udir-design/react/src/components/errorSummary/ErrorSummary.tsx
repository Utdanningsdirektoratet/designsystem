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

export {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryHeadingProps,
  ErrorSummaryItem,
  ErrorSummaryItemProps,
  ErrorSummaryList,
  ErrorSummaryListProps,
  ErrorSummaryProps,
};
