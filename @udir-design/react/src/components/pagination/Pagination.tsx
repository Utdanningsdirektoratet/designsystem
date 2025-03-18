import {
  Pagination as DigdirPagination,
  type PaginationProps as DigdirPaginationProps,
  PaginationButton,
  type PaginationButtonProps,
  PaginationItem,
  type PaginationItemProps,
  PaginationList,
  type PaginationListProps,
  usePagination,
  type UsePaginationProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type PaginationProps = Omit<DigdirPaginationProps, 'data-color'>;

const Pagination =
  DigdirPagination as ForwardRefExoticComponent<PaginationProps> &
    Pick<typeof DigdirPagination, 'Button' | 'List' | 'Item'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Pagination.displayName = 'Pagination';

export {
  Pagination,
  PaginationProps,
  PaginationButton,
  PaginationButtonProps,
  PaginationItem,
  PaginationItemProps,
  PaginationList,
  PaginationListProps,
  usePagination,
  UsePaginationProps,
};
