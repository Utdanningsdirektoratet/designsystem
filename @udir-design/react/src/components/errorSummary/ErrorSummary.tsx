import {
  ErrorSummary,
  ErrorSummaryHeading,
  type ErrorSummaryHeadingProps,
  ErrorSummaryItem,
  type ErrorSummaryItemProps,
  ErrorSummaryLink,
  type ErrorSummaryLinkProps,
  ErrorSummaryList,
  type ErrorSummaryListProps,
  type ErrorSummaryProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ErrorSummary.displayName = 'ErrorSummary';

export type {
  ErrorSummaryHeadingProps,
  ErrorSummaryItemProps,
  ErrorSummaryLinkProps,
  ErrorSummaryListProps,
  ErrorSummaryProps,
};
export {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryLink,
  ErrorSummaryList,
};
