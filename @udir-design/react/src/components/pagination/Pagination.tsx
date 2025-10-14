import {
  Pagination as DigdirPagination,
  PaginationButton,
  type PaginationButtonProps,
  PaginationItem,
  type PaginationItemProps,
  PaginationList,
  type PaginationListProps,
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

export {
  Pagination,
  PaginationButton,
  PaginationButtonProps,
  PaginationItem,
  PaginationItemProps,
  PaginationList,
  PaginationListProps,
  PaginationProps,
};
