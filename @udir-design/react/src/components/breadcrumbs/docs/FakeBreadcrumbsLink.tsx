import type { FunctionComponent } from 'react';
import type { BreadcrumbsLinkProps } from '../Breadcrumbs';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for BreadcrumbsLink directly :(
 */
export const BreadcrumbsLink: FunctionComponent<BreadcrumbsLinkProps> = () =>
  null;
