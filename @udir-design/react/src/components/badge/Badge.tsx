import {
  Badge as DigdirBadge,
  type BadgeProps as DigdirBadgeProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

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

export { Badge };
export type { BadgeProps };
