import type { FunctionComponent, ReactNode } from 'react';
import type { BreadcrumbsListProps } from '../Breadcrumbs';

/**
 * This component only exists to document children prop for BreadcrumbsList
 */
export const BreadcrumbsList: FunctionComponent<
  BreadcrumbsListProps & {
    /** Should be one or more Breadcrumbs.Item elements */
    children?: ReactNode;
  }
> = () => null;
