import {
  SkipLink as DigdirSkipLink,
  type SkipLinkProps as DigdirSkipLinkProps,
} from '@digdir/designsystemet-react';
import type { ComponentRef, RefAttributes } from 'react';

type SkipLinkProps = Omit<DigdirSkipLinkProps, 'data-color'>;

const SkipLink: React.ForwardRefExoticComponent<
  SkipLinkProps & RefAttributes<ComponentRef<typeof DigdirSkipLink>>
> = DigdirSkipLink;

export type { SkipLinkProps };
export { SkipLink };
