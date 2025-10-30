import {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryList,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
ErrorSummary.displayName = 'ErrorSummary';

export {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryList,
};
export type {
  ErrorSummaryHeadingProps,
  ErrorSummaryItemProps,
  ErrorSummaryListProps,
  ErrorSummaryProps,
} from '@digdir/designsystemet-react';
