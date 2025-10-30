import {
  Pagination as DigdirPagination,
  PaginationButton,
  PaginationItem,
  PaginationList,
  type PaginationProps as DigdirPaginationProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type PaginationProps = Omit<DigdirPaginationProps, 'data-color'>;

const Pagination = DigdirPagination as ForwardRefExoticComponent<
  PaginationProps & RefAttributes<ComponentRef<typeof DigdirPagination>>
> &
  Pick<typeof DigdirPagination, 'Button' | 'List' | 'Item'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Pagination.displayName = 'Pagination';

export { Pagination, PaginationButton, PaginationItem, PaginationList };
export type { PaginationProps };
export type {
  PaginationButtonProps,
  PaginationItemProps,
  PaginationListProps,
} from '@digdir/designsystemet-react';
