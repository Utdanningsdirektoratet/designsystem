import {
  ErrorSummary as DigdirErrorSummary,
  ErrorSummaryHeading,
  type ErrorSummaryHeadingProps,
  ErrorSummaryItem,
  type ErrorSummaryItemProps,
  ErrorSummaryLink,
  type ErrorSummaryLinkProps,
  ErrorSummaryList,
  type ErrorSummaryListProps,
  type ErrorSummaryProps as DigdirErrorSummaryProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type ErrorSummaryProps = Omit<DigdirErrorSummaryProps, 'asChild'>;

const ErrorSummary = DigdirErrorSummary as ForwardRefExoticComponent<
  ErrorSummaryProps & RefAttributes<ComponentRef<typeof DigdirErrorSummary>>
> &
  Pick<typeof DigdirErrorSummary, 'Heading' | 'Item' | 'Link' | 'List'>;

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
