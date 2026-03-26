import type { FunctionComponent, ReactNode } from 'react';
import type { DetailsContentProps } from '../Details';

/**
 * This component only exists to document children prop on DetailsContent
 */
export const DetailsContent: FunctionComponent<
  DetailsContentProps & {
    /** Content shown when expanded */
    children?: ReactNode;
  }
> = () => null;
