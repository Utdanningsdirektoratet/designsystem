import type { FunctionComponent, ReactNode } from 'react';
import type { BreadcrumbsItemProps } from '../Breadcrumbs';

/**
 * This component only exists to document children prop for BreadcrumbsItem
 */
export const BreadcrumbsItem: FunctionComponent<
  BreadcrumbsItemProps & {
    /** Should be a single Breadcrumbs.Link element */
    children?: ReactNode;
  }
> = () => null;
