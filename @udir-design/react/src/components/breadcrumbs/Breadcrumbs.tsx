import {
  Breadcrumbs as DigdirBreadcrumbs,
  type BreadcrumbsProps as DigdirBreadcrumbsProps,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type BreadcrumbsProps = Omit<DigdirBreadcrumbsProps, 'data-color'>;

const Breadcrumbs = DigdirBreadcrumbs as ForwardRefExoticComponent<
  BreadcrumbsProps & RefAttributes<ComponentRef<typeof DigdirBreadcrumbs>>
> &
  Pick<typeof DigdirBreadcrumbs, 'Item' | 'Link' | 'List'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList };
export type {
  BreadcrumbsProps,
  BreadcrumbsItemProps,
  BreadcrumbsLinkProps,
  BreadcrumbsListProps,
} from '@digdir/designsystemet-react';
