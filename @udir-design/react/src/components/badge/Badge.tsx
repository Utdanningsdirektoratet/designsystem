import {
  Badge as DigdirBadge,
  type BadgeProps as DigdirBadgeProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type BadgeProps = Omit<DigdirBadgeProps, 'data-color'> & {
  /**
   * Change the color scheme of badge
   */
  'data-color'?:
    | 'neutral'
    | 'accent'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning';
};

const Badge = DigdirBadge as ForwardRefExoticComponent<
  BadgeProps & RefAttributes<ComponentRef<typeof DigdirBadge>>
> &
  Pick<typeof DigdirBadge, 'Position'>;

export type { BadgeProps };
export { Badge };
