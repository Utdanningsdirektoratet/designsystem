import {
  Breadcrumbs as DigdirBreadcrumbs,
  BreadcrumbsItem,
  type BreadcrumbsItemProps,
  BreadcrumbsLink,
  type BreadcrumbsLinkProps,
  BreadcrumbsList,
  type BreadcrumbsListProps,
  type BreadcrumbsProps as DigdirBreadcrumbsProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type BreadcrumbsProps = Omit<DigdirBreadcrumbsProps, 'data-color'>;

const Breadcrumbs = DigdirBreadcrumbs as ForwardRefExoticComponent<
  BreadcrumbsProps & RefAttributes<ComponentRef<typeof DigdirBreadcrumbs>>
> &
  Pick<typeof DigdirBreadcrumbs, 'Item' | 'Link' | 'List'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Breadcrumbs.displayName = 'Breadcrumbs';

export type {
  BreadcrumbsItemProps,
  BreadcrumbsLinkProps,
  BreadcrumbsListProps,
  BreadcrumbsProps,
};
export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList };
