import {
  Breadcrumbs as DigdirBreadcrumbs,
  type BreadcrumbsProps as DigdirBreadcrumbsProps,
  BreadcrumbsItem,
  type BreadcrumbsItemProps,
  BreadcrumbsLink,
  type BreadcrumbsLinkProps,
  BreadcrumbsList,
  type BreadcrumbsListProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type BreadcrumbsProps = Omit<DigdirBreadcrumbsProps, 'data-color'>;

const Breadcrumbs = DigdirBreadcrumbs as ForwardRefExoticComponent<
  BreadcrumbsProps & RefAttributes<ComponentRef<typeof DigdirBreadcrumbs>>
> &
  Pick<typeof DigdirBreadcrumbs, 'Item' | 'Link' | 'List'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Breadcrumbs.displayName = 'Breadcrumbs';

export {
  Breadcrumbs,
  BreadcrumbsProps,
  BreadcrumbsItem,
  BreadcrumbsItemProps,
  BreadcrumbsLink,
  BreadcrumbsLinkProps,
  BreadcrumbsList,
  BreadcrumbsListProps,
};
