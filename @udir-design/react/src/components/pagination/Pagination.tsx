import {
  Pagination,
  type PaginationProps,
  PaginationButton,
  type PaginationButtonProps,
  PaginationItem,
  type PaginationItemProps,
  PaginationList,
  type PaginationListProps,
  usePagination,
  type UsePaginationProps,
} from '@digdir/designsystemet-react';

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
